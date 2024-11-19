/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useMemo } from 'react';
import {
    EMIT_RASTER_FUNCTION_INFOS,
    LandsatRasterFunctionName,
} from '@shared/services/emit-level-2a/config';

import LandsatAgricultureThumbnail from './thumbnails/emit/Render_Agriculture.jpg';
import LandsatBathymetricThumbnail from './thumbnails/emit/Render_Bathymetric.jpg';
import LandsatColorIRThumbnail from './thumbnails/emit/Render_ColorIR.jpg';
import LandsatNaturalColorThumbnail from './thumbnails/emit/Render_NaturalColor.jpg';
import LandsatGeologyThumbnail from './thumbnails/emit/Render_Geology.jpg';
import LandsatNDVIThumbnail from './thumbnails/emit/Render_NDVI.png';
import LandsatShortWaveIRThumbnail from './thumbnails/emit/Render_ShortwaveIR.jpg';
import LandsatThermalThumbnail from './thumbnails/emit/Render_Thermal.png';
import LandsatMNDWIThumbnail from './thumbnails/emit/Render_MNDWI.png';
import LandsatNDMIThumbnail from './thumbnails/emit/Render_NDMI.png';
import LandsatUrbanThumbnail from './thumbnails/emit/Render_Urban.jpg';

import LandsatMNDWILegend from './legends/emit/MNDWI.png';
import LandsatNDVILegend from './legends/emit/NDVI.png';
import LandsatNDMILegend from './legends/emit/NDMI.png';
import LandsatThermalLegend from './legends/emit/Thermal.png';
import { RasterFunctionInfo } from '@typing/emit-service';

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
    'NDMI Colorized': LandsatNDMIThumbnail,
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
    'NDMI Colorized': LandsatNDMILegend,
};

export const getLandsatRasterFunctionInfo = (): RasterFunctionInfo[] => {
    return EMIT_RASTER_FUNCTION_INFOS.map((d) => {
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
