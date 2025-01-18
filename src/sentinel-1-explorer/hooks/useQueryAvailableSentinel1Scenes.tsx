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

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
// import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { queryAvailableSentinel1Scenes } from '@shared/store/Sentinel1/thunks';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import {
    selectLockedRelativeOrbit,
    selectSentinel1OrbitDirection,
} from '@shared/store/Sentinel1/selectors';
import { Sentinel1Scene } from '@typing/imagery-service';
import { getSentinel1SceneByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { useLockedRelativeOrbit } from './useLockedRelativeOrbit';
import { shouldForceSceneReselectionUpdated } from '@shared/store/ImageryScene/reducer';
import { usePrevious } from '@shared/hooks/usePrevious';
// import { selectAcquisitionYear } from '@shared/store/ImageryScene/selectors';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected date range and intersect with the center of the map screen
 * @returns
 */
export const useQueryAvailableSentinel1Scenes = (): void => {
    const dispatch = useAppDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    const orbitDirection = useSelector(selectSentinel1OrbitDirection);

    const previousOrbitDirection = usePrevious(orbitDirection);

    const { lockedRelativeOrbit } =
        useSelector(selectLockedRelativeOrbit) || {};

    /**
     * This custom hook helps to determine the Locked relative orbit to be used by the Analyze tools to ensure all Sentinel-1
     * scenes selected by the user to have the same relative orbit.
     */
    useLockedRelativeOrbit();

    useEffect(() => {
        if (!center || !acquisitionDateRange) {
            return;
        }

        if (isAnimationPlaying) {
            return;
        }

        // Set `shouldForceSceneReselection` to true when the user makes a new selection of the orbit direction filter.
        // This will force the `useFindSelectedSceneByDate` custom hook to disregard the currently selected scene and
        // select a new scene based on the current state of all filters.
        if (
            previousOrbitDirection &&
            orbitDirection !== previousOrbitDirection
        ) {
            dispatch(shouldForceSceneReselectionUpdated(true));
        }

        dispatch(
            queryAvailableSentinel1Scenes({
                acquisitionDateRange,
                relativeOrbit: lockedRelativeOrbit,
            })
        );
    }, [
        center,
        acquisitionDateRange?.startDate,
        acquisitionDateRange?.endDate,
        isAnimationPlaying,
        orbitDirection,
        lockedRelativeOrbit,
        // dualPolarizationOnly,
    ]);

    return null;
};
