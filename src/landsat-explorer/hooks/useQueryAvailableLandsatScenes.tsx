/* Copyright 2025 Esri
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

import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
// import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { queryAvailableScenes } from '@shared/store/Landsat/thunks';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
// import { selectAcquisitionYear } from '@shared/store/ImageryScene/selectors';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected date range and intersect with the center of the map screen
 * @returns
 */
export const useQueryAvailableLandsatScenes = (): void => {
    const dispatch = useAppDispatch();

    // const acquisitionYear = useAppSelector(selectAcquisitionYear);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const missionsToBeExcluded = useAppSelector(
        selectLandsatMissionsToBeExcluded
    );

    /**
     * current map center
     */
    const center = useAppSelector(selectMapCenter);

    useEffect(() => {
        if (!center || !acquisitionDateRange) {
            return;
        }

        if (isAnimationPlaying) {
            return;
        }

        dispatch(queryAvailableScenes(acquisitionDateRange));
    }, [
        center,
        acquisitionDateRange,
        isAnimationPlaying,
        missionsToBeExcluded,
    ]);

    return null;
};
