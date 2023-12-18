import { RasterFunctionSelector } from '@shared/components/RasterFunctionSelector';
import React from 'react';
import { useLandsatRasterFunctions } from './useLandsatRasterFunctions';

export const RasterFunctionSelectorContainer = () => {
    const data = useLandsatRasterFunctions();

    return <RasterFunctionSelector data={data} />;
};
