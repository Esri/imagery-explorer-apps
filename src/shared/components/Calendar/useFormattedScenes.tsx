import {
    selectAvailableScenes,
    selectCloudCover,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedImageryScene } from './Calendar';

/**
 * This custom hook retrieves a list of available imagery scenes that intersect with the map center and were acquired during the input year.
 * It formats these scenes into `FormattedImageryScene[]` format suitable for populating the Calendar component.
 * @returns {FormattedImageryScene[]} An array of formatted imagery scenes
 */
export const useFormattedScenes = (): FormattedImageryScene[] => {
    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const cloudCoverThreshold = useSelector(selectCloudCover);

    /**
     * List of available imagery scenes that intersect with map center and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

    const formattedScenes: FormattedImageryScene[] = useMemo(() => {
        if (isAnimationPlaying) {
            return [];
        }

        if (!availableScenes?.length) {
            return [];
        }

        return availableScenes.map((scene) => {
            const {
                formattedAcquisitionDate,
                acquisitionDate,
                // isCloudy,
                cloudCover,
                satellite,
            } = scene;

            return {
                formattedAcquisitionDate,
                acquisitionDate,
                isCloudy: cloudCover > cloudCoverThreshold,
                cloudCover: Math.ceil(cloudCover * 100),
                satellite,
            };
        });
    }, [isAnimationPlaying, availableScenes, cloudCoverThreshold]);

    return formattedScenes;
};
