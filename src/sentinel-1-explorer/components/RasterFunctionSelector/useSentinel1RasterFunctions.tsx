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
    SENTINEL1_RASTER_FUNCTION_INFOS,
    Sentinel1FunctionName,
} from '@shared/services/sentinel-1/config';

import { RasterFunctionInfo } from '@typing/imagery-service';

import PlaceholderThumbnail from './thumbnails/placeholder.jpg';

const Sentinel1RendererThumbnailByName: Record<Sentinel1FunctionName, string> =
    {
        'Sentinel-1 RGB dB DRA': PlaceholderThumbnail,
        'Sentinel-1 RTC VH dB with DRA': PlaceholderThumbnail,
        'Sentinel-1 RTC VV dB with DRA': PlaceholderThumbnail,
        // 'NDMI Colorized': LandsatNDMIThumbnail,
    };

const Sentinel1RendererLegendByName: Record<Sentinel1FunctionName, string> = {
    'Sentinel-1 RGB dB DRA': null,
    'Sentinel-1 RTC VH dB with DRA': null,
    'Sentinel-1 RTC VV dB with DRA': null,
};

export const getSentinel1RasterFunctionInfo = (): RasterFunctionInfo[] => {
    return SENTINEL1_RASTER_FUNCTION_INFOS.map((d) => {
        const name: Sentinel1FunctionName = d.name as Sentinel1FunctionName;

        const thumbnail = Sentinel1RendererThumbnailByName[name];
        const legend = Sentinel1RendererLegendByName[name];

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
export const useSentinel1RasterFunctions = (): RasterFunctionInfo[] => {
    const rasterFunctionInfosWithThumbnail = useMemo(() => {
        return getSentinel1RasterFunctionInfo();
    }, []);

    return rasterFunctionInfosWithThumbnail;
};
