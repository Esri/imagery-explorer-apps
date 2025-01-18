import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import { selectPolarizationFilter } from '@shared/store/Sentinel1/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * Custom hook that returns the appropriate Sentinel-1 raster function name based on the selected polarization filter.
 *
 * @returns {Sentinel1FunctionName} The name of the Sentinel-1 raster function to use.
 */
export const useSentinel1RasterFunction4LogDiff = () => {
    const polarizationFilter = useAppSelector(selectPolarizationFilter);

    const sentinel1RasterFunction: Sentinel1FunctionName = useMemo(() => {
        const rasterFunction: Sentinel1FunctionName =
            polarizationFilter === 'VV'
                ? 'VV Amplitude with Despeckle'
                : 'VH Amplitude with Despeckle';
        return rasterFunction;
    }, [polarizationFilter]);

    return sentinel1RasterFunction;
};
