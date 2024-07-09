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

            const area = calculatePixelArea(pixelWidth, lat);

            setPixelAreaInSqMeter(area);
        })();
    }, [objectId, pixelWidth, pixelHeigh]);

    return pixelAreaInSqMeter;
};
