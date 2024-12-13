import { Geometry } from '@arcgis/core/geometry';

/**
 * Creates a raster function to clip a raster based on the provided geometry.
 *
 * @param {Object} params - Parameters to define the raster clip function.
 * @param {string} params.serviceUrl - URL of the imagery service.
 * @param {number} params.objectId - Object ID of the imagery scene to clip.
 * @param {string} params.token - User token for authentication.
 * @param {Geometry} params.clippingGeometry - Geometry object used to clip the raster.
 * @returns {Object} Object representing the raster function for clipping.
 *
 * @see {@link https://developers.arcgis.com/rest/services-reference/enterprise/raster-function-objects/#clip}
 */
export const createClipRasterFunction = ({
    serviceUrl,
    objectId,
    token,
    clippingGeometry,
}: {
    serviceUrl: string;
    objectId: number;
    token: string;
    clippingGeometry: Geometry;
}) => {
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

export const createBandArithmeticRasterFunction = ({
    serviceUrl,
    objectId,
    token,
    bandIndexes,
    clippingGeometry,
}: {
    serviceUrl: string;
    objectId: number;
    token: string;
    bandIndexes: string;
    clippingGeometry: Geometry;
}) => {
    const clipRasterFunction = createClipRasterFunction({
        serviceUrl,
        objectId,
        token,
        clippingGeometry,
    });

    return {
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
    };
};

/**
 * Creates a raster function to generate a mask or index using clipping and band arithmetic.
 *
 * @param {Object} params - Parameters for creating the mask/index function.
 * @param {string} params.serviceUrl - URL of the imagery service.
 * @param {number} params.objectId - Object ID of the imagery scene.
 * @param {string} params.token - User token for authentication.
 * @param {string} params.bandIndexes - Comma-separated string of band indexes.
 * @param {number[]} params.pixelValueRange - Array specifying pixel value ranges.
 * @param {Geometry} params.clippingGeometry - Geometry object used for clipping.
 * @returns {Object} Object representing the mask/index raster function.
 */
export const createMaskIndexRasterFunction = ({
    serviceUrl,
    objectId,
    token,
    bandIndexes,
    pixelValueRange,
    clippingGeometry,
}: {
    serviceUrl: string;
    objectId: number;
    token: string;
    bandIndexes: string;
    pixelValueRange: number[];
    clippingGeometry: Geometry;
}) => {
    const bandArithmeticRasterFunction = createBandArithmeticRasterFunction({
        serviceUrl,
        objectId,
        token,
        bandIndexes,
        clippingGeometry,
    });

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
            // Raster: {
            //     name: 'Band Arithmetic',
            //     description:
            //         'Calculates indexes using predefined formulas or a user-defined expression.',
            //     function: {
            //         type: 'BandArithmeticFunction',
            //         pixelType: 'UNKNOWN',
            //         name: 'Band Arithmetic',
            //         description:
            //             'Calculates indexes using predefined formulas or a user-defined expression.',
            //     },
            //     arguments: {
            //         Raster: clipRasterFunction,
            //         Method: {
            //             name: 'Method',
            //             isPublic: false,
            //             isDataset: false,
            //             value: 0,
            //             type: 'RasterFunctionVariable',
            //         },
            //         BandIndexes: {
            //             name: 'BandIndexes',
            //             isPublic: false,
            //             isDataset: false,
            //             value: bandIndexes,
            //             type: 'RasterFunctionVariable',
            //         },
            //         type: 'BandArithmeticFunctionArguments',
            //     },
            //     functionType: 0,
            //     thumbnail: '',
            //     thumbnailEx: '',
            //     help: '',
            // },
            Raster: bandArithmeticRasterFunction,
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
                value: pixelValueRange,
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
