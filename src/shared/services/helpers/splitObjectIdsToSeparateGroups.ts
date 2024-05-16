/**
 * Splits an array of object IDs into separate groups, each containing a maximum of 20 object IDs.
 * This is useful when making requests with an upper limit on the number of object IDs.
 *
 * @param {number[]} objectIds - An array of object IDs to be split into groups.
 * @returns {number[][]} An array of arrays, each representing a separate group of object IDs.
 */
export const splitObjectIdsToSeparateGroups = (
    objectIds: number[]
): number[][] => {
    // Define the maximum number of items per group
    const ItemsPerGroup = 20;

    // number of groups needed based on the total number of object IDs
    const numOfGroups = Math.ceil(objectIds.length / ItemsPerGroup);

    // Initialize an array of empty arrays to hold the separate groups of object IDs
    const objectsIdsInSeparateGroups: number[][] = [
        ...new Array(numOfGroups),
    ].map(() => []);

    for (let i = 0; i < numOfGroups; i++) {
        // Calculate the start and end indices for the current group
        const startIdx = i * ItemsPerGroup;
        const endIdx = Math.min(startIdx + ItemsPerGroup, objectIds.length);
        objectsIdsInSeparateGroups[i] = objectIds.slice(startIdx, endIdx);
    }

    return objectsIdsInSeparateGroups;
};
