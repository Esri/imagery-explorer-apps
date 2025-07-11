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

import React, { FC, useEffect } from 'react';

import {
    selectLandcoverAppAnimationYearRange,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';

import {
    saveActiveYearToHashParams,
    saveAnimationDataToHashParams,
    saveAnimationModeToHashParams,
    saveTimeExtentToHashParams,
} from '@landcover-explorer/utils/URLHashParams';

import {
    selectMapMode,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';

import { useAppSelector } from '@shared/store/configureStore';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

export const useSaveAppState2HashParams = () => {
    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const mode = useAppSelector(selectMapMode);

    const animationStatus = useAppSelector(selectAnimationStatus);

    const animationYearRange = useAppSelector(
        selectLandcoverAppAnimationYearRange
    );

    const year = useAppSelector(selectYear);

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    useEffect(() => {
        saveActiveYearToHashParams(mode === 'step' ? year : null);
    }, [year, mode]);

    useEffect(() => {
        saveAnimationModeToHashParams(animationStatus !== null);

        saveAnimationDataToHashParams({
            yearRange: animationStatus ? animationYearRange : null,
        });
    }, [animationStatus, animationYearRange]);
};
