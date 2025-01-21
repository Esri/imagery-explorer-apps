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
    SENTINEL2_RASTER_FUNCTION_INFOS,
    Sentinel2FunctionName,
} from '@shared/services/sentinel-2/config';

import { RasterFunctionInfo } from '@typing/imagery-service';

import ThumbnailNatrualColor from './thumbnails/Sentinel2_NaturalColor.jpg';
import ThumbnailAgriculture from './thumbnails/Sentinel2_Agriculture.jpg';
import ThumbnailColorIR from './thumbnails/Sentinel2_ColorIR.jpg';
import ThumbnailNDMI from './thumbnails/Sentinel2_NDMI.jpg';
import ThumbnailNDVI from './thumbnails/Sentinel2_NDVI.jpg';
import ThumbnailSWIR from './thumbnails/Sentinel2_SWIR.jpg';
import ThumbnailBathymetric from './thumbnails/Sentinel2_Bathymetric.jpg';
import ThumbnailGeology from './thumbnails/Sentinel2_Geology.jpg';
import ThumbnailNDWI from './thumbnails/Sentinel2_NDWI.jpg';

const Sentinel2RendererThumbnailByName: Record<Sentinel2FunctionName, string> =
    {
        'Agriculture with DRA': ThumbnailAgriculture,
        'Bathymetric with DRA': ThumbnailBathymetric,
        'Color Infrared with DRA': ThumbnailColorIR,
        'Natural Color with DRA': ThumbnailNatrualColor,
        'Geology with DRA': ThumbnailGeology,
        'Short-wave Infrared with DRA': ThumbnailSWIR,
        'NDVI Colorized': ThumbnailNDVI,
        'NDMI Colorized': ThumbnailNDMI,
        'NDWI Colorized': ThumbnailNDWI,
    };

const Sentinel2RendererLegendByName: Record<Sentinel2FunctionName, string> = {
    'Agriculture with DRA': null,
    'Bathymetric with DRA': null,
    'Color Infrared with DRA': null,
    'Natural Color with DRA': null,
    'Geology with DRA': null,
    'Short-wave Infrared with DRA': null,
    'NDVI Colorized': null,
    'NDMI Colorized': null,
    'NDWI Colorized': null,
    // 'Urban with DRA': null,
};

export const getSentinel2RasterFunctionInfo = (): RasterFunctionInfo[] => {
    return SENTINEL2_RASTER_FUNCTION_INFOS.map((d) => {
        const name: Sentinel2FunctionName = d.name as Sentinel2FunctionName;

        const thumbnail = Sentinel2RendererThumbnailByName[name];
        const legend = Sentinel2RendererLegendByName[name];

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
export const useSentinel2RasterFunctions = (): RasterFunctionInfo[] => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        return getSentinel2RasterFunctionInfo();
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
