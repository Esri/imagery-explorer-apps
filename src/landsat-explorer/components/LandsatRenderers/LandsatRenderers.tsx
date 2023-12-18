import { RasterFunctionSelector } from '@shared/components/RasterFunctionSelector';
import React from 'react';
import { useRasterFunctionInfo } from './useRasterFunctionInfo';

export const LandsatRenderers = () => {
    const data = useRasterFunctionInfo();

    return <RasterFunctionSelector data={data} />;
};
