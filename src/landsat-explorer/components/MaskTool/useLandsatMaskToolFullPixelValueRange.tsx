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
