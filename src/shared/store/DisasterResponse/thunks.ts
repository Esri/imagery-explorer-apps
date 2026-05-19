/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { DisasterResponseScene } from '@typing/imagery-service';
// import {
//     formattedDateString2Unixtimestamp,
//     getYearFromFormattedDateString,
// } from '@shared/utils/date-time/formatDateString';
// import { selectQueryParams4SceneInSelectedMode } from '../ImageryScene/selectors';
import {
    DefaultQueryParams4ImageryScene,
    ImageryScene,
    availableImageryScenesUpdated,
    queryParams4MainSceneChanged,
    queryParams4SecondarySceneChanged,
    queryParamsListChanged,
} from '../ImageryScene/reducer';
import { getDisasterResponseScenes } from '@shared/services/disaster-response/getDisasterResponseScenes';
import {
    disasterResponseSecenesUpdated,
    selectedEventUpdated,
} from './reducer';
import {
    updateAcquisitionDate,
    updateObjectIdOfSelectedScene,
} from '../ImageryScene/thunks';
import { DisasterResponseImageryServiceDefaultRenderer } from '@shared/services/disaster-response/config';

let abortController: AbortController = null;
/**
 * Query Disaster Response Scenes for the selected disaster response event.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableDisasterResponseScenes =
    ({ eventName }: { eventName: string }) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            const scenes = await getDisasterResponseScenes({
                eventName,
                signal: abortController.signal,
            });

            // convert list of Landsat scenes to list of imagery scenes
            const imageryScenes: ImageryScene[] = scenes.map(
                (scene: DisasterResponseScene) => {
                    const {
                        objectId,
                        name,
                        eventTimestamp,
                        cloudPercent,
                        provider,
                        formattedAcquisitionDate,
                        acquisitionYear,
                        acquisitionMonth,
                    } = scene;

                    const imageryScene: ImageryScene = {
                        objectId,
                        sceneId: name,
                        formattedAcquisitionDate,
                        acquisitionDate: eventTimestamp,
                        acquisitionYear,
                        acquisitionMonth,
                        cloudCover: cloudPercent,
                        satellite: provider,
                        customTooltipText: [
                            `${Math.round(cloudPercent)}% Cloudy`,
                        ],
                    };

                    return imageryScene;
                }
            );

            dispatch(disasterResponseSecenesUpdated(scenes));
            dispatch(availableImageryScenesUpdated(imageryScenes));
        } catch (err) {
            console.error(err);
        }
    };

export const updateSelectedDisasterResponseEvent =
    (eventName: string) => (dispatch: StoreDispatch) => {
        // reset the query params for main scene and secondary scene as they are no longer associated with the newly selected event
        dispatch(
            queryParams4MainSceneChanged({
                ...DefaultQueryParams4ImageryScene,
                rasterFunctionName:
                    DisasterResponseImageryServiceDefaultRenderer,
            })
        );

        dispatch(
            queryParams4SecondarySceneChanged({
                ...DefaultQueryParams4ImageryScene,
                rasterFunctionName:
                    DisasterResponseImageryServiceDefaultRenderer,
            })
        );

        // reset query params list as well since the query params are no longer associated with the newly selected event
        dispatch(
            queryParamsListChanged({
                queryParams: [],
                selectedItemID: '',
            })
        );

        // update selected event in the store
        dispatch(selectedEventUpdated(eventName));
    };

export const selectDisasterResponseEventScene =
    (imageScene: ImageryScene) => (dispatch: StoreDispatch) => {
        dispatch(updateObjectIdOfSelectedScene(imageScene.objectId));

        // Acquisition date is not used to select the scene, but the Swipe and Animation mode UIs require it for display.
        dispatch(updateAcquisitionDate(imageScene.formattedAcquisitionDate));
    };
