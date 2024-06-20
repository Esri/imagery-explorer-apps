import { getExtentByObjectId } from './getExtentById';

/**
 * Retrieves the centroid point of a feature from an imagery service using the object ID as a key.
 * @param serviceUrl The URL of the imagery service.
 * @param objectId The unique identifier of the feature.
 * @returns A promise that resolves to an array containing the [longitude, latitude] of the centroid of the feature's extent.
 */
export const getCentroidByObjectId = async (
    serviceUrl: string,
    objectId: number
): Promise<number[]> => {
    const extent = await getExtentByObjectId(serviceUrl, objectId, 4326);

    const { ymax, ymin } = extent;
    let { xmax, xmin } = extent;

    // Normalize the x values in case the extent crosses the International Date Line
    if (xmin < 0 && xmax > 0) {
        xmin = xmax;
        xmax = 180;
    }

    const centerX = (xmax - xmin) / 2 + xmin;
    const centerY = (ymax - ymin) / 2 + ymin;

    return [centerX, centerY];
};
