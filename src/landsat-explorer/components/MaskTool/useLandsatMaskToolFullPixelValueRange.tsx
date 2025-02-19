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
import { SpectralIndex } from '@typing/imagery-service';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';

export const useLandsatMaskToolFullPixelValueRange = () => {
    const spectralIndex = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const fullPixelValueRange = useMemo(() => {
        if (spectralIndex === 'temperature celcius') {
            return [
                LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
                LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
            ];
        }

        if (spectralIndex === 'temperature farhenheit') {
            return [
                LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
                LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
            ];
        }

        return [-1, 1];
    }, [spectralIndex]);

    return fullPixelValueRange;
};
