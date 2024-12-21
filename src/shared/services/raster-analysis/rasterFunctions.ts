import { Geometry } from '@arcgis/core/geometry';

type CreateMaskIndexRasterFunctionParams = {
    serviceUrl: string;
    objectId: number;
    token: string;
    /**
     * the pixel value range to be used in the remap function
     */
    pixelValueRange: number[];
    /**
     * the full pixel value range to be used to ajust the input pixel value range
     */
    fullPixelValueRange: number[];
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
};

/**
 * Parameters for creating a change detection raster function.
 */
type CreateChangeDetectionRasterFunctionParams = {
    /**
     * The URL of the service.
     */
    serviceUrl: string;
    /**
     * The object ID for the earlier scene.
     */
    objectId4EarlierScene: number;
    /**
     * The object ID for the later scene.
     */
    objectId4LaterScene: number;
    /**
     * The authentication token.
     */
    token: string;
    /**
     * The pixel value range to be used in the remap function.
     */
    pixelValueRange: number[];
    /**
     * The full pixel value range to be used to adjust the input pixel value range.
     */
    fullPixelValueRange: number[];
    /**
     * The geometry used for clipping.
     */
    clippingGeometry: Geometry;
    /**
     * Optional. The band indexes to be used.
     */
    bandIndexes?: string;
    /**
     * Optional. The raster function template to be used.
     */
    rasterFunctionTemplate?: string;
    /**
     * Optional. If true, the function will return the log of the difference between the two scenes.
     */
    logDiff?: boolean;
};

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
    if (!clippingGeometry || !objectId) {
        return null;
    }

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
    if (!bandIndexes || !clippingGeometry || !objectId) {
        return null;
    }

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
 * Adjusts the input pixel value range to ensure all pixel values are included in the mask tool.
 * The output of the Band Arithmetic function may exceed the full pixel value range of the mask tool,
 * causing some pixels to be masked out. This function modifies the input range by extending
 * the range limits if they align with the full pixel value range.
 *
 * @param {number[]} pixelValueRange - The pixel value range to adjust, specified as [min, max].
 * @param {number[]} fullPixelValueRange - The full pixel value range supported by the mask tool, specified as [min, max].
 * @returns {number[]} The adjusted pixel value range as [adjustedMin, adjustedMax].
 */
const ajustInputPixelValueRange = (
    pixelValueRange: number[],
    fullPixelValueRange: number[]
) => {
    let adjustedMin = pixelValueRange[0];
    let adjustedMax = pixelValueRange[1];

    // Adjust the minimum value if it equals or exceeds the lower limit of the full range.
    // set min to the smallest possible value for a 32-bit signed integer.
    if (adjustedMin <= fullPixelValueRange[0]) {
        adjustedMin = -(2 ** 31);
    }

    // Adjust the maximum value if it equals or exceeds the upper limit of the full range.
    // set it to the largest possible value for a 32-bit signed integer.
    if (adjustedMax >= fullPixelValueRange[1]) {
        adjustedMax = 2 ** 31 - 1;
    }

    return [adjustedMin, adjustedMax];
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
    pixelValueRange,
    fullPixelValueRange,
    clippingGeometry,
    bandIndexes,
    rasterFunctionTemplate,
}: CreateMaskIndexRasterFunctionParams) => {
    // const bandArithmeticRasterFunction = createBandArithmeticRasterFunction({
    //     serviceUrl,
    //     objectId,
    //     token,
    //     bandIndexes,
    //     clippingGeometry,
    // });

    if (!clippingGeometry || !objectId) {
        return null;
    }

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

    if (!inputRaster) {
        return null;
    }

    const remapInputPixelValueRange = ajustInputPixelValueRange(
        pixelValueRange,
        fullPixelValueRange
    );

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
                value: remapInputPixelValueRange,
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

/**
 * Creates a raster function for change detection analysis by comparing two scenes (earlier and later).
 * The result is a raster function that can be used for visualizing and analyzing changes in pixel values.
 *
 * @param {Object} params - The parameters for creating the change detection raster function.
 * @param {string} params.serviceUrl - URL of the raster service used to fetch data for processing.
 * @param {number} params.objectId4EarlierScene - The object ID of the earlier scene to be compared.
 * @param {number} params.objectId4LaterScene - The object ID of the later scene to be compared.
 * @param {string} params.token - Authentication token for accessing the raster service.
 * @param {number[]} params.pixelValueRange - The desired range of pixel values to include in the output.
 * @param {number[]} params.fullPixelValueRange - The entire range of possible pixel values in the data.
 * @param {Object} params.clippingGeometry - Geometry for clipping the raster data to a specific area.
 * @param {number[]} params.bandIndexes - The indexes of the raster bands to be processed.
 * @param {Object} [params.rasterFunctionTemplate] - A predefined raster function template to apply, if provided.
 * @param {boolean} params.logDiff - If `true`, computes the logarithmic difference between the two scenes.
 *
 * @returns {Object|null} The configured raster function object for change detection, or `null` if any raster function creation fails.
 */
export const createChangeDetectionRasterFunction = ({
    serviceUrl,
    objectId4EarlierScene,
    objectId4LaterScene,
    token,
    pixelValueRange,
    fullPixelValueRange,
    clippingGeometry,
    bandIndexes,
    rasterFunctionTemplate,
    logDiff,
}: CreateChangeDetectionRasterFunctionParams) => {
    if (!clippingGeometry || !objectId4EarlierScene || !objectId4LaterScene) {
        return null;
    }

    const rasterFunction4EarlierScene = rasterFunctionTemplate
        ? createClipRasterFunction({
              serviceUrl,
              objectId: objectId4EarlierScene,
              token,
              clippingGeometry,
              rasterFunctionTemplate,
          })
        : createBandArithmeticRasterFunction({
              serviceUrl,
              objectId: objectId4EarlierScene,
              token,
              bandIndexes,
              clippingGeometry,
          });

    const rasterFunction4LaterScene = rasterFunctionTemplate
        ? createClipRasterFunction({
              serviceUrl,
              objectId: objectId4LaterScene,
              token,
              clippingGeometry,
              rasterFunctionTemplate,
          })
        : createBandArithmeticRasterFunction({
              serviceUrl,
              objectId: objectId4LaterScene,
              token,
              bandIndexes,
              clippingGeometry,
          });

    if (!rasterFunction4EarlierScene || !rasterFunction4LaterScene) {
        return null;
    }

    const maskInputPixelValueRange = ajustInputPixelValueRange(
        pixelValueRange,
        fullPixelValueRange
    );

    if (logDiff) {
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
                Raster: {
                    name: 'Log10',
                    description:
                        'Calculates the base 10 logarithm of cells in a raster.',
                    function: {
                        type: 'LocalFunction',
                        pixelType: 'UNKNOWN',
                        name: 'Log10',
                        description:
                            'Calculates the base 10 logarithm of cells in a raster.',
                    },
                    arguments: {
                        Rasters: {
                            name: 'Divide',
                            description:
                                'Divides the values of two rasters on a cell-by-cell basis.',
                            function: {
                                type: 'LocalFunction',
                                pixelType: 'UNKNOWN',
                                name: 'Divide',
                                description:
                                    'Divides the values of two rasters on a cell-by-cell basis.',
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
                                                value: rasterFunction4LaterScene,
                                                type: 'RasterFunctionVariable',
                                            },
                                            {
                                                name: 'Raster',
                                                isPublic: false,
                                                isDataset: true,
                                                value: rasterFunction4EarlierScene,
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
                                    value: 23,
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
                        Operation: {
                            name: 'Operation',
                            isPublic: false,
                            isDataset: false,
                            value: 36,
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
                    value: maskInputPixelValueRange, //[-2, 2],
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
    }

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
                                    value: rasterFunction4LaterScene,
                                    type: 'RasterFunctionVariable',
                                },
                                {
                                    name: 'Raster',
                                    isPublic: false,
                                    isDataset: true,
                                    value: rasterFunction4EarlierScene,
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
                value: maskInputPixelValueRange, //[-2, 2],
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
