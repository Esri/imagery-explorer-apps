import React, { useMemo } from 'react';
import {
    LANDSAT_RASTER_FUNCTION_INFOS,
    LandsatRasterFunctionName,
} from '@shared/services/landsat-level-2/config';

import LandsatAgricultureThumbnail from './thumbnails/Landsat/Render_Agriculture.jpg';
import LandsatBathymetricThumbnail from './thumbnails/Landsat/Render_Bathymetric.jpg';
import LandsatColorIRThumbnail from './thumbnails/Landsat/Render_ColorIR.jpg';
import LandsatNaturalColorThumbnail from './thumbnails/Landsat/Render_NaturalColor.jpg';
import LandsatGeologyThumbnail from './thumbnails/Landsat/Render_Geology.jpg';
import LandsatNDVIThumbnail from './thumbnails/Landsat/Render_NDVI.png';
import LandsatShortWaveIRThumbnail from './thumbnails/Landsat/Render_ShortwaveIR.jpg';
import LandsatThermalThumbnail from './thumbnails/Landsat/Render_Thermal.png';
import LandsatMNDWIThumbnail from './thumbnails/Landsat/Render_MNDWI.png';
import LandsatNDMIThumbnail from './thumbnails/Landsat/Render_NDMI.png';
import LandsatUrbanThumbnail from './thumbnails/Landsat/Render_Urban.jpg';

import LandsatMNDWILegend from './legends/Landsat/MNDWI.png';
import LandsatNDVILegend from './legends/Landsat/NDVI.png';
import LandsatNDMILegend from './legends/Landsat/NDMI.png';
import LandsatThermalLegend from './legends/Landsat/Thermal.png';
import { RasterFunctionInfo } from '@typing/imagery-service';

const LandsatRendererThumbnailByName: Record<
    LandsatRasterFunctionName,
    string
> = {
    'Agriculture with DRA': LandsatAgricultureThumbnail,
    'Bathymetric with DRA': LandsatBathymetricThumbnail,
    'Color Infrared with DRA': LandsatColorIRThumbnail,
    'Natural Color with DRA': LandsatNaturalColorThumbnail,
    'Geology with DRA': LandsatGeologyThumbnail,
    'NDVI Colorized': LandsatNDVIThumbnail,
    'Short-wave Infrared with DRA': LandsatShortWaveIRThumbnail,
    'Surface Temperature Colorized (Fahrenheit)': LandsatThermalThumbnail,
    'Surface Temperature Colorized (Celsius)': LandsatThermalThumbnail,
    'MNDWI Colorized': LandsatMNDWIThumbnail,
    'Urban with DRA': LandsatUrbanThumbnail,
    'NDWI Colorized': LandsatNDMIThumbnail,
};

const LandsatRendererLegendByName: Record<LandsatRasterFunctionName, string> = {
    'Agriculture with DRA': null,
    'Bathymetric with DRA': null,
    'Color Infrared with DRA': null,
    'Natural Color with DRA': null,
    'Geology with DRA': null,
    'NDVI Colorized': LandsatNDVILegend,
    'Short-wave Infrared with DRA': null,
    'Surface Temperature Colorized (Fahrenheit)': LandsatThermalLegend,
    'Surface Temperature Colorized (Celsius)': LandsatThermalLegend,
    'MNDWI Colorized': LandsatMNDWILegend,
    'Urban with DRA': null,
    'NDWI Colorized': LandsatNDMILegend,
};

export const getLandsatRasterFunctionInfo = (): RasterFunctionInfo[] => {
    return LANDSAT_RASTER_FUNCTION_INFOS.map((d) => {
        const name: LandsatRasterFunctionName =
            d.name as LandsatRasterFunctionName;

        const thumbnail = LandsatRendererThumbnailByName[name];
        const legend = LandsatRendererLegendByName[name];

        return {
            ...d,
            thumbnail,
            legend,
        } as RasterFunctionInfo;
    });
};

/**
 * Get raster function information that includes thumbnail and legend
 * @returns
 */
export const useLandsatRasterFunctions = (): RasterFunctionInfo[] => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        return getLandsatRasterFunctionInfo();
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
