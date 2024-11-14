import { getExtentByObjectId } from '../helpers/getExtentById';

/**
 * Get the raster function to clip a raster by a geometry
 * @param serviceUrl service url of the input imagery service
 * @param objectId object id of the imagery scene
 * @param token user token
 * @returns object with the raster function to clip a raster by a geometry
 *
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/raster-function-objects/#clip
 */
export const createClipRasterFunction = async (
    serviceUrl: string,
    objectId: number,
    token: string
) => {
    const clippingGeometry = await getExtentByObjectId({
        serviceUrl,
        objectId,
        token,
    });

    return {
        name: 'Clip',
        description:
            'Sets the extent of a raster using coordinates or another dataset.',
        function: {
            type: 'ClipFunction',
            pixelType: 'UNKNOWN',
            name: 'Clip',
            description:
                'Sets the extent of a raster using coordinates or another dataset.',
        },
        arguments: {
            Raster: {
                name: 'Raster',
                isPublic: false,
                isDataset: true,
                value: {
                    url: `${serviceUrl}?token=${token}`,
                    name: '', //'LandsatC2L2',
                    mosaicRule: {
                        ascending: false,
                        lockRasterIds: [objectId],
                        mosaicMethod: 'esriMosaicLockRaster',
                        where: `objectid in (${objectId})`,
                    },
                },
                type: 'RasterFunctionVariable',
            },
            ClippingType: {
                name: 'ClippingType',
                isPublic: false,
                isDataset: false,
                value: 1,
                type: 'RasterFunctionVariable',
            },
            ClippingRaster: {
                name: 'ClippingRaster',
                isPublic: false,
                isDataset: true,
                type: 'RasterFunctionVariable',
            },
            ClippingGeometry: {
                name: 'ClippingGeometry',
                isPublic: false,
                isDataset: false,
                value: clippingGeometry,
                type: 'RasterFunctionVariable',
            },
            // "Extent": {
            //     "name": "Extent",
            //     "isPublic": false,
            //     "isDataset": false,
            //     "value": clippingGeometry,
            //     "type": "RasterFunctionVariable"
            // },
            UseInputFeatureGeometry: {
                name: 'UseInputFeatureGeometry',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            type: 'ClipFunctionArguments',
        },
        functionType: 0,
        thumbnail: '',
        thumbnailEx: '',
        help: '',
    };
};
