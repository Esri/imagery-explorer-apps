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

import React from 'react';
import AnimationStatusButton from './AnimationStatusButton';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
} from '@shared/store/LandcoverExplorer/selectors';
import MonthPicker from '../AcquisitionMonthPicker/MonthPicker';

export const AnimationControls = () => {
    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer && isSentinel2LayerOutOfVisibleRange === false;

    if (mode !== 'step' || isSentinel2LayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="relative hidden lg:block pt-4">
            <AnimationStatusButton />

            <div
                className="w-full mt-2"
                style={{
                    height: 26,
                }}
            >
                {shouldShowMonthPicker && (
                    <MonthPicker disabled={animationMode !== null} />
                )}
            </div>
        </div>
    );
};
