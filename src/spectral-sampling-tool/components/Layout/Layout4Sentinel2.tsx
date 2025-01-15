import React from 'react';
import { Sentinel2RasterFunctionSelector } from '../../../sentinel-2-explorer/components/RasterFunctionSelector';
import { useQueryAvailableSentinel2Scenes } from '../../../sentinel-2-explorer/hooks/useQueryAvailableLandsatScenes';

export const Layout4Sentinel2 = () => {
    useQueryAvailableSentinel2Scenes();

    return <Sentinel2RasterFunctionSelector />;
};
