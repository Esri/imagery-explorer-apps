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

import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { Sentinel1PixelValueRangeByIndex } from './Sentinel1MaskTool';

export const useSentinel1MaskToolFullPixelValueRange = () => {
    const selectedIndex = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as RadarIndex;

    const fullPixelValueRange = useMemo(() => {
        return (
            Sentinel1PixelValueRangeByIndex[selectedIndex as RadarIndex] || [
                0, 0,
            ]
        );
    }, [selectedIndex]);

    return fullPixelValueRange;
};
