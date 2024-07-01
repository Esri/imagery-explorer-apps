// import MapView from '@arcgis/core/views/MapView';
import { useCalculatePixelArea } from '@shared/hooks/useCalculatePixelArea';
// import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import { totalVisibleAreaInSqKmChanged } from '@shared/store/Map/reducer';
import { selectCountOfVisiblePixels } from '@shared/store/Map/selectors';
// import { debounce } from '@shared/utils/snippets/debounce';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
    const dispatach = useDispatch();

    const countOfVisiblePixels = useSelector(selectCountOfVisiblePixels);

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

        dispatach(totalVisibleAreaInSqKmChanged(areaSqKM));
    };

    useEffect(() => {
        clacAreaByNumOfPixels(countOfVisiblePixels);
    }, [countOfVisiblePixels, pixelAreaInSqMeter]);
};
