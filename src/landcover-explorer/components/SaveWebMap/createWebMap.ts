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

import { ISpatialReference } from '@esri/arcgis-rest-request';
// import { PORTAL_ROOT } from '@landcover-explorer/constants';
import {
    // SENTINEL_2_10M_LAND_COVER_ITEM_ID,
    WEB_MAP_ID,
} from '@landcover-explorer/constants/map';
import { getToken } from '@shared/utils/esri-oauth';
import { getSignedInUser } from '@shared/utils/esri-oauth';
// import { MapExtent } from '@landcover-explorer/store/LandcoverExplorer/reducer';
import { LandCoverLayerBlendMode } from '../LandcoverLayer/useLandCoverLayer';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import Extent from '@arcgis/core/geometry/Extent';
import { init } from 'i18next';
import { AGOL_PORTAL_ROOT } from '@shared/config';

type CreateWebMapOptions = {
    /**
     * Title of the Web Map to be created
     */
    title: string;
    /**
     * Tags to be associated with the Web Map
     */
    tags: string;
    /**
     * Optional summary of the Web Map
     */
    summary?: string;
    /**
     * current map extent
     */
    extent: Extent;
    /**
     * The year selected by the user for the land cover layer.
     */
    selectedYear: number;
    /**
     * The years available for the land cover layer.
     */
    years: number[];
    /**
     * The title of the land cover layer to be used as prefix of the title of each layer.
     */
    landCoverLayerTitle: string;
    /**
     * The item ID of the land cover layer to be used in the web map.
     */
    landCoverLayerItemId: string;
    /**
     * The URL of the land cover layer to be used in the web map.
     */
    landCoverImageryServiceUrl: string;
    /**
     * The name of the field that contains the start time of the land cover layer.
     */
    landCoverLayerStartTimeField: string;
    /**
     * The type of the field that contains the start time of the land cover layer.
     */
    landCoverLayerStartTimeFieldType: 'number' | 'date';
    /**
     * the name of the application that is authoring the web map.
     */
    authoringApp: string;
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

type GetWebMapContentParameters = {
    /**
     * The year selected by the user for the land cover layer.
     */
    selectedYear: number;
    /**
     * The years available for the land cover layer.
     */
    years: number[];
    /**
     * The title of the land cover layer to be used as prefix of the title of each layer.
     */
    landCoverLayerTitle: string;
    /**
     * The item ID of the land cover layer to be used in the web map.
     */
    landCoverLayerItemId: string;
    /**
     * The URL of the land cover layer to be used in the web map.
     */
    landCoverImageryServiceUrl: string;
    /**
     * The name of the field that contains the start time of the land cover layer.
     */
    landCoverLayerStartTimeField: string;
    /**
     * The type of the field that contains the start time of the land cover layer.
     */
    landCoverLayerStartTimeFieldType: 'number' | 'date';
    /**
     * the name of the application that is authoring the web map.
     */
    authoringApp: string;
    /**
     * The extent of the web map in longitude and latitude.
     */
    extent: Extent;
};

/**
 * Retrieves the data of the Web Map with a Grayscale imagery basemap that is used in the Land Cover Explorer application.
 * The basemap layers will be utilized in the creation of a new web map by the user.
 * @returns {Promise<WebMapData>} A promise that resolves to the web map data.
 */
const getDataOfLandcoverAppWebmap = async (): Promise<WebMapData> => {
    const requestURL = `https://www.arcgis.com/sharing/rest/content/items/${WEB_MAP_ID}/data?f=json`;

    const res = await fetch(requestURL);

    if (!res.ok) {
        throw new Error('failed to fetch web map data');
    }

    const data = await res.json();

    return data;
};

/**
 * Get the JSON content for the web map item to be submitted.
 * @returns {Promise<string>} A promise that resolves to the JSON content of the web map.
 *
 * @see https://developers.arcgis.com/web-map-specification/
 */
const getWebMapContent = async ({
    selectedYear,
    years,
    landCoverLayerTitle,
    landCoverLayerItemId,
    landCoverImageryServiceUrl,
    landCoverLayerStartTimeField,
    landCoverLayerStartTimeFieldType,
    authoringApp,
    extent,
}: GetWebMapContentParameters) => {
    const data = await getDataOfLandcoverAppWebmap();

    const operationalLayersFromLandcoverAppWebmap =
        data?.operationalLayers || [];

    // const years = getAvailableYears();

    const landcoverLayers: LayerInfo[] = years.map((year) => {
        const definitionExpression =
            landCoverLayerStartTimeFieldType === 'number'
                ? `${landCoverLayerStartTimeField} = ${year}`
                : `${landCoverLayerStartTimeField} BETWEEN timestamp '${year}-01-01 00:00:00' AND timestamp '${year}-12-31 11:59:59'`;

        return {
            // only include itemId if the portal root is ArcGIS Online
            // this is to avoid issues with the itemId not being available in the custom portal
            itemId:
                AGOL_PORTAL_ROOT === 'https://www.arcgis.com'
                    ? landCoverLayerItemId
                    : '',
            layerType: 'ArcGISImageServiceLayer',
            // title: `Sentinel-2 10m Land Use/Land Cover Time Series ${year}`,
            title: `${landCoverLayerTitle} ${year}`,
            // url: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
            url: landCoverImageryServiceUrl,
            visibility: year === selectedYear,
            layerDefinition: {
                // definitionExpression: `${landCoverLayerStartTimeField} BETWEEN timestamp '${year}-01-01 00:00:00' AND timestamp '${year}-12-31 11:59:59'`,
                // definitionExpression: `${landCoverLayerStartTimeField} = ${year}`,
                definitionExpression,
            },
            blendMode: LandCoverLayerBlendMode,
            timeAnimation: false,
        };
    });

    const operationalLayers: LayerInfo[] = [
        ...operationalLayersFromLandcoverAppWebmap,
        ...landcoverLayers,
    ];

    const baseMapLayers = data?.baseMap?.baseMapLayers
        ? data.baseMap.baseMapLayers.map((layer: LayerInfo) => ({
              ...layer,
              // only include itemId if the portal root is ArcGIS Online
              // this is to avoid issues with the itemId not being available in the custom portal
              itemId:
                  AGOL_PORTAL_ROOT === 'https://www.arcgis.com'
                      ? layer.itemId
                      : '',
          }))
        : [];

    const content = {
        operationalLayers: operationalLayers,
        baseMap: {
            baseMapLayers: baseMapLayers,
            title: data?.baseMap?.title,
        },
        spatialReference: data?.spatialReference,
        version: data?.version,
        // authoringApp: 'EsriLandcoverExplorer',
        authoringApp: authoringApp,
        authoringAppVersion: '1.0.0',
        /**
         * Defines the initial state for web map.
         */
        initialState: {
            /**
             * Represents the location displayed on the map
             */
            viewpoint: {
                targetGeometry: {
                    type: 'extent',
                    xmin: extent.xmin,
                    ymin: extent.ymin,
                    xmax: extent.xmax,
                    ymax: extent.ymax,
                    spatialReference: {
                        wkid: 3857,
                    },
                },
            },
        },
    };

    return JSON.stringify(content);
};

/**
 * The input extent is in Web Mercator and we need to convert it to Longitude and Latitude in order to be used as Extent for the web map
 * @param extent
 * @returns
 */
const getWebMapExtentInLonLat = async (extent: Extent) => {
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
    selectedYear,
    extent,
    years,
    landCoverLayerTitle,
    landCoverLayerItemId,
    landCoverImageryServiceUrl,
    landCoverLayerStartTimeField,
    landCoverLayerStartTimeFieldType,
    authoringApp,
}: CreateWebMapOptions): Promise<CreateWebMapResponse> => {
    // const textContent = await getWebMapContent({
    //     selectedYear
    //     years: getAvailableYears(),
    //     landCoverLayerTitle: 'Sentinel-2 10m Land Use/Land Cover Time Series',
    //     landCoverLayerItemId: SENTINEL_2_10M_LAND_COVER_ITEM_ID,
    //     landCoverLayerUrl: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
    //     landCoverLayerStartTimeField: SENTINEL2_LANDCOVER_10M_START_TIME_FIELD,
    //     authoringApp: 'EsriLandcoverExplorer',
    // });

    const textContent = await getWebMapContent({
        selectedYear,
        years,
        landCoverLayerTitle,
        landCoverLayerItemId,
        landCoverImageryServiceUrl,
        landCoverLayerStartTimeField,
        landCoverLayerStartTimeFieldType,
        authoringApp,
        extent,
    });

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

    try {
        const user = getSignedInUser();

        if (!user || !user.username) {
            throw new Error('User is not signed in');
        }

        const requestURL = `${AGOL_PORTAL_ROOT}/sharing/rest/content/users/${user.username}/addItem`;

        const res = await fetch(requestURL, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(
                data.error?.message ||
                    'An error occurred while creating the web map.'
            );
        }

        return data as CreateWebMapResponse;
    } catch (error) {
        console.error('Error creating web map:', error);
        throw new Error(
            error.message || 'An error occurred while creating the web map.'
        );
    }
};
