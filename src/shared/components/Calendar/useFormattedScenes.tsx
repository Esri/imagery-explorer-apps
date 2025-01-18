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

import {
    selectAvailableScenes,
    selectCloudCover,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { FormattedImageryScene } from './Calendar';

/**
 * This custom hook retrieves a list of available imagery scenes that intersect with the map center and were acquired during the input year.
 * It formats these scenes into `FormattedImageryScene[]` format suitable for populating the Calendar component.
 * @returns {FormattedImageryScene[]} An array of formatted imagery scenes
 */
export const useFormattedScenes = (): FormattedImageryScene[] => {
    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const cloudCoverThreshold = useAppSelector(selectCloudCover);

    /**
     * List of available imagery scenes that intersect with map center and were acquired during the input year.
     */
    const availableScenes = useAppSelector(selectAvailableScenes);

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
                doesNotMeetCriteria,
                customTooltipText,
            } = scene;

            const doestNotMeetCloudTreshold = cloudCover > cloudCoverThreshold;

            return {
                formattedAcquisitionDate,
                acquisitionDate,
                // isCloudy: cloudCover > cloudCoverThreshold,
                doesNotMeetCriteria:
                    doesNotMeetCriteria || doestNotMeetCloudTreshold,
                satellite,
                customTooltipText,
            } as FormattedImageryScene;
        });
    }, [isAnimationPlaying, availableScenes, cloudCoverThreshold]);

    return formattedScenes;
};
