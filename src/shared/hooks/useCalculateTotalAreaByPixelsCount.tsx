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

// import MapView from '@arcgis/core/views/MapView';
import { useCalculatePixelArea } from '@shared/hooks/useCalculatePixelArea';
// import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { totalVisibleAreaInSqKmChanged } from '@shared/store/Map/reducer';
import { selectCountOfVisiblePixels } from '@shared/store/Map/selectors';
// import { debounce } from '@shared/utils/snippets/debounce';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * Custom hook that calculates the total visible area based on
 * the count of visible pixels of the imagery layer in Mask Index or Change Compare tools.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.objectId - The object ID of the imagery scene.
 * @param {string} params.serviceURL - The service URL for the imagery layer.
 * @param {pixelSize} params.pixelSize - Represents the size of one pixel in map units.
 */
export const useCalculateTotalAreaByPixelsCount = ({
    objectId,
    serviceURL,
    pixelSize,
}: {
    objectId: number;
    serviceURL: string;
    pixelSize: number;
}) => {
    const dispatch = useAppDispatch();

    const countOfVisiblePixels = useAppSelector(selectCountOfVisiblePixels);

    // calculate the approximate area a pixel covers, adjusted by the latitude of the centroid point of the imagery scene to which this pixel belongs
    const pixelAreaInSqMeter = useCalculatePixelArea({
        pixelHeigh: pixelSize,
        pixelWidth: pixelSize,
        serviceURL: serviceURL,
        objectId: objectId,
    });

    const clacAreaByNumOfPixels = (visiblePixels: number) => {
        const areaSqMeter = pixelAreaInSqMeter * visiblePixels;
        const areaSqKM = areaSqMeter / 1000000;

        dispatch(totalVisibleAreaInSqKmChanged(areaSqKM));
    };

    useEffect(() => {
        clacAreaByNumOfPixels(countOfVisiblePixels);
    }, [countOfVisiblePixels, pixelAreaInSqMeter]);
};
