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
    rasterFunctionTemplate,
}: {
    serviceUrl: string;
    objectId: number;
    token: string;
    clippingGeometry: Geometry;
    /**
     * Name of the Raster function template to be applied to the clipped raster.
     */
    rasterFunctionTemplate?: string;
}) => {
    const inputRaster = {
        url: `${serviceUrl}?token=${token}`,
        name: '', //'LandsatC2L2',
        mosaicRule: {
            ascending: false,
            lockRasterIds: [objectId],
            mosaicMethod: 'esriMosaicLockRaster',
            where: `objectid in (${objectId})`,
        },
        renderingRule: rasterFunctionTemplate
            ? {
                  rasterFunction: rasterFunctionTemplate,
              }
            : undefined,
    };

    return {
        name: 'Clip',
        description:
            'Sets the extent of a raster using coordinates or another dataset.',
        function: {
            type: 'ClipFunction',
            pixelType: 'F32',
            name: 'Clip',
            description:
                'Sets the extent of a raster using coordinates or another dataset.',
        },
        arguments: {
            Raster: {
                name: 'Raster',
                isPublic: false,
                isDataset: true,
                value: inputRaster,
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
            pixelType: 'F32',
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
    rasterFunctionTemplate,
    pixelValueRange,
    clippingGeometry,
}: {
    serviceUrl: string;
    objectId: number;
    token: string;
    /**
     * the pixel value range to be used in the remap function
     */
    pixelValueRange: number[];
    /**
     * the geometry to be used in the clip function
     */
    clippingGeometry: Geometry;
    /**
     * the band indexes to be used in the band arithmetic function
     */
    bandIndexes?: string;
    /**
     * the raster function template to be used in the clip function
     */
    rasterFunctionTemplate?: string;
}) => {
    // const bandArithmeticRasterFunction = createBandArithmeticRasterFunction({
    //     serviceUrl,
    //     objectId,
    //     token,
    //     bandIndexes,
    //     clippingGeometry,
    // });

    let inputRaster = null;

    if (bandIndexes) {
        inputRaster = createBandArithmeticRasterFunction({
            serviceUrl,
            objectId,
            token,
            bandIndexes,
            clippingGeometry,
        });
    } else if (rasterFunctionTemplate) {
        inputRaster = createClipRasterFunction({
            serviceUrl,
            objectId,
            token,
            clippingGeometry,
            rasterFunctionTemplate,
        });
    }

    return {
        name: 'Remap',
        description:
            'Changes pixel values by assigning new values to ranges of pixel values or using an external table.',
        function: {
            type: 'RemapFunction',
            pixelType: 'F32',
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
            Raster: inputRaster,
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

export const createChangeDetectionRasterFunction = ({
    serviceUrl,
    objectId4EarlierScene,
    objectId4LaterScene,
    token,
    bandIndexes,
    pixelValueRange,
    clippingGeometry,
}: {
    serviceUrl: string;
    objectId4EarlierScene: number;
    objectId4LaterScene: number;
    token: string;
    bandIndexes: string;
    pixelValueRange: number[];
    clippingGeometry: Geometry;
}) => {
    const bandArithmeticRasterFunction4EarlierScene =
        createBandArithmeticRasterFunction({
            serviceUrl,
            objectId: objectId4EarlierScene,
            token,
            bandIndexes,
            clippingGeometry,
        });

    const bandArithmeticRasterFunction4LaterScene =
        createBandArithmeticRasterFunction({
            serviceUrl,
            objectId: objectId4LaterScene,
            token,
            bandIndexes,
            clippingGeometry,
        });

    return {
        name: 'Mask',
        description: 'Sets values that you do not want to display.',
        function: {
            type: 'MaskFunction',
            pixelType: 'F32',
            name: 'Mask',
            description: 'Sets values that you do not want to display.',
        },
        arguments: {
            // Raster: {
            //     name: "Raster",
            //     isPublic: false,
            //     isDataset: true,
            //     value: {
            //         url: "https://iservicesdev.arcgis.com/LkFyxb9zDq7vAOAm/arcgis/rest/services/Landsat_Change_Detection___LC08_L2SP_040037_20240129_20240207_02_T1/ImageServer?token=9RK8DY0qvaqYcPFrrqGyoc_Hw2w_BiuUfWSbVAwTisP5_rcoZesuFjwM_Y5mRo0ow_UCCbyhr3VWNLAkFpt5n3JHwp3_DjDg4bKF9v3EJi4zJhyjvkob1VEVFD-NIyNJZEk8SoI4nCCMDx9b6w-hj1VyaPDt-rELnZhwLi1LVnji8csySLD4R4H_4pz7LZd98kw6cpvHPHm8GknR4pwfO3r2tMCb1WlNJ0qpw6heJ5NYPBl6Wp6uc8VtLnubP1ZE5gCABFXvwO8qUbaiquw-lsp1qUi_NbuaeSdTJEtBldk3a6bixyq11Y9oFukARZCC",
            //         name: "Landsat_Change_Detection___LC08_L2SP_040037_20240129_20240207_02_T1"
            //     },
            //     type: "RasterFunctionVariable"
            // },
            Raster: {
                name: 'Minus',
                description:
                    'Subtracts the value of the second input raster from the value of the first input raster on a cell-by-cell basis.',
                function: {
                    type: 'LocalFunction',
                    pixelType: 'F32',
                    name: 'Minus',
                    description:
                        'Subtracts the value of the second input raster from the value of the first input raster on a cell-by-cell basis.',
                },
                arguments: {
                    Rasters: {
                        name: '_Rasters',
                        isPublic: false,
                        isDataset: false,
                        value: {
                            elements: [
                                {
                                    name: 'InRaster2',
                                    isPublic: false,
                                    isDataset: true,
                                    value: bandArithmeticRasterFunction4LaterScene,
                                    type: 'RasterFunctionVariable',
                                },
                                {
                                    name: 'Raster',
                                    isPublic: false,
                                    isDataset: true,
                                    value: bandArithmeticRasterFunction4EarlierScene,
                                    type: 'RasterFunctionVariable',
                                },
                            ],
                            type: 'ArgumentArray',
                        },
                        type: 'RasterFunctionVariable',
                    },
                    Operation: {
                        name: 'Operation',
                        isPublic: false,
                        isDataset: false,
                        value: 2,
                        type: 'RasterFunctionVariable',
                    },
                    CellsizeType: {
                        name: 'CellsizeType',
                        isPublic: false,
                        isDataset: false,
                        value: 2,
                        type: 'RasterFunctionVariable',
                    },
                    ExtentType: {
                        name: 'ExtentType',
                        isPublic: false,
                        isDataset: false,
                        value: 1,
                        type: 'RasterFunctionVariable',
                    },
                    type: 'LocalFunctionArguments',
                },
                functionType: 0,
                thumbnail: '',
                thumbnailEx: '',
                help: '',
            },
            NoDataInterpretation: {
                name: 'NoDataInterpretation',
                isPublic: false,
                isDataset: false,
                value: 0,
                type: 'RasterFunctionVariable',
            },
            NoDataValues: {
                name: 'NoDataValues',
                isPublic: false,
                isDataset: false,
                value: [0],
                type: 'RasterFunctionVariable',
            },
            IncludedRanges: {
                name: 'IncludedRanges',
                isPublic: false,
                isDataset: false,
                value: pixelValueRange, //[-2, 2],
                type: 'RasterFunctionVariable',
            },
            Invert: {
                name: 'Invert',
                isPublic: false,
                isDataset: false,
                value: false,
                type: 'RasterFunctionVariable',
            },
            type: 'MaskFunctionArguments',
        },
        functionType: 0,
        thumbnail: '',
        thumbnailEx: '',
        help: '',
    };
};
