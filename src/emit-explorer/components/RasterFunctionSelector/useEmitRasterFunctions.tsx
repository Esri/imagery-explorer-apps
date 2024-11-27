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
    EmitRasterFunctionName,
} from '@shared/services/emit-level-2a/config';

import EmitAgricultureThumbnail from './thumbnails/emit/Render_Agriculture.jpg';
import EmitBathymetricThumbnail from './thumbnails/emit/Render_Bathymetric.jpg';
import EmitColorIRThumbnail from './thumbnails/emit/Render_ColorIR.jpg';
import EmitNaturalColorThumbnail from './thumbnails/emit/Render_NaturalColor.jpg';
import EmitGeologyThumbnail from './thumbnails/emit/Render_Geology.jpg';
import EmitNDVIThumbnail from './thumbnails/emit/Render_NDVI.png';
import EmitShortWaveIRThumbnail from './thumbnails/emit/Render_ShortwaveIR.jpg';
import EmitThermalThumbnail from './thumbnails/emit/Render_Thermal.png';
import EmitMNDWIThumbnail from './thumbnails/emit/Render_MNDWI.png';
import EmitNDMIThumbnail from './thumbnails/emit/Render_NDMI.png';
import EmitUrbanThumbnail from './thumbnails/emit/Render_Urban.jpg';

import EmitMNDWILegend from './legends/emit/MNDWI.png';
import EmitNDVILegend from './legends/emit/NDVI.png';
import EmitNDMILegend from './legends/emit/NDMI.png';
import EmitThermalLegend from './legends/emit/Thermal.png';
import { RasterFunctionInfo } from '@typing/imagery-service';

const EmitRendererThumbnailByName: Record<
    EmitRasterFunctionName,
    string
> = {
    'Agriculture with DRA': EmitAgricultureThumbnail,
    'Bathymetric with DRA': EmitBathymetricThumbnail,
    'Color Infrared with DRA': EmitColorIRThumbnail,
    'Natural Color with DRA': EmitNaturalColorThumbnail,
    'Geology with DRA': EmitGeologyThumbnail,
    'NDVI Colorized': EmitNDVIThumbnail,
    'Short-wave Infrared with DRA': EmitShortWaveIRThumbnail,
    'Surface Temperature Colorized (Fahrenheit)': EmitThermalThumbnail,
    'Surface Temperature Colorized (Celsius)': EmitThermalThumbnail,
    'MNDWI Colorized': EmitMNDWIThumbnail,
    'Urban with DRA': EmitUrbanThumbnail,
    'NDMI Colorized': EmitNDMIThumbnail,
};

const EmitRendererLegendByName: Record<EmitRasterFunctionName, string> = {
    'Agriculture with DRA': null,
    'Bathymetric with DRA': null,
    'Color Infrared with DRA': null,
    'Natural Color with DRA': null,
    'Geology with DRA': null,
    'NDVI Colorized': EmitNDVILegend,
    'Short-wave Infrared with DRA': null,
    'Surface Temperature Colorized (Fahrenheit)': EmitThermalLegend,
    'Surface Temperature Colorized (Celsius)': EmitThermalLegend,
    'MNDWI Colorized': EmitMNDWILegend,
    'Urban with DRA': null,
    'NDMI Colorized': EmitNDMILegend,
};

export const getEmitRasterFunctionInfo = (): RasterFunctionInfo[] => {
    return EMIT_RASTER_FUNCTION_INFOS.map((d) => {
        const name: EmitRasterFunctionName =
            d.name as EmitRasterFunctionName;

        const thumbnail = EmitRendererThumbnailByName[name];
        const legend = EmitRendererLegendByName[name];

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
export const useEmitRasterFunctions = (): RasterFunctionInfo[] => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        return getEmitRasterFunctionInfo();
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
