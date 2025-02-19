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
import { PixelValuesData } from './getPixelValues';
import { TemporalProfileData } from '@typing/imagery-service';

/**
 * Create Temporal Profiles Data by combining pixel values data and imagery scene data
 * @param samples
 * @param scenes
 * @returns
 */
export const combinePixelValuesWithScenes = (
    pixelValues: PixelValuesData[],
    scenes: ImageryScene[]
): TemporalProfileData[] => {
    const output: TemporalProfileData[] = [];

    const sceneByObjectId = new Map<number, ImageryScene>();

    for (const scene of scenes) {
        sceneByObjectId.set(scene.objectId, scene);
    }

    for (let i = 0; i < pixelValues.length; i++) {
        const sampleData = pixelValues[i];
        const { objectId, values } = sampleData;

        if (sceneByObjectId.has(objectId) === false) {
            continue;
        }

        const {
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
        } = sceneByObjectId.get(objectId);

        output.push({
            objectId,
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
            values,
        });
    }

    return output;
};
