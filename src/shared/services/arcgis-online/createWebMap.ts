import { getToken } from '@shared/utils/esri-oauth';
import { addItem } from './addItem';
import { getExtentByObjectId } from '../helpers/getExtentById';
import { WorldTopographicMapStyleURL } from './config';

type SaveImagerySceneAsWebMapOptions = {
    title: string;
    snippet: string;
    tags: string[];
    /**
     * URL of the original imagery service.
     */
    serviceUrl: string;
    /**
     * name of the imagery service. e.g. 'LandsatC2L2'
     */
    serviceName: string;
    /**
     * Object IDs of the selected imagery scenes.
     */
    objectIdOfSelectedScenes: number[];
};

export const saveImagerySceneAsWebMap = async ({
    title,
    snippet,
    tags,
    serviceUrl,
    serviceName,
    objectIdOfSelectedScenes,
}: SaveImagerySceneAsWebMapOptions) => {
    if (!objectIdOfSelectedScenes || objectIdOfSelectedScenes.length === 0) {
        throw new Error('No selected scene to save');
    }

    const token = getToken();

    const extent = await getExtentByObjectId({
        serviceUrl,
        objectId: objectIdOfSelectedScenes[0],
        token,
        outputSpatialReference: 4326,
    });

    const requestBody = new URLSearchParams({
        f: 'json',
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
            operationalLayers: [
                {
                    id: `${serviceName}-${objectIdOfSelectedScenes.join('-')}`,
                    title: serviceName,
                    url: serviceUrl,
                    mosaicRule: {
                        ascending: true,
                        lockRasterIds: objectIdOfSelectedScenes,
                        mosaicMethod: 'esriMosaicLockRaster',
                    },
                    layerType: 'ArcGISImageServiceLayer',
                    timeAnimation: false,
                },
            ],
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
        token: getToken(),
    });

    const res = await addItem(requestBody);

    return res;
};
