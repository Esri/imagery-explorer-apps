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
    selectSelectedIndex4MaskTool,
    selectMaskLayerPixelValueRange,
    // selectActiveAnalysisTool,
} from '@shared/store/MaskTool/selectors';
import { updateMaskLayerSelectedRange } from '@shared/store/MaskTool/thunks';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useSelector } from 'react-redux';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';
import { useLandsatMaskToolFullPixelValueRange } from './useLandsatMaskToolFullPixelValueRange';

export const SurfaceTempCelsiusPixelRangeSlider = () => {
    const dispatch = useAppDispatch();

    const selectedSpectralIndex = useSelector(selectSelectedIndex4MaskTool);

    const maskOptions = useSelector(selectMaskLayerPixelValueRange);

    const fullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

    if (selectedSpectralIndex !== 'temperature celcius') {
        return null;
    }

    return (
        <PixelRangeSlider
            values={maskOptions.selectedRange}
            min={fullPixelValueRange[0]}
            max={fullPixelValueRange[1]}
            steps={1}
            valuesOnChange={(values) => {
                dispatch(updateMaskLayerSelectedRange(values));
            }}
            countOfTicks={0}
            tickLabels={[-30, -15, 0, 15, 30, 45, 60, 75, 90]}
            showSliderTooltip={true}
        />
    );
};

export const SurfaceTempFarhenheitPixelRangeSlider = () => {
    const dispatch = useAppDispatch();

    const selectedSpectralIndex = useSelector(selectSelectedIndex4MaskTool);

    const maskOptions = useSelector(selectMaskLayerPixelValueRange);

    const rangeValues = useMemo(() => {
        return [
            celsius2fahrenheit(maskOptions.selectedRange[0]),
            celsius2fahrenheit(maskOptions.selectedRange[1]),
        ];
    }, [maskOptions]);

    const fullPixelValueRange = useLandsatMaskToolFullPixelValueRange();

    if (selectedSpectralIndex !== 'temperature farhenheit') {
        return null;
    }

    return (
        <PixelRangeSlider
            values={rangeValues}
            min={fullPixelValueRange[0]}
            max={fullPixelValueRange[1]}
            steps={1}
            valuesOnChange={(values) => {
                values = values.map((value) =>
                    Math.trunc(((value - 32) * 5) / 9)
                );

                dispatch(updateMaskLayerSelectedRange(values));
            }}
            countOfTicks={0}
            tickLabels={[-20, 0, 30, 60, 90, 120, 150, 180]}
            showSliderTooltip={true}
        />
    );
};
