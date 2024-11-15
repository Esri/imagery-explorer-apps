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

export const createMaskIndexRasterFunction = async (
    serviceUrl: string,
    objectId: number,
    token: string,
    bandIndexes: string,
    pixelValueRanges: number[]
) => {
    const clipRasterFunction = await createClipRasterFunction(
        serviceUrl,
        objectId,
        token
    );

    return {
        name: 'Remap',
        description:
            'Changes pixel values by assigning new values to ranges of pixel values or using an external table.',
        function: {
            type: 'RemapFunction',
            pixelType: 'UNKNOWN',
            name: 'Remap',
            description:
                'Changes pixel values by assigning new values to ranges of pixel values or using an external table.',
        },
        arguments: {
            Raster: {
                name: 'Band Arithmetic',
                description:
                    'Calculates indexes using predefined formulas or a user-defined expression.',
                function: {
                    type: 'BandArithmeticFunction',
                    pixelType: 'UNKNOWN',
                    name: 'Band Arithmetic',
                    description:
                        'Calculates indexes using predefined formulas or a user-defined expression.',
                },
                arguments: {
                    Raster: clipRasterFunction,
                    Method: {
                        name: 'Method',
                        isPublic: false,
                        isDataset: false,
                        value: 0,
                        type: 'RasterFunctionVariable',
                    },
                    BandIndexes: {
                        name: 'BandIndexes',
                        isPublic: false,
                        isDataset: false,
                        value: bandIndexes,
                        type: 'RasterFunctionVariable',
                    },
                    type: 'BandArithmeticFunctionArguments',
                },
                functionType: 0,
                thumbnail: '',
                thumbnailEx: '',
                help: '',
            },
            UseTable: {
                name: 'UseTable',
                isPublic: false,
                isDataset: false,
                value: false,
                type: 'RasterFunctionVariable',
            },
            InputRanges: {
                name: 'InputRanges',
                isPublic: false,
                isDataset: false,
                // "value": [
                //     0,
                //     1
                // ],
                value: pixelValueRanges,
                type: 'RasterFunctionVariable',
            },
            OutputValues: {
                name: 'OutputValues',
                isPublic: false,
                isDataset: false,
                value: [1],
                type: 'RasterFunctionVariable',
            },
            // "NoDataRanges": {
            //     "name": "NoDataRanges",
            //     "isPublic": false,
            //     "isDataset": false,
            //     "value": [

            //     ],
            //     "type": "RasterFunctionVariable"
            // },
            Table: {
                name: 'Table',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            InputField: {
                name: 'InputField',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            OutputField: {
                name: 'OutputField',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            InputMaxField: {
                name: 'InputMaxField',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            RemapTableType: {
                name: 'RemapTableType',
                isPublic: false,
                isDataset: false,
                value: 1,
                type: 'RasterFunctionVariable',
            },
            AllowUnmatched: {
                name: 'AllowUnmatched',
                isPublic: false,
                isDataset: false,
                value: false,
                type: 'RasterFunctionVariable',
            },
            ReplacementValue: {
                name: 'ReplacementValue',
                isPublic: false,
                isDataset: false,
                type: 'RasterFunctionVariable',
            },
            type: 'RemapFunctionArguments',
        },
        functionType: 0,
        thumbnail: '',
        thumbnailEx: '',
        help: '',
    };
};
