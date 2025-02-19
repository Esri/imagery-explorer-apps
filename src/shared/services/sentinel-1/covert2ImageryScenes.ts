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

import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    Sentinel1OrbitDirection,
    Sentinel1Scene,
} from '@typing/imagery-service';

export const convert2ImageryScenes = (
    scenes: Sentinel1Scene[],
    userSelectedOrbitDirection: Sentinel1OrbitDirection
): ImageryScene[] => {
    // convert list of Landsat scenes to list of imagery scenes
    const imageryScenes: ImageryScene[] = scenes.map(
        (scene: Sentinel1Scene) => {
            const {
                objectId,
                name,
                formattedAcquisitionDate,
                acquisitionDate,
                acquisitionYear,
                acquisitionMonth,
                orbitDirection,
            } = scene;

            const doesNotMeetCriteria =
                userSelectedOrbitDirection !== orbitDirection;

            const imageryScene: ImageryScene = {
                objectId,
                sceneId: name,
                formattedAcquisitionDate,
                acquisitionDate,
                acquisitionYear,
                acquisitionMonth,
                cloudCover: 0,
                doesNotMeetCriteria,
                satellite: 'Sentinel-1',
                customTooltipText: [orbitDirection],
            };

            return imageryScene;
        }
    );

    return imageryScenes;
};
