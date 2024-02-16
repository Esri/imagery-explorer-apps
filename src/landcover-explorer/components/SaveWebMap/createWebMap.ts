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

import { ISpatialReference } from '@esri/arcgis-rest-request';
import { PORTAL_ROOT } from '@landcover-explorer/constants';
import {
    SENTINEL_2_10M_LAND_COVER_ITEM_ID,
    WEB_MAP_ID,
} from '@landcover-explorer/constants/map';
import { getToken } from '@landcover-explorer/utils/esriOAuth';
import { getSignedInUser } from '@landcover-explorer/utils/esriOAuth';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@landcover-explorer/services/sentinel-2-10m-landcover/config';
import { MapExtent } from '@landcover-explorer/store/Map/reducer';
import { LandCoverLayerBlendMode } from '../LandcoverLayer/useLandCoverLayer';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';

type CreateWebMapOptions = {
    title: string;
    tags: string;
    summary?: string;
    /**
     * current map extent
     */
    extent: MapExtent;
    /**
     * user selected year
     */
    year: number;
};

export type CreateWebMapResponse = {
    /**
     * The folder in which the item was created
     */
    folder: string;
    /**
     * The ID of the created item
     */
    id: string;
    /**
     * 	Indicates if the operation was successful
     */
    success: boolean;
};

type LayerInfo = {
    id?: string;
    itemId: string;
    layerType: string;
    opacity?: number;
    title: string;
    url: string;
    visibility: boolean;
    layerDefinition?: any;
};

type WebMapData = {
    version: string;
    spatialReference: ISpatialReference;
    operationalLayers: LayerInfo[];
    baseMap: {
        title: string;
        baseMapLayers: LayerInfo[];
    };
};

/**
 * Retrieves the data of the Web Map with a Grayscale imagery basemap that is used in the Land Cover Explorer application.
 * The basemap layers will be utilized in the creation of a new web map by the user.
 * @returns {Promise<WebMapData>} A promise that resolves to the web map data.
 */
const getDataOfLandcoverAppWebmap = async (): Promise<WebMapData> => {
    const requestURL = `${PORTAL_ROOT}/sharing/rest/content/items/${WEB_MAP_ID}/data?f=json`;

    const res = await fetch(requestURL);

    if (!res.ok) {
        throw new Error('failed to fetch web map data');
    }

    const data = await res.json();

    return data;
};

/**
 * Get the JSON content for the web map item to be submitted.
 * @returns
 */
const getWebMapContent = async (selectedYear: number) => {
    const data = await getDataOfLandcoverAppWebmap();

    const operationalLayersFromLandcoverAppWebmap =
        data?.operationalLayers || [];

    const years = getAvailableYears();

    const landcoverLayers: LayerInfo[] = years.map((year) => {
        return {
            itemId: SENTINEL_2_10M_LAND_COVER_ITEM_ID,
            layerType: 'ArcGISImageServiceLayer',
            title: `Sentinel-2 10m Land Use/Land Cover Time Series ${year}`,
            url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            visibility: year === selectedYear,
            layerDefinition: {
                definitionExpression: `StartDate BETWEEN timestamp '${year}-01-01 00:00:00' AND timestamp '${year}-12-31 11:59:59'`,
            },
            blendMode: LandCoverLayerBlendMode,
        };
    });

    const operationalLayers: LayerInfo[] = [
        ...operationalLayersFromLandcoverAppWebmap,
        ...landcoverLayers,
    ];

    const content = {
        operationalLayers: operationalLayers,
        baseMap: {
            baseMapLayers: data?.baseMap?.baseMapLayers || [],
            title: data?.baseMap?.title,
        },
        spatialReference: data?.spatialReference,
        version: data?.version,
        authoringApp: 'EsriLandcoverExplorer',
        authoringAppVersion: '1.0.0',
    };

    return JSON.stringify(content);
};

/**
 * The input extent is in Web Mercator and we need to convert it to Longitude and Latitude in order to be used as Extent for the web map
 * @param extent
 * @returns
 */
const getWebMapExtentInLonLat = async (extent: MapExtent) => {
    return [
        webMercatorUtils.xyToLngLat(extent.xmin, extent.ymin),
        webMercatorUtils.xyToLngLat(extent.xmax, extent.ymax),
    ];
};

/**
 * Create a Web Map item using `addItem` operation of ArcGIS Rest API.
 * @param param0
 * @returns
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm
 */
export const createWebMap = async ({
    title,
    tags,
    summary,
    year,
    extent,
}: CreateWebMapOptions): Promise<CreateWebMapResponse> => {
    const textContent = await getWebMapContent(year);

    const extentInLonLat = getWebMapExtentInLonLat(extent);

    const formData = new FormData();

    formData.append('title', title);
    formData.append('snippet', summary || '');
    formData.append('tags', tags);
    formData.append('extent', JSON.stringify(extentInLonLat));
    // formData.append('snippet', '')
    formData.append('text', textContent);
    formData.append('type', 'Web Map');
    formData.append('overwrite', 'true');
    formData.append('f', 'json');
    formData.append('token', getToken());

    const user = getSignedInUser();
    const requestURL = `${PORTAL_ROOT}/sharing/rest/content/users/${user.username}/addItem`;

    const res = await fetch(requestURL, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();

    return data as CreateWebMapResponse;
};
