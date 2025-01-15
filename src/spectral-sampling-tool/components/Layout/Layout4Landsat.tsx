import { LandsatRasterFunctionSelector } from '@landsat-explorer/components/RasterFunctionSelector';
import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
import React from 'react';

export const Layout4Landsat = () => {
    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableLandsatScenes();

    return <LandsatRasterFunctionSelector />;
};
