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

/**
 * Retrieves the targeting service from the URL search parameters.
 *
 * This function parses the current window's URL search parameters to find the value
 * associated with the 'service' key. It then casts this value to the `SpectralSamplingToolSupportedService` type.
 * If the 'service' parameter is not present in the URL, it defaults to 'landsat'.
 *
 * @returns {SpectralSamplingToolSupportedService} The targeting service specified in the URL, or 'landsat' if not specified.
 */
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import { getTimeExtentOfSentinel2Service } from '@shared/services/sentinel-2/getTimeExtent';
import { getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
import {
    ImageryServiceTimeExtentData,
    RasterFunctionInfo,
} from '@typing/imagery-service';
import { LANDSAT_RASTER_FUNCTION_INFOS } from '@shared/services/landsat-level-2/config';
import { SENTINEL2_RASTER_FUNCTION_INFOS } from '@shared/services/sentinel-2/config';
import { getTranslatedSentinel2RasterFunctionInfo } from '@sentinel2-explorer/utils/getTranslatedSentinel2RasterFunctionInfo';
import { getTranslatedLandsatRasterFunctionInfo } from '@landsat-explorer/utils/getTranslatedLandsatRasterFunctionInfo';

export const getTargetService = (): SpectralSamplingToolSupportedService => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetingService = searchParams.get(
        'service'
    ) as SpectralSamplingToolSupportedService;
    return targetingService || 'landsat';
};

export const getTimeExtentByTargetService = async (
    targetService: SpectralSamplingToolSupportedService
): Promise<ImageryServiceTimeExtentData> => {
    let timeExtent: ImageryServiceTimeExtentData = null;

    if (targetService === 'landsat') {
        timeExtent = await getTimeExtentOfLandsatService();
    }

    if (targetService === 'sentinel-2') {
        timeExtent = await getTimeExtentOfSentinel2Service();
    }

    return timeExtent;
};

export const getRasterFunctionInfoByTargetService = (
    targetService: SpectralSamplingToolSupportedService
): RasterFunctionInfo[] => {
    if (targetService === 'landsat') {
        return getTranslatedLandsatRasterFunctionInfo(
            LANDSAT_RASTER_FUNCTION_INFOS
        );
    }

    if (targetService === 'sentinel-2') {
        return getTranslatedSentinel2RasterFunctionInfo(
            SENTINEL2_RASTER_FUNCTION_INFOS
        );
    }

    return null;
};
