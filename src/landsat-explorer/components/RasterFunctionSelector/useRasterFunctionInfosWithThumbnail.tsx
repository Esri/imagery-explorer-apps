import React, { useMemo } from 'react';
import { getRasterFunctionInfos } from '@shared/services/landsat-2/getRasterFunctionInfos';

import Agriculture from './thumbnails/Agriculture.jpg';
import Bathymetric from './thumbnails/Bathymetric.jpg';
import ColorIR from './thumbnails/Color-IR.jpg';
import NaturalColor from './thumbnails/natural-color.jpg';
import Geology from './thumbnails/Geology.jpg';
import NDVI from './thumbnails/NDVI.jpg';
import ShortWaveIR from './thumbnails/Short-Wave-IR.jpg';

const thumbnailByRasterFunctionName = {
    Agriculture: Agriculture,
    Bathymetric: Bathymetric,
    'Color Infrared': ColorIR,
    'Natural Color': NaturalColor,
    Geology: Geology,
    'NDVI Colorized': NDVI,
    'Short-wave Infrared': ShortWaveIR,
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
