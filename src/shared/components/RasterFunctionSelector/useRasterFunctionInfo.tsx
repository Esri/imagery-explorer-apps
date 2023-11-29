import React, { useMemo } from 'react';
import { getRasterFunctionInfos as getLandsatRasterFunctionInfos } from '@shared/services/landsat-level-2/getRasterFunctionInfos';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

import LandsatAgricultureThumbnail from './thumbnails/Landsat/Render_Agriculture.jpg';
import LandsatBathymetricThumbnail from './thumbnails/Landsat/Render_Bathymetric.jpg';
import LandsatColorIRThumbnail from './thumbnails/Landsat/Render_ColorIR.jpg';
import LandsatNaturalColorThumbnail from './thumbnails/Landsat/Render_NaturalColor.jpg';
import LandsatGeologyThumbnail from './thumbnails/Landsat/Render_Geology.jpg';
import LandsatNDVIThumbnail from './thumbnails/Landsat/Render_NDVI.png';
import LandsatShortWaveIRThumbnail from './thumbnails/Landsat/Render_ShortwaveIR.jpg';
import LandsatThermalThumbnail from './thumbnails/Landsat/Render_Thermal.png';
import LandsatMNDWIThumbnail from './thumbnails/Landsat/Render_MNDWI.png';

import LandsatMNDWILegend from './legends/Landsat/MNDWI.png';
import LandsatNDVILegend from './legends/Landsat/NDVI.png';
import LandsatNDMILegend from './legends/Landsat/NDMI.png';
import LandsatThermalLegend from './legends/Landsat/Thermal.png';

const LandsatRendererThumbnailByName: Partial<
    Record<LandsatRasterFunctionName, string>
> = {
    'Agriculture with DRA': LandsatAgricultureThumbnail,
    'Bathymetric with DRA': LandsatBathymetricThumbnail,
    'Color Infrared with DRA': LandsatColorIRThumbnail,
    'Natural Color with DRA': LandsatNaturalColorThumbnail,
    'Geology with DRA': LandsatGeologyThumbnail,
    'NDVI Colorized': LandsatNDVIThumbnail,
    'Short-wave Infrared with DRA': LandsatShortWaveIRThumbnail,
    'Surface Temperature Colorized (Fahrenheit)': LandsatThermalThumbnail,
    'MNDWI Colorized': LandsatMNDWIThumbnail,
};

const LandsatRendererLegendByName: Partial<
    Record<LandsatRasterFunctionName, string>
> = {
    'Agriculture with DRA': null,
    'Bathymetric with DRA': null,
    'Color Infrared with DRA': null,
    'Natural Color with DRA': null,
    'Geology with DRA': null,
    'NDVI Colorized': LandsatNDVILegend,
    'Short-wave Infrared with DRA': null,
    'Surface Temperature Colorized (Fahrenheit)': LandsatThermalLegend,
    'MNDWI Colorized': LandsatMNDWILegend,
};

export const getLandsatRasterFunctionInfo = () => {
    const rasterFunctionInfos = getLandsatRasterFunctionInfos();
    return rasterFunctionInfos.map((d) => {
        return {
            ...d,
            thumbnail: LandsatRendererThumbnailByName[d.name],
            legend: LandsatRendererLegendByName[d.name],
        };
    });
};

/**
 * Get raster function information that includes thumbnail and legend
 * @returns
 */
export const useRasterFunctionInfo = () => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        if (APP_NAME === 'landsat') {
            return getLandsatRasterFunctionInfo();
        }

        return [];
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
