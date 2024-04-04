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
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const Sentinel2OutOfVisibleRangeWarning = () => {
    const mode = useSelector(selectMapMode);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    if (!isSentinel2LayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="mt-6 text-center text-sm opacity-50">
            <p>
                {mode === 'swipe'
                    ? 'Zoom in to compare Sentinel-2 Imagery Layers'
                    : 'Zoom in to enable time slider'}
            </p>
        </div>
    );
};
