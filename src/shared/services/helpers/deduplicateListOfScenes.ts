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

import { ImageryScene } from '@shared/store/ImageryScene/reducer';

/**
 * Deduplicates a list of imagery scenes based on acquisition date, keeping only one scene per day.
 * When there are multiple scenes acquired on the same day, the function prioritizes keeping the currently
 * selected scene or the one acquired later.
 *
 * @param scenes An array of ImageryScene objects to be deduplicated.
 * @param objectIdOfSelectedScene The object ID of the scene that should be prioritized if there are multiple
 * scenes acquired on the same day.
 * @returns An array of deduplicated ImageryScene objects.
 */
export const deduplicateListOfImageryScenes = (
    scenes: ImageryScene[],
    objectIdOfSelectedScene: number
): ImageryScene[] => {
    // sort scenes uing acquisition date in an ascending order
    // which is necessary for us to select between two overlapping scenes in step below
    const sorted = [...scenes].sort(
        (a, b) => a.acquisitionDate - b.acquisitionDate
    );

    const output: ImageryScene[] = [];

    for (const currScene of sorted) {
        // Get the last imagery scene in the array
        const prevScene = output[output.length - 1];

        // Check if there is a previous scene and if its acquisition date matches the current scene.
        // We aim to keep only one imagery scene for each day. When there are two scenes acquired on the same date,
        // we prioritize keeping the scene that meets all filter criteria, the currently selected scene, or the one acquired later.
        if (
            prevScene &&
            prevScene.formattedAcquisitionDate ===
                currScene.formattedAcquisitionDate
        ) {
            // Prioritize retaining scenes that meet all filter criteria
            // even if there is a selected scene acquired on the same day
            if (
                prevScene.doesNotMeetCriteria !== currScene.doesNotMeetCriteria
            ) {
                // Remove the previous scene and use the current scene if the previous one does not meet all filter criteria
                // even if it is currently selected
                if (prevScene.doesNotMeetCriteria) {
                    output.pop();
                    output.push(currScene);
                }

                // If the previous scene meets all filter criteria, keep it and skip the current scene
                continue;
            }

            // Check if the previous scene is the currently selected scene
            // Skip the current iteration if the previous scene is the selected scene
            if (prevScene.objectId === objectIdOfSelectedScene) {
                continue;
            }

            // Remove the previous scene from output as it was acquired before the current scene
            output.pop();
        }

        output.push(currScene);
    }

    return output;
};
