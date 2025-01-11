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

import ThumbnailPlaceholder from './thumbnails/Imagery_NaturalColor.png';
import ThumbnailNatrualColor from './thumbnails/Imagery_NaturalColor.png';
import ThumbnailAgriculture from './thumbnails/Imagery_Agriculture.png';
import ThumbnailColorIR from './thumbnails/Imagery_ColorIR.png';
import ThumbnailNDMI from './thumbnails/Imagery_NDMI.png';
import ThumbnailNDVI from './thumbnails/Imagery_NDVI.png';
import ThumbnailSWIR from './thumbnails/Imagery_SWIR.png';

const Sentinel2RendererThumbnailByName: Record<Sentinel2FunctionName, string> =
    {
        'Agriculture with DRA': ThumbnailAgriculture,
        'Bathymetric with DRA': ThumbnailPlaceholder,
        'Color Infrared with DRA': ThumbnailColorIR,
        'Natural Color with DRA': ThumbnailNatrualColor,
        'Geology with DRA': ThumbnailPlaceholder,
        'Short-wave Infrared with DRA': ThumbnailSWIR,
        'NDVI Colormap': ThumbnailNDVI,
        'NDMI Colorized': ThumbnailNDMI,
        'NDWI Colorized': ThumbnailPlaceholder,
        'Urban with DRA': ThumbnailPlaceholder,
    };

const Sentinel2RendererLegendByName: Record<Sentinel2FunctionName, string> = {
    'Agriculture with DRA': null,
    'Bathymetric with DRA': null,
    'Color Infrared with DRA': null,
    'Natural Color with DRA': null,
    'Geology with DRA': null,
    'Short-wave Infrared with DRA': null,
    'NDVI Colormap': null,
    'NDMI Colorized': null,
    'NDWI Colorized': null,
    'Urban with DRA': null,
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
