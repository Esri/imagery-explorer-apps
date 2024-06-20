import { calculatePixelArea } from '@shared/services/helpers/calculatePixelArea';
import { getCentroidByObjectId } from '@shared/services/helpers/getCentroidByObjectId';
import React, { useEffect, useState } from 'react';

/**
 * Custom hook to calculate the approximate area a pixel covers, adjusted by the latitude of the centroid point of
 * the imagery scene to which this pixel belongs.
 *
 * For example, if the pixel size is 10 meters at the equator, it covers 100 square meters. However, at latitude 40,
 * it only covers approximately 76.6 square meters.
 *
 * @param params - An object containing the pixel dimensions, service URL, and object ID.
 * @param params.pixelWidth - The width of the pixel in meter.
 * @param params.pixelHeigh - The height of the pixel in meter.
 * @param params.serviceURL - The URL of the imagery service.
 * @param params.objectId - The unique identifier of the feature.
 * @returns The area of the pixel in square meters.
 */
export const useCalculatePixelArea = ({
    pixelWidth,
    pixelHeigh,
    serviceURL,
    objectId,
}: {
    pixelWidth: number;
    pixelHeigh: number;
    serviceURL: string;
    objectId: number;
}) => {
    const [pixelAreaInSqMeter, setPixelAreaInSqMeter] = useState<number>(
        pixelWidth * pixelHeigh
    );

    useEffect(() => {
        (async () => {
            if (!objectId) {
                return;
            }

            const [lon, lat] = await getCentroidByObjectId(
                serviceURL,
                objectId
            );

            const area = calculatePixelArea(pixelWidth, pixelHeigh, lat);

            setPixelAreaInSqMeter(area);
        })();
    }, [objectId, pixelWidth, pixelHeigh]);

    return pixelAreaInSqMeter;
};
