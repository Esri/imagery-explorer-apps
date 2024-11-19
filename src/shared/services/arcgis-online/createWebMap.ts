import { getToken } from '@shared/utils/esri-oauth';
import { addItem } from './addItem';
import { getExtentByObjectId } from '../helpers/getExtentById';

type SaveImagerySceneAsWebMapOptions = {
    title: string;
    snippet: string;
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
        tags: 'Landsat, Landsat-Level-2 Imagery, Remote Sensing',
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
                    // "popupInfo": {
                    //   "popupElements": [
                    //     {
                    //       "type": "fields"
                    //     },
                    //     {
                    //       "type": "attachments",
                    //       "displayType": "auto"
                    //     }
                    //   ],
                    //   "showAttachments": true,
                    //   "fieldInfos": [
                    //     {
                    //       "fieldName": "objectid",
                    //       "isEditable": false,
                    //       "label": "objectid",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "name",
                    //       "isEditable": true,
                    //       "label": "name",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "acquisitiondate",
                    //       "isEditable": true,
                    //       "label": "acquisitiondate",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Agriculture with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Agriculture with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Bathymetric with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Bathymetric with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "best",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "best",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "category",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "category",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "centerx",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "centerx",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "centery",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "centery",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "cloudcover",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "cloudcover",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Color Infrared with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Color Infrared with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "dataset_id",
                    //       "isEditable": true,
                    //       "label": "Dataset_ID",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "dayofyear",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "dayofyear",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Geology with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Geology with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "groupname",
                    //       "isEditable": true,
                    //       "label": "groupname",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "highps",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "highps",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ItemPixelValue",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Item Pixel Value",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "landsat_scene_id",
                    //       "isEditable": true,
                    //       "label": "landsat_scene_id",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "lowps",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "lowps",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "maxps",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "maxps",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "minps",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "minps",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.MNDWI Colorized",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "MNDWI Colorized",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.MNDWI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "MNDWI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "month",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "month",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.MSAVI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "MSAVI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Natural Color with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Natural Color with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NBR Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NBR Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDBI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDBI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDMI Colorized",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDMI Colorized",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDMI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDMI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDVI Colorized",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDVI Colorized",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDVI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDVI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDWI Colorized",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDWI Colorized",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.NDWI Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "NDWI Raw",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "numdate",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "NumDate",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "pr",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "pr",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "product_id_l1",
                    //       "isEditable": true,
                    //       "label": "product_id_l1",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "productname",
                    //       "isEditable": true,
                    //       "label": "productname",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Raw",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Raw Service Pixel Value",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "sensorname",
                    //       "isEditable": true,
                    //       "label": "sensorname",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Service Pixel Value",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Short-wave Infrared with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Short-wave Infrared with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "sunazimuth",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "sunazimuth",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "sunelevation",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 2
                    //       },
                    //       "isEditable": true,
                    //       "label": "sunelevation",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Surface Temperature (Celsius)",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Surface Temperature (Celsius)",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Surface Temperature (Fahrenheit)",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Surface Temperature (Fahrenheit)",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Surface Temperature Colorized (Celsius)",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Surface Temperature Colorized (Celsius)",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Surface Temperature Colorized (Fahrenheit)",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Surface Temperature Colorized (Fahrenheit)",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "tag",
                    //       "isEditable": true,
                    //       "label": "tag",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "Raster.ServicePixelValue.Urban with DRA",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": false,
                    //       "label": "Urban with DRA",
                    //       "visible": false
                    //     },
                    //     {
                    //       "fieldName": "wrs_path",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "wrs_path",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "wrs_row",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "wrs_row",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "year",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "year",
                    //       "visible": true
                    //     },
                    //     {
                    //       "fieldName": "zorder",
                    //       "format": {
                    //         "digitSeparator": true,
                    //         "places": 0
                    //       },
                    //       "isEditable": true,
                    //       "label": "zorder",
                    //       "visible": true
                    //     }
                    //   ],
                    //   "title": "LandsatC2L2: {name}"
                    // }
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
