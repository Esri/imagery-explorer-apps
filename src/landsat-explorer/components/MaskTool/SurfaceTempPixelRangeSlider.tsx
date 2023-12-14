import {
    selectSpectralIndex4MaskTool,
    selectMaskOptions,
    // selectActiveAnalysisTool,
} from '@shared/store/MaskTool/selectors';
import { updateSelectedRange } from '@shared/store/MaskTool/thunks';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';

export const SurfaceTempCelsiusPixelRangeSlider = () => {
    const dispatch = useDispatch();

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    if (selectedSpectralIndex !== 'temperature celcius') {
        return null;
    }

    return (
        <PixelRangeSlider
            values={maskOptions.selectedRange}
            min={LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS}
            max={LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS}
            steps={1}
            valuesOnChange={(values) => {
                dispatch(updateSelectedRange(values));
            }}
            countOfTicks={0}
            tickLabels={[-30, -15, 0, 15, 30, 45, 60, 75, 90]}
            showSliderTooltip={true}
        />
    );
};

export const SurfaceTempFarhenheitPixelRangeSlider = () => {
    const dispatch = useDispatch();

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    const rangeValues = useMemo(() => {
        return [
            celsius2fahrenheit(maskOptions.selectedRange[0]),
            celsius2fahrenheit(maskOptions.selectedRange[1]),
        ];
    }, [maskOptions]);

    if (selectedSpectralIndex !== 'temperature farhenheit') {
        return null;
    }

    return (
        <PixelRangeSlider
            values={rangeValues}
            min={LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT}
            max={LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT}
            steps={1}
            valuesOnChange={(values) => {
                values = values.map((value) =>
                    Math.trunc(((value - 32) * 5) / 9)
                );

                dispatch(updateSelectedRange(values));
            }}
            countOfTicks={0}
            tickLabels={[-20, 0, 30, 60, 90, 120, 150, 180]}
            showSliderTooltip={true}
        />
    );
};
