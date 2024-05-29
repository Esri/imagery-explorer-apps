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
import Render_VV_VH from './thumbnails/Render_VV_VH.jpg';
import Render_WaterAnomaly from './thumbnails/Render_WaterAnomaly.jpg';
import Render_WaterIndex from './thumbnails/Render_WaterIndex.jpg';
import Render_FalseColor from './thumbnails/Render_FalseColor.jpg';

import SAR_FalseColorComposite_Legend from './legends/SAR_FalseColorComposite_Legend.png';
import SAR_SingleBandV2_Legend from './legends/SAR_SingleBandV2_Legend.png';
import SAR_WaterAnomaly_Legend from './legends/SAR_WaterAnomaly_Legend.png';

const Sentinel1RendererThumbnailByName: Partial<
    Record<Sentinel1FunctionName, string>
> = {
    'False Color dB with DRA': Render_FalseColor,
    'VV dB with Despeckle and DRA': Render_VV_VH,
    'VH dB with Despeckle and DRA': Render_VV_VH,
    // 'Sentinel-1 DpRVIc Raw': PlaceholderThumbnail,
    'Water Anomaly Index Colorized': Render_WaterAnomaly,
    'SWI Colorized': Render_WaterIndex,
    // 'Sentinel-1 RTC Despeckle VH Amplitude': PlaceholderThumbnail,
    // 'Sentinel-1 RTC Despeckle VV Amplitude': PlaceholderThumbnail,
    // 'NDMI Colorized': LandsatNDMIThumbnail,
};

const Sentinel1RendererLegendByName: Partial<
    Record<Sentinel1FunctionName, string>
> = {
    'False Color dB with DRA': SAR_FalseColorComposite_Legend,
    'VH dB with Despeckle and DRA': SAR_SingleBandV2_Legend,
    'VV dB with Despeckle and DRA': SAR_SingleBandV2_Legend,
    'Water Anomaly Index Colorized': SAR_WaterAnomaly_Legend,
};

export const getSentinel1RasterFunctionInfo = (): RasterFunctionInfo[] => {
    return SENTINEL1_RASTER_FUNCTION_INFOS.slice(0, 5).map((d) => {
        const name: Sentinel1FunctionName = d.name as Sentinel1FunctionName;

        const thumbnail = Sentinel1RendererThumbnailByName[name] || null;
        const legend = Sentinel1RendererLegendByName[name] || null;

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
