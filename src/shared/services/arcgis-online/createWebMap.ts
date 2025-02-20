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

import { getToken } from '@shared/utils/esri-oauth';
import { addItem, AddItemParams } from './addItem';
import { getExtentByObjectId } from '../helpers/getExtentById';
import { WorldTopographicMapStyleURL } from './config';

export type ImagerySceneData4WebMap = {
    objectId: number;
    acquisitionDate: string;
};

type SaveImagerySceneAsWebMapOptions = {
    title: string;
    snippet: string;
    tags: string[];
    description?: string;
    /**
     * Credits the source of the item.
     */
    accessInformation?: string;
    /**
     * 	Includes any license information or restrictions.
     */
    licenseInfo?: string;
    /**
     * URL of the original imagery service.
     */
    serviceUrl: string;
    /**
     * name of the imagery service. e.g. 'LandsatC2L2'
     */
    serviceName: string;
    /**
     * Data the selected imagery scenes.
     */
    scenes: ImagerySceneData4WebMap[];
    /**
     * If true, all scenes will be saved in a single layer. Otherwise, each scene will be saved in a separate layer.
     */
    singleLayerWithMultipleScenes: boolean;
};

type OperationalLayerData = {
    id: string;
    title: string;
    url: string;
    mosaicRule?: {
        ascending: boolean;
        lockRasterIds: number[];
        mosaicMethod: string;
    };
    layerType: string;
    timeAnimation?: boolean;
    layerDefinition?: {
        definitionExpression: string;
        activePresetRendererName: string;
    };
};

type GetOperationalLayersOptions = {
    scenes: ImagerySceneData4WebMap[];
    serviceUrl: string;
    serviceName: string;
    singleLayerWithMultipleScenes: boolean;
};

const getOperationalLayers = ({
    scenes,
    serviceUrl,
    serviceName,
    singleLayerWithMultipleScenes,
}: GetOperationalLayersOptions): OperationalLayerData[] => {
    if (singleLayerWithMultipleScenes) {
        const id = `${serviceName} - Multiple Scenes`;
        return [
            {
                id,
                title: id,
                url: serviceUrl,
                mosaicRule: {
                    ascending: true,
                    lockRasterIds: scenes.map((d) => d.objectId),
                    mosaicMethod: 'esriMosaicLockRaster',
                },
                layerDefinition: {
                    definitionExpression: `objectid in (${scenes
                        .map((d) => d.objectId)
                        .join(',')})`,
                    activePresetRendererName: '',
                },
                layerType: 'ArcGISImageServiceLayer',
                timeAnimation: false,
            },
        ];
    }

    return scenes.map((scene) => {
        const id = `${serviceName} - Single Scene ${scene.acquisitionDate}`;
        return {
            id,
            title: id,
            url: serviceUrl,
            mosaicRule: {
                ascending: true,
                lockRasterIds: [scene.objectId],
                mosaicMethod: 'esriMosaicLockRaster',
            },
            layerDefinition: {
                definitionExpression: `objectid in (${scene.objectId})`,
                activePresetRendererName: '',
            },
            layerType: 'ArcGISImageServiceLayer',
            timeAnimation: false,
        };
    });
};

/**
 * Saves the selected imagery scenes as a web map in ArcGIS Online.
 *
 * @param {Object} options - The options for saving the web map.
 * @param {string} options.title - The title of the web map.
 * @param {string} options.snippet - A brief summary of the web map.
 * @param {string[]} options.tags - An array of tags associated with the web map.
 * @param {string} options.serviceUrl - The URL of the imagery service.
 * @param {string} options.serviceName - The name of the imagery service.
 * @param {Array} options.scenes - An array of scenes to be included in the web map.
 * @param {boolean} options.singleLayerWithMultipleScenes - Whether to use a single layer with multiple scenes.
 * @throws {Error} If no scenes are selected to save.
 * @returns {Promise<Object>} The response from the addItem request.
 */
export const saveImagerySceneAsWebMap = async ({
    title,
    snippet,
    tags,
    serviceUrl,
    serviceName,
    scenes,
    singleLayerWithMultipleScenes,
    description,
    accessInformation,
    licenseInfo,
}: SaveImagerySceneAsWebMapOptions) => {
    if (!scenes || scenes.length === 0) {
        throw new Error('No selected scene to save');
    }

    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    const extent = await getExtentByObjectId({
        serviceUrl,
        objectId: scenes[0].objectId,
        token,
        outputSpatialReference: 4326,
    });

    const operationalLayers = getOperationalLayers({
        scenes,
        serviceUrl,
        serviceName,
        singleLayerWithMultipleScenes,
    });

    const requestBody: AddItemParams = {
        // f: 'json',
        extent: JSON.stringify([
            [extent.xmin, extent.ymin],
            [extent.xmax, extent.ymax],
        ]),
        tags: tags.join(','), //'Landsat, Landsat-Level-2 Imagery, Remote Sensing',
        title,
        snippet,
        type: 'Web Map',
        typeKeywords: 'ArcGIS API for JavaScript',
        text: JSON.stringify({
            operationalLayers,
            // operationalLayers: [
            //     {
            //         id: `${serviceName}`,
            //         title: serviceName,
            //         url: serviceUrl,
            //         mosaicRule: {
            //             ascending: true,
            //             lockRasterIds: scenes.map((d) => d.objectId),
            //             mosaicMethod: 'esriMosaicLockRaster',
            //         },
            //         layerType: 'ArcGISImageServiceLayer',
            //         timeAnimation: false,
            //     },
            // ],
            baseMap: {
                baseMapLayers: [
                    {
                        id: 'World_Topographic_Map',
                        opacity: 1,
                        title: 'World Topographic Map',
                        visibility: true,
                        layerType: 'VectorTileLayer',
                        styleUrl: WorldTopographicMapStyleURL,
                    },
                ],
                title: 'Topographic',
            },
            authoringApp: 'Esri Imagery Explorer Apps',
            initialState: {
                viewpoint: {
                    targetGeometry: extent,
                },
            },
            spatialReference: {
                latestWkid: 3857,
                wkid: 102100,
            },
            timeZone: 'system',
            version: '2.32',
        }),
        description,
        accessInformation,
        licenseInfo,
        // token: getToken(),
    };

    const res = await addItem(requestBody);

    return res;
};
