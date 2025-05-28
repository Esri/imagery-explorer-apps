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
import { PartialRootState } from '@shared/store/configureStore';
import { getPreloadedState4Map } from '@shared/store/Map/getPreloadedState';
import { getPreloadedState4UI } from '@shared/store/UI/getPreloadedState';
import { getPreloadedState4ChangeCompareTool } from '@shared/store/ChangeCompareTool/getPreloadedState';
import { getPreloadedTrendToolState } from '@shared/store/TrendTool/getPreloadedState';
import { getPreloadedState4MaskTool } from '@shared/store/MaskTool/getPrelaodedState';
import { InterestingPlaceData } from '@typing/shared';
// import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { getPreloadedState4ImageryScenes } from '@shared/store/ImageryScene/getPreloadedState';
import { getPreloadedState4SpectralProfileTool } from '@shared/store/SpectralProfileTool/getPreloadedState';
import {
    SENTINEL2_RASTER_FUNCTION_INFOS,
    Sentinel2FunctionName,
} from '@shared/services/sentinel-2/config';
import { getPreloadedState4PublishAndDownloadJobs } from '@shared/store/PublishAndDownloadJobs/getPreloadedState';
import { getMapCenterFromHashParams } from '@shared/utils/url-hash-params';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';
import { sentinel2InterestingPlaces } from '@sentinel2-explorer/components/Sentinel2InterestingPlaces';
import { getTimeExtentOfSentinel2Service } from '@shared/services/sentinel-2/getTimeExtent';
import { getTranslatedSentinel2RasterFunctionInfo } from '@sentinel2-explorer/utils/getTranslatedSentinel2RasterFunctionInfo';
import { getPreloadedState4ImageryService } from '@shared/store/ImageryService/getPrelaodedState';

export const getPreloadedState = async (): Promise<PartialRootState> => {
    // get default raster function and location and pass to the getPreloadedMapState, getPreloadedUIState and getPreloadedImageryScenesState

    const hashParams = new URLSearchParams(window.location.hash.slice(1));

    /**
     * Map location info that contains center and zoom info from URL Hash Params
     */
    const mapLocationFromHashParams = getMapCenterFromHashParams(hashParams);

    /**
     * Use the location of a randomly selected interesting place if there is no map location info
     * found in the URL hash params.
     */
    const randomInterestingPlace = !mapLocationFromHashParams
        ? getRandomElement(sentinel2InterestingPlaces)
        : null;

    const defaultRasterFunction: Sentinel2FunctionName =
        'Natural Color for Visualization';

    const PublishAndDownloadJobs =
        await getPreloadedState4PublishAndDownloadJobs();

    const timeExtent = await getTimeExtentOfSentinel2Service();

    const rasterFunctionInfo = getTranslatedSentinel2RasterFunctionInfo(
        SENTINEL2_RASTER_FUNCTION_INFOS
    );

    const preloadedState: PartialRootState = {
        Map: getPreloadedState4Map(hashParams, randomInterestingPlace),
        UI: getPreloadedState4UI(hashParams, randomInterestingPlace),
        ImageryScenes: getPreloadedState4ImageryScenes(
            hashParams,
            randomInterestingPlace,
            defaultRasterFunction
        ),
        ChangeCompareTool: getPreloadedState4ChangeCompareTool(hashParams),
        TrendTool: getPreloadedTrendToolState(hashParams),
        MaskTool: getPreloadedState4MaskTool(hashParams),
        SpectralProfileTool: getPreloadedState4SpectralProfileTool(hashParams),
        PublishAndDownloadJobs,
        ImageryService: getPreloadedState4ImageryService(
            timeExtent,
            rasterFunctionInfo
        ),
    };

    return preloadedState;
};
