import React, { useMemo } from 'react';
import { getRasterFunctionInfos as getLandsatRasterFunctionInfos } from '@shared/services/landsat-level-2/getRasterFunctionInfos';

import Agriculture from './thumbnails/Render_Agriculture.jpg';
import Bathymetric from './thumbnails/Render_Bathymetric.jpg';
import ColorIR from './thumbnails/Render_ColorIR.jpg';
import NaturalColor from './thumbnails/Render_NaturalColor.jpg';
import Geology from './thumbnails/Render_Geology.jpg';
import NDVI from './thumbnails/Render_NDVI.png';
import ShortWaveIR from './thumbnails/Render_ShortwaveIR.jpg';
import Thermal from './thumbnails/Render_Thermal.png';
import MNDWI from './thumbnails/Render_MNDWI.png';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

const LandsatRendererThumbnailByName: Partial<
    Record<LandsatRasterFunctionName, string>
> = {
    'Agriculture with DRA': Agriculture,
    'Bathymetric with DRA': Bathymetric,
    'Color Infrared with DRA': ColorIR,
    'Natural Color with DRA': NaturalColor,
    'Geology with DRA': Geology,
    'NDVI Colorized': NDVI,
    'Short-wave Infrared with DRA': ShortWaveIR,
    'Surface Temperature Colorized (Fahrenheit)': Thermal,
    'MNDWI Colorized': MNDWI,
};

export const getLandsatRasterFunctionsWithThumbnail = () => {
    const rasterFunctionInfos = getLandsatRasterFunctionInfos();
    return rasterFunctionInfos.map((d) => {
        return {
            ...d,
            thumbnail: LandsatRendererThumbnailByName[d.name],
        };
    });
};

export const useRasterFunctionInfosWithThumbnail = () => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        if (IMAGERY_SERVICE === 'landsat') {
            return getLandsatRasterFunctionsWithThumbnail();
        }

        return [];
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
