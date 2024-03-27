/* Copyright 2024 Esri
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

import { batch } from 'react-redux';
import { selectMapCenter } from '../Map/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { sentinel1ScenesUpdated } from './reducer';
import { Sentinel1Scene } from '@typing/imagery-service';
import {
    ImageryScene,
    availableImageryScenesUpdated,
} from '../ImageryScene/reducer';
import { DateRange } from '@typing/shared';
import { selectQueryParams4SceneInSelectedMode } from '../ImageryScene/selectors';
import { getSentinel1Scenes } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { convert2ImageryScenes } from '@shared/services/sentinel-1/covert2ImageryScenes';

let abortController: AbortController = null;
/**
 * Query Sentinel-1 Scenes that intersect with center point of map view that were acquired within the user selected acquisition year.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableScenes =
    (acquisitionDateRange: DateRange) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        if (!acquisitionDateRange) {
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            const { objectIdOfSelectedScene, acquisitionDate } =
                selectQueryParams4SceneInSelectedMode(getState()) || {};

            const center = selectMapCenter(getState());

            // get scenes that were acquired within the acquisition year
            const scenes = await getSentinel1Scenes({
                acquisitionDateRange,
                mapPoint: center,
                abortController,
            });

            // sort scenes uing acquisition date in an ascending order
            // which is necessary for us to select between two overlapping scenes in step below
            scenes.sort((a, b) => a.acquisitionDate - b.acquisitionDate);

            const sentinel1Scenes: Sentinel1Scene[] = [];

            for (const currScene of scenes) {
                // Get the last Sentinel-1 scene in the 'Sentinel1Scene' array
                const prevScene = sentinel1Scenes[sentinel1Scenes.length - 1];

                // Check if there is a previous scene and its acquisition date matches the current scene.
                // We aim to keep only one Sentinel-1 scene for each day. When there are two scenes acquired on the same date,
                // we prioritize keeping the currently selected scene or the one acquired later.
                if (
                    prevScene &&
                    prevScene.formattedAcquisitionDate ===
                        currScene.formattedAcquisitionDate
                ) {
                    // Check if the previous scene is the currently selected scene
                    // Skip the current iteration if the previous scene is the selected scene
                    if (prevScene.objectId === objectIdOfSelectedScene) {
                        continue;
                    }

                    // Remove the previous scene from 'sentinel1Scenes' as it was acquired before the current scene
                    sentinel1Scenes.pop();
                }

                sentinel1Scenes.push(currScene);
            }

            // convert list of Landsat scenes to list of imagery scenes
            const imageryScenes: ImageryScene[] =
                convert2ImageryScenes(sentinel1Scenes);

            batch(() => {
                dispatch(sentinel1ScenesUpdated(sentinel1Scenes));
                dispatch(availableImageryScenesUpdated(imageryScenes));
            });
        } catch (err) {
            console.error(err);
        }
    };
