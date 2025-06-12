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

import React, { useEffect, useState } from 'react';
import { WebMapMetadata } from './SaveWebMap';
import { CreateWebMapResponse, createWebMap } from './createWebMap';
import { selectYear } from '@shared/store/LandcoverExplorer/selectors';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMapExtent } from '@shared/store/Map/selectors';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import {
    SENTINEL2_LANDCOVER_10M_START_TIME_FIELD,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from '@shared/services/sentinel-2-10m-landcover/config';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_ID,
    WEB_MAP_ID,
} from '@landcover-explorer/constants/map';

export const useCreateWebmap = (webmapMetadata: WebMapMetadata) => {
    const mapExtent = useAppSelector(selectMapExtent);

    const year = useAppSelector(selectYear);

    const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);

    const [response, setResponse] = useState<CreateWebMapResponse>(null);

    const [errorSavingWebMap, setError] = useState<string>(null);

    useEffect(() => {
        if (webmapMetadata) {
            (async () => {
                setIsSavingChanges(true);
                setError(null);

                try {
                    const res = await createWebMap({
                        title: webmapMetadata?.title,
                        tags: webmapMetadata?.tags,
                        summary: webmapMetadata?.summary,
                        extent: mapExtent,
                        selectedYear: year,
                        years: getAvailableYears(),
                        landCoverLayerTitle:
                            'Sentinel-2 10m Land Use/Land Cover Time Series',
                        landCoverLayerItemId: SENTINEL_2_10M_LAND_COVER_ITEM_ID,
                        landCoverImageryServiceUrl:
                            SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
                        landCoverLayerStartTimeField:
                            SENTINEL2_LANDCOVER_10M_START_TIME_FIELD,
                        authoringApp: 'EsriLandcoverExplorer',
                    });

                    setResponse(res);
                } catch (err) {
                    console.log(err);
                    setError(
                        err.message ||
                            'An error occurred while creating the web map.'
                    );
                } finally {
                    setIsSavingChanges(false);
                }

                // setIsSavingChanges(false);
            })();
        } else {
            setResponse(null);
            setError(null);
        }
    }, [webmapMetadata]);

    return {
        response,
        isSavingChanges,
        errorSavingWebMap,
    };
};
