import React, { useMemo } from 'react';
import { getRasterFunctionInfos } from '@shared/services/landsat-2/getRasterFunctionInfos';

import Agriculture from './thumbnails/Render_Agriculture.jpg';
import Bathymetric from './thumbnails/Render_Bathymetric.jpg';
import ColorIR from './thumbnails/Render_ColorIR.jpg';
import NaturalColor from './thumbnails/Render_NaturalColor.jpg';
import Geology from './thumbnails/Render_Geology.jpg';
import NDVI from './thumbnails/Render_NDVI.jpg';
import ShortWaveIR from './thumbnails/Render_ShortwaveIR.jpg';

const thumbnailByRasterFunctionName = {
    'Agriculture with DRA': Agriculture,
    'Bathymetric with DRA': Bathymetric,
    'Color Infrared with DRA': ColorIR,
    'Natural Color with DRA': NaturalColor,
    'Geology with DRA': Geology,
    'NDVI Colorized': NDVI,
    'Short-wave Infrared with DRA': ShortWaveIR,
};

export const useRasterFunctionInfosWithThumbnail = () => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        const rasterFunctionInfos = getRasterFunctionInfos();
        return rasterFunctionInfos.map((d) => {
            return {
                ...d,
                thumbnail: thumbnailByRasterFunctionName[d.name],
            };
        });
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
