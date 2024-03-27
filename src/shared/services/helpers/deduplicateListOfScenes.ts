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

        // Check if there is a previous scene and its acquisition date matches the current scene.
        // We aim to keep only one imagery scene for each day. When there are two scenes acquired on the same date,
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

            // Remove the previous scene from output as it was acquired before the current scene
            output.pop();
        }

        output.push(currScene);
    }

    return output;
};
