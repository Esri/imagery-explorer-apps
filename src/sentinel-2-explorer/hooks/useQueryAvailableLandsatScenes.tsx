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

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
// import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { queryAvailableSentinel2Scenes } from '@shared/store/Sentinel2/thunks';
// import { selectAcquisitionYear } from '@shared/store/ImageryScene/selectors';

/**
 * This custom hook queries the Sentinel-2 service and find Sentinel-2 scenes
 * that were acquired within the selected date range and intersect with the center of the map screen
 * @returns
 */
export const useQueryAvailableSentinel2Scenes = (): void => {
    const dispatch = useDispatch();

    // const acquisitionYear = useSelector(selectAcquisitionYear);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    useEffect(() => {
        if (!center || !acquisitionDateRange) {
            return;
        }

        if (isAnimationPlaying) {
            return;
        }

        dispatch(queryAvailableSentinel2Scenes(acquisitionDateRange));
    }, [center, acquisitionDateRange, isAnimationPlaying]);

    return null;
};
