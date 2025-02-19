/* Copyright 2025 Esri
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
import ThumbnailMNDWI from './thumbnails/Sentinel2_NDWI.jpg';
import ThumbnailUrban from './thumbnails/Sentinel2_Urban.jpg';

import MNDWILegend from './legends/MNDWI.png';
import NDVILegend from './legends/NDVI.png';
import NDMILegend from './legends/NDMI.png';

const Sentinel2RendererThumbnailByName: Record<Sentinel2FunctionName, string> =
    {
        'Agriculture for Visualization': ThumbnailAgriculture,
        'Bathymetric for Visualization': ThumbnailBathymetric,
        'Color Infrared for Visualization': ThumbnailColorIR,
        'Natural Color for Visualization': ThumbnailNatrualColor,
        'Geology for Visualization': ThumbnailGeology,
        'Short-wave Infrared for Visualization': ThumbnailSWIR,
        'NDVI Colorized for Visualization': ThumbnailNDVI,
        'NDMI Colorized for Visualization': ThumbnailNDMI,
        'MNDWI Colorized for Visualization': ThumbnailMNDWI,
        'Urban for Visualization': ThumbnailUrban,
    };

const Sentinel2RendererLegendByName: Record<Sentinel2FunctionName, string> = {
    'Agriculture for Visualization': null,
    'Bathymetric for Visualization': null,
    'Color Infrared for Visualization': null,
    'Natural Color for Visualization': null,
    'Geology for Visualization': null,
    'Short-wave Infrared for Visualization': null,
    'NDVI Colorized for Visualization': NDVILegend,
    'NDMI Colorized for Visualization': NDMILegend,
    'MNDWI Colorized for Visualization': MNDWILegend,
    'Urban for Visualization': null,
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
