import { getToken } from '@shared/utils/esri-oauth';
import { addItem } from './addItem';
import { getExtentByObjectId } from '../helpers/getExtentById';

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
     * Object ID of the selected imagery scene.
     */
    objectIdOfSelectedScene: number;
};

export const saveImagerySceneAsWebMap = async ({
    title,
    snippet,
    tags,
    serviceUrl,
    serviceName,
    objectIdOfSelectedScene,
}: SaveImagerySceneAsWebMapOptions) => {
    if (!objectIdOfSelectedScene) {
        throw new Error('No selected scene to save');
    }

    const token = getToken();

    const extent = await getExtentByObjectId({
        serviceUrl,
        objectId: objectIdOfSelectedScene,
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
                    id: `${serviceName}-${objectIdOfSelectedScene}`,
                    title: serviceName,
                    url: serviceUrl,
                    mosaicRule: {
                        ascending: true,
                        lockRasterIds: [objectIdOfSelectedScene],
                        mosaicMethod: 'esriMosaicLockRaster',
                    },
                    layerType: 'ArcGISImageServiceLayer',
                    timeAnimation: false,
                },
            ],
            baseMap: {
                baseMapLayers: [
                    // {
                    //   "id": "World_Hillshade_3805",
                    //   "opacity": 1,
                    //   "title": "World Hillshade",
                    //   "url": "https://servicesdev.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
                    //   "visibility": true,
                    //   "layerType": "ArcGISTiledMapServiceLayer"
                    // },
                    {
                        id: 'World_Topographic_Map',
                        opacity: 1,
                        title: 'World Topographic Map',
                        visibility: true,
                        layerType: 'VectorTileLayer',
                        styleUrl:
                            'https://cdn.arcgis.com/sharing/rest/content/items/7dc6cea0b1764a1f9af2e679f642f0f5/resources/styles/root.json',
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
