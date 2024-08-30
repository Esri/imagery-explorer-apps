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
import { sentinel2ScenesUpdated } from './reducer';
import { Sentinel2Scene } from '@typing/imagery-service';
import {
    ImageryScene,
    availableImageryScenesUpdated,
} from '../ImageryScene/reducer';
import { DateRange } from '@typing/shared';
import { selectQueryParams4SceneInSelectedMode } from '../ImageryScene/selectors';
import { deduplicateListOfImageryScenes } from '@shared/services/helpers/deduplicateListOfScenes';
import { getSentinel2Scenes } from '@shared/services/sentinel-2/getSentinel2Scenes';

let abortController: AbortController = null;

/**
 * Query Sentinel-2 Scenes that intersect with center point of map view that were acquired within the user selected acquisition year.
 * @param year use selected acquisition year
 * @returns
 */
export const queryAvailableSentinel2Scenes =
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
            const { objectIdOfSelectedScene } =
                selectQueryParams4SceneInSelectedMode(getState()) || {};

            const center = selectMapCenter(getState());

            // get scenes that were acquired within the acquisition year
            const sentinel2Scenes: Sentinel2Scene[] = await getSentinel2Scenes({
                acquisitionDateRange,
                mapPoint: center,
                abortController,
            });

            // convert list of Landsat scenes to list of imagery scenes
            let imageryScenes: ImageryScene[] = sentinel2Scenes.map(
                (sentinel2Scene: Sentinel2Scene) => {
                    const {
                        objectId,
                        name,
                        formattedAcquisitionDate,
                        acquisitionDate,
                        acquisitionYear,
                        acquisitionMonth,
                        cloudCover,
                    } = sentinel2Scene;

                    const imageryScene: ImageryScene = {
                        objectId,
                        sceneId: name,
                        formattedAcquisitionDate,
                        acquisitionDate,
                        acquisitionYear,
                        acquisitionMonth,
                        cloudCover,
                        satellite: 'Sentinel-2',
                        customTooltipText: [
                            `${Math.ceil(cloudCover * 100)}% Cloudy`,
                        ],
                    };

                    return imageryScene;
                }
            );

            imageryScenes = deduplicateListOfImageryScenes(
                imageryScenes,
                objectIdOfSelectedScene
            );

            batch(() => {
                dispatch(sentinel2ScenesUpdated(sentinel2Scenes));
                dispatch(availableImageryScenesUpdated(imageryScenes));
            });
        } catch (err) {
            console.error(err);
        }
    };
