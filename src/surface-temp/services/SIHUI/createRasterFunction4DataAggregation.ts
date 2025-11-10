import { IExtent } from '@esri/arcgis-rest-feature-service';
import { IPolygon } from '@esri/arcgis-rest-request';
import { RasterAnalysisRasterFunction } from '@shared/services/raster-analysis/types';

type GetRasterFunction4DataAggregationParams = {
    /**
     * Origin Landsat Service URL
     */
    landsatServiceUrl: string;
    /**
     * Output service name
     */
    outputServiceName: string;
    /**
     * Geometry of the selected urban area feature
     */
    geometry: IPolygon;
    /**
     * Analysis extent
     */
    analysisExtent: IExtent;
    /**
     * Selected year for data aggregation
     */
    selectedYear: number;
    /**
     * Selected months for data aggregation
     */
    selectedMonths: number[];
    /**
     * User token for accessing the Landsat service
     */
    token: string;
};

// Function to get the raster function template for data aggregation
export const createRasterFunction4DataAggregation = ({
    landsatServiceUrl,
    // outputServiceName,
    geometry,
    // analysisExtent,
    selectedYear,
    selectedMonths,
    token,
}: GetRasterFunction4DataAggregationParams): RasterAnalysisRasterFunction => {
    console.log(
        'Generating Raster Function Template for Data Aggregation with parameters:',
        geometry
    );

    const serviceUrl = `${landsatServiceUrl}?token=${token}`;

    return {
        description:
            'This RFT creates a cloud free mean composite of the Landsat Level-2 bands required for the the Landsat SIUHI worfklow.',
        name: 'Landsat Level-2 SIUHI - Part 1 of 3 - Data Aggregation',
        arguments: {
            type: 'RasterCollectionFunctionArguments',
            RasterCollection: {
                name: 'RasterCollection',
                isDataset: true,
                isPublic: true,
                type: 'RasterFunctionVariable',
                _object_id: 3,
                value: {
                    // "url": "https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token={{TOKEN}}",
                    url: serviceUrl,
                    name: 'Landsat Level-2',
                    renderingRule: {
                        rasterFunction: 'None',
                    },
                    mosaicRule: {
                        ascending: true,
                        mosaicMethod: 'esriMosaicAttribute',
                        mosaicOperation: 'MT_FIRST',
                        sortField: 'best',
                        sortValue: '0',
                    },
                },
            },
            QueryGeometry: {
                name: 'QueryGeometry',
                isDataset: false,
                isPublic: true,
                type: 'RasterFunctionVariable',
                _object_id: 4,
                value: {
                    geometries: geometry,
                    spatialReference: {
                        latestWkid: 3857,
                        wkid: 102100,
                    },
                },
            },
            WhereClause: {
                name: 'WhereClause',
                isDataset: false,
                isPublic: true,
                type: 'RasterFunctionVariable',
                _object_id: 5,
                value: `year = ${selectedYear} AND month IN (${selectedMonths.join(',')})`,
            },
            AggregationDefinition: {
                name: 'AggregationDefinition',
                value: {
                    definitionType: 'ALL',
                    dimension: 'acquisitiondate',
                },
                isDataset: false,
                isPublic: true,
                type: 'RasterFunctionVariable',
                _object_id: 6,
            },
            ItemFunction: {
                description: 'lscft',
                name: 'lscft',
                arguments: {
                    type: 'ClipFunctionArguments',
                    Raster: {
                        description: 'A raster function template.',
                        name: 'Raster Function Template',
                        arguments: {
                            type: 'ExtractBandFunctionArguments',
                            Raster: {
                                name: 'Raster',
                                isDataset: true,
                                isPublic: true,
                                type: 'RasterFunctionVariable',
                                _object_id: 11,
                                value: {
                                    url: serviceUrl,
                                    name: 'Landsat Level-2',
                                    renderingRule: {
                                        rasterFunction: 'None',
                                    },
                                    mosaicRule: {
                                        ascending: true,
                                        mosaicMethod: 'esriMosaicAttribute',
                                        mosaicOperation: 'MT_FIRST',
                                        sortField: 'best',
                                        sortValue: '0',
                                    },
                                },
                            },
                            BandIDs: {
                                name: 'BandIds4',
                                value: [2, 3, 4, 5, 8],
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 12,
                            },
                            BandNames: {
                                name: 'BandNames4',
                                value: ['Red', 'Green', 'Blue'],
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 14,
                            },
                            BandWavelengths: {
                                name: 'BandWavelengths4',
                                value: [600, 400, 200],
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 16,
                            },
                            Method: {
                                name: 'Method4',
                                value: 2,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 18,
                            },
                            MissingBandAction: {
                                name: 'MissingBandAction4',
                                value: 0,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 19,
                            },
                            _object_id: 10,
                        },
                        function: {
                            pixelType: 'UNKNOWN',
                            name: 'Extract Green Red NIR SWIR1 TIRS',
                            description:
                                'Specifies which bands to work with when using multiband datasets.',
                            type: 'ExtractBandFunction',
                            _object_id: 20,
                        },
                        functionType: 0,
                        properties: {
                            MatchVariable: {
                                name: 'MatchVariable',
                                value: true,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 22,
                            },
                            UnionDimension: {
                                name: 'UnionDimension',
                                value: false,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 23,
                            },
                            type: 'PropertySet',
                            _object_id: 21,
                        },
                        type: 'RasterFunctionTemplate',
                        _object_id: 9,
                    },
                    ClippingRaster: {
                        description: 'A raster function template.',
                        name: 'Raster Function Template',
                        arguments: {
                            type: 'TransposeBitsFunctionArguments',
                            QualityClass: 'qcbp_UserDefined',
                            Raster: {
                                description: 'A raster function template.',
                                name: 'Raster Function Template',
                                arguments: {
                                    type: 'ExtractBandFunctionArguments',
                                    Raster: {
                                        _object_ref_id: 11,
                                    },
                                    BandIDs: {
                                        name: 'BandIds5',
                                        value: [7],
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 29,
                                    },
                                    BandNames: {
                                        name: 'BandNames5',
                                        value: ['Red', 'Green', 'Blue'],
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 31,
                                    },
                                    BandWavelengths: {
                                        name: 'BandWavelengths5',
                                        value: [600, 400, 200],
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 33,
                                    },
                                    Method: {
                                        name: 'Method5',
                                        value: 2,
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 35,
                                    },
                                    MissingBandAction: {
                                        name: 'MissingBandAction5',
                                        value: 0,
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 36,
                                    },
                                    _object_id: 27,
                                },
                                function: {
                                    pixelType: 'U16',
                                    name: 'Extract QA Band',
                                    description:
                                        'Specifies which bands to work with when using multiband datasets.',
                                    type: 'ExtractBandFunction',
                                    _object_id: 37,
                                },
                                functionType: 0,
                                properties: {
                                    MatchVariable: {
                                        name: 'MatchVariable',
                                        value: true,
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 39,
                                    },
                                    UnionDimension: {
                                        name: 'UnionDimension',
                                        value: false,
                                        isDataset: false,
                                        isPublic: false,
                                        type: 'RasterFunctionVariable',
                                        _object_id: 40,
                                    },
                                    type: 'PropertySet',
                                    _object_id: 38,
                                },
                                type: 'RasterFunctionTemplate',
                                _object_id: 26,
                            },
                            InputBitPositions: {
                                name: 'InputBitPositions6',
                                value: [5, 6],
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 41,
                            },
                            OutputBitPositions: {
                                name: 'OutputBitPositions6',
                                value: [0, 1],
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 43,
                            },
                            FillRaster: {
                                name: 'FillRaster6',
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 45,
                            },
                            ConstantFillValue: {
                                name: 'ConstantFillValue6',
                                value: 0,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 46,
                            },
                            ConstantFillCheck: {
                                name: 'ConstantFillCheck6',
                                value: true,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 47,
                            },
                            _object_id: 25,
                        },
                        function: {
                            pixelType: 'U16',
                            name: 'Create Cloud Mask',
                            description:
                                'Unpacks the bits of the input pixel, and maps them to specified bits in the output pixel. The purpose of this function is to manipulate bits from a couple inputs, such as the Landsat 8 quality band products.',
                            type: 'TransposeBitsFunction',
                            _object_id: 48,
                        },
                        functionType: 0,
                        properties: {
                            MatchVariable: {
                                name: 'MatchVariable',
                                value: true,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 50,
                            },
                            UnionDimension: {
                                name: 'UnionDimension',
                                value: false,
                                isDataset: false,
                                isPublic: false,
                                type: 'RasterFunctionVariable',
                                _object_id: 51,
                            },
                            type: 'PropertySet',
                            _object_id: 49,
                        },
                        type: 'RasterFunctionTemplate',
                        _object_id: 24,
                    },
                    ClippingGeometry: {
                        name: 'ClippingGeometry7',
                        value: 'undefined',
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 52,
                    },
                    Extent: {
                        name: 'Extent7',
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 53,
                    },
                    ClippingType: {
                        name: 'ClippingType7',
                        value: 1,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 54,
                    },
                    _object_id: 8,
                },
                function: {
                    pixelType: 'UNKNOWN',
                    name: 'Remove Clouds',
                    description:
                        'Sets the extent of a raster using coordinates or another dataset.',
                    type: 'ClipFunction',
                    _object_id: 55,
                },
                functionType: 0,
                thumbnail: '',
                properties: {
                    MatchVariable: {
                        name: 'MatchVariable',
                        value: true,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 57,
                    },
                    UnionDimension: {
                        name: 'UnionDimension',
                        value: false,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 58,
                    },
                    type: 'PropertySet',
                    _object_id: 56,
                },
                type: 'RasterFunctionTemplate',
                _object_id: 7,
            },
            ProcessingFunction: {
                name: 'ProcessingFunction',
                isDataset: false,
                isPublic: false,
                type: 'RasterFunctionVariable',
                _object_id: 59,
            },
            AggregationFunction: {
                description:
                    'Calculates a per-cell statistic from multiple rasters. The available statistics are Majority, Maximum, Mean, Median, Minimum, Minority, Percentile, Range, Standard Deviation, Sum, and Variety.',
                name: 'AggregationFunction',
                arguments: {
                    type: 'LocalFunctionArguments',
                    Rasters: {
                        name: 'Rasters',
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 62,
                    },
                    Operation: {
                        name: 'Operation',
                        value: 68,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 63,
                    },
                    ProcessAsMultiband: {
                        name: 'ProcessAsMultiband',
                        value: true,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 64,
                    },
                    PercentileValue: {
                        name: 'PercentileValue',
                        value: 90,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 65,
                    },
                    PercentileInterpolationType: {
                        name: 'PercentileInterpolationType',
                        value: 'AUTO_DETECT',
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 66,
                    },
                    CellsizeType: {
                        name: 'CellsizeType',
                        value: 1,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 67,
                    },
                    ExtentType: {
                        name: 'ExtentType',
                        value: 2,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 68,
                    },
                    _object_id: 61,
                },
                function: {
                    type: 'LocalFunction',
                    pixelType: 'F32',
                    name: 'Calculate Mean',
                    description:
                        'Calculates a per-cell statistic from multiple rasters. The available statistics are Majority, Maximum, Mean, Median, Minimum, Minority, Percentile, Range, Standard Deviation, Sum, and Variety.',
                    _object_id: 69,
                },
                functionType: 0,
                thumbnail: '',
                properties: {
                    MatchVariable: {
                        name: 'MatchVariable',
                        value: true,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 71,
                    },
                    UnionDimension: {
                        name: 'UnionDimension',
                        value: false,
                        isDataset: false,
                        isPublic: false,
                        type: 'RasterFunctionVariable',
                        _object_id: 72,
                    },
                    type: 'PropertySet',
                    _object_id: 70,
                },
                type: 'RasterFunctionTemplate',
                _object_id: 60,
            },
            _object_id: 2,
        },
        function: {
            pixelType: 'UNKNOWN',
            name: 'Process Raster Collection',
            description:
                'Map, Aggregate, Reduce, and Process a raster collection.',
            // definition: '',
            type: 'RasterCollectionFunction',
            // _object_id: 73,
        },
        functionType: 3,
        help: '',
        thumbnail: '',
        thumbnailEx: '',
        properties: {
            MatchVariable: {
                name: 'MatchVariable',
                value: 1,
                isDataset: false,
                isPublic: false,
                type: 'RasterFunctionVariable',
                _object_id: 75,
            },
            UnionDimension: {
                name: 'UnionDimension',
                value: 0,
                isDataset: false,
                isPublic: false,
                type: 'RasterFunctionVariable',
                _object_id: 76,
            },
            type: 'PropertySet',
            _object_id: 74,
        },
        type: 'RasterFunctionTemplate',
        _object_id: 1,
        sourceItemId: 'e113b32c684c474985c9a8e0eedb4145',
    };

    // return {
    //     name: 'GenerateRaster',
    //     parameters: {
    //         rasterFunction: {
    //             description:
    //                 'This RFT creates a cloud free mean composite of the Landsat Level-2 bands required for the the Landsat SIUHI worfklow.',
    //             name: 'Landsat Level-2 SIUHI - Part 1 of 3 - Data Aggregation',
    //             arguments: {
    //                 type: 'RasterCollectionFunctionArguments',
    //                 RasterCollection: {
    //                     name: 'RasterCollection',
    //                     isDataset: true,
    //                     isPublic: true,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 3,
    //                     value: {
    //                         // "url": "https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer?token={{TOKEN}}",
    //                         url: serviceUrl,
    //                         name: 'Landsat Level-2',
    //                         renderingRule: {
    //                             rasterFunction: 'None',
    //                         },
    //                         mosaicRule: {
    //                             ascending: true,
    //                             mosaicMethod: 'esriMosaicAttribute',
    //                             mosaicOperation: 'MT_FIRST',
    //                             sortField: 'best',
    //                             sortValue: '0',
    //                         },
    //                     },
    //                 },
    //                 QueryGeometry: {
    //                     name: 'QueryGeometry',
    //                     isDataset: false,
    //                     isPublic: true,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 4,
    //                     value: {
    //                         geometries: geometry,
    //                         spatialReference: {
    //                             latestWkid: 3857,
    //                             wkid: 102100,
    //                         },
    //                     },
    //                 },
    //                 WhereClause: {
    //                     name: 'WhereClause',
    //                     isDataset: false,
    //                     isPublic: true,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 5,
    //                     value: `year = ${selectedYear} AND month IN (${selectedMonths.join(',')})`,
    //                 },
    //                 AggregationDefinition: {
    //                     name: 'AggregationDefinition',
    //                     value: {
    //                         definitionType: 'ALL',
    //                         dimension: 'acquisitiondate',
    //                     },
    //                     isDataset: false,
    //                     isPublic: true,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 6,
    //                 },
    //                 ItemFunction: {
    //                     description: 'lscft',
    //                     name: 'lscft',
    //                     arguments: {
    //                         type: 'ClipFunctionArguments',
    //                         Raster: {
    //                             description: 'A raster function template.',
    //                             name: 'Raster Function Template',
    //                             arguments: {
    //                                 type: 'ExtractBandFunctionArguments',
    //                                 Raster: {
    //                                     name: 'Raster',
    //                                     isDataset: true,
    //                                     isPublic: true,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 11,
    //                                     value: {
    //                                         url: serviceUrl,
    //                                         name: 'Landsat Level-2',
    //                                         renderingRule: {
    //                                             rasterFunction: 'None',
    //                                         },
    //                                         mosaicRule: {
    //                                             ascending: true,
    //                                             mosaicMethod: 'esriMosaicAttribute',
    //                                             mosaicOperation: 'MT_FIRST',
    //                                             sortField: 'best',
    //                                             sortValue: '0',
    //                                         },
    //                                     },
    //                                 },
    //                                 BandIDs: {
    //                                     name: 'BandIds4',
    //                                     value: [2, 3, 4, 5, 8],
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 12,
    //                                 },
    //                                 BandNames: {
    //                                     name: 'BandNames4',
    //                                     value: ['Red', 'Green', 'Blue'],
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 14,
    //                                 },
    //                                 BandWavelengths: {
    //                                     name: 'BandWavelengths4',
    //                                     value: [600, 400, 200],
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 16,
    //                                 },
    //                                 Method: {
    //                                     name: 'Method4',
    //                                     value: 2,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 18,
    //                                 },
    //                                 MissingBandAction: {
    //                                     name: 'MissingBandAction4',
    //                                     value: 0,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 19,
    //                                 },
    //                                 _object_id: 10,
    //                             },
    //                             function: {
    //                                 pixelType: 'UNKNOWN',
    //                                 name: 'Extract Green Red NIR SWIR1 TIRS',
    //                                 description:
    //                                     'Specifies which bands to work with when using multiband datasets.',
    //                                 type: 'ExtractBandFunction',
    //                                 _object_id: 20,
    //                             },
    //                             functionType: 0,
    //                             properties: {
    //                                 MatchVariable: {
    //                                     name: 'MatchVariable',
    //                                     value: true,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 22,
    //                                 },
    //                                 UnionDimension: {
    //                                     name: 'UnionDimension',
    //                                     value: false,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 23,
    //                                 },
    //                                 type: 'PropertySet',
    //                                 _object_id: 21,
    //                             },
    //                             type: 'RasterFunctionTemplate',
    //                             _object_id: 9,
    //                         },
    //                         ClippingRaster: {
    //                             description: 'A raster function template.',
    //                             name: 'Raster Function Template',
    //                             arguments: {
    //                                 type: 'TransposeBitsFunctionArguments',
    //                                 QualityClass: 'qcbp_UserDefined',
    //                                 Raster: {
    //                                     description: 'A raster function template.',
    //                                     name: 'Raster Function Template',
    //                                     arguments: {
    //                                         type: 'ExtractBandFunctionArguments',
    //                                         Raster: {
    //                                             _object_ref_id: 11,
    //                                         },
    //                                         BandIDs: {
    //                                             name: 'BandIds5',
    //                                             value: [7],
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 29,
    //                                         },
    //                                         BandNames: {
    //                                             name: 'BandNames5',
    //                                             value: ['Red', 'Green', 'Blue'],
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 31,
    //                                         },
    //                                         BandWavelengths: {
    //                                             name: 'BandWavelengths5',
    //                                             value: [600, 400, 200],
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 33,
    //                                         },
    //                                         Method: {
    //                                             name: 'Method5',
    //                                             value: 2,
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 35,
    //                                         },
    //                                         MissingBandAction: {
    //                                             name: 'MissingBandAction5',
    //                                             value: 0,
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 36,
    //                                         },
    //                                         _object_id: 27,
    //                                     },
    //                                     function: {
    //                                         pixelType: 'U16',
    //                                         name: 'Extract QA Band',
    //                                         description:
    //                                             'Specifies which bands to work with when using multiband datasets.',
    //                                         type: 'ExtractBandFunction',
    //                                         _object_id: 37,
    //                                     },
    //                                     functionType: 0,
    //                                     properties: {
    //                                         MatchVariable: {
    //                                             name: 'MatchVariable',
    //                                             value: true,
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 39,
    //                                         },
    //                                         UnionDimension: {
    //                                             name: 'UnionDimension',
    //                                             value: false,
    //                                             isDataset: false,
    //                                             isPublic: false,
    //                                             type: 'RasterFunctionVariable',
    //                                             _object_id: 40,
    //                                         },
    //                                         type: 'PropertySet',
    //                                         _object_id: 38,
    //                                     },
    //                                     type: 'RasterFunctionTemplate',
    //                                     _object_id: 26,
    //                                 },
    //                                 InputBitPositions: {
    //                                     name: 'InputBitPositions6',
    //                                     value: [5, 6],
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 41,
    //                                 },
    //                                 OutputBitPositions: {
    //                                     name: 'OutputBitPositions6',
    //                                     value: [0, 1],
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 43,
    //                                 },
    //                                 FillRaster: {
    //                                     name: 'FillRaster6',
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 45,
    //                                 },
    //                                 ConstantFillValue: {
    //                                     name: 'ConstantFillValue6',
    //                                     value: 0,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 46,
    //                                 },
    //                                 ConstantFillCheck: {
    //                                     name: 'ConstantFillCheck6',
    //                                     value: true,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 47,
    //                                 },
    //                                 _object_id: 25,
    //                             },
    //                             function: {
    //                                 pixelType: 'U16',
    //                                 name: 'Create Cloud Mask',
    //                                 description:
    //                                     'Unpacks the bits of the input pixel, and maps them to specified bits in the output pixel. The purpose of this function is to manipulate bits from a couple inputs, such as the Landsat 8 quality band products.',
    //                                 type: 'TransposeBitsFunction',
    //                                 _object_id: 48,
    //                             },
    //                             functionType: 0,
    //                             properties: {
    //                                 MatchVariable: {
    //                                     name: 'MatchVariable',
    //                                     value: true,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 50,
    //                                 },
    //                                 UnionDimension: {
    //                                     name: 'UnionDimension',
    //                                     value: false,
    //                                     isDataset: false,
    //                                     isPublic: false,
    //                                     type: 'RasterFunctionVariable',
    //                                     _object_id: 51,
    //                                 },
    //                                 type: 'PropertySet',
    //                                 _object_id: 49,
    //                             },
    //                             type: 'RasterFunctionTemplate',
    //                             _object_id: 24,
    //                         },
    //                         ClippingGeometry: {
    //                             name: 'ClippingGeometry7',
    //                             value: 'undefined',
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 52,
    //                         },
    //                         Extent: {
    //                             name: 'Extent7',
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 53,
    //                         },
    //                         ClippingType: {
    //                             name: 'ClippingType7',
    //                             value: 1,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 54,
    //                         },
    //                         _object_id: 8,
    //                     },
    //                     function: {
    //                         pixelType: 'UNKNOWN',
    //                         name: 'Remove Clouds',
    //                         description:
    //                             'Sets the extent of a raster using coordinates or another dataset.',
    //                         type: 'ClipFunction',
    //                         _object_id: 55,
    //                     },
    //                     functionType: 0,
    //                     thumbnail: '',
    //                     properties: {
    //                         MatchVariable: {
    //                             name: 'MatchVariable',
    //                             value: true,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 57,
    //                         },
    //                         UnionDimension: {
    //                             name: 'UnionDimension',
    //                             value: false,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 58,
    //                         },
    //                         type: 'PropertySet',
    //                         _object_id: 56,
    //                     },
    //                     type: 'RasterFunctionTemplate',
    //                     _object_id: 7,
    //                 },
    //                 ProcessingFunction: {
    //                     name: 'ProcessingFunction',
    //                     isDataset: false,
    //                     isPublic: false,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 59,
    //                 },
    //                 AggregationFunction: {
    //                     description:
    //                         'Calculates a per-cell statistic from multiple rasters. The available statistics are Majority, Maximum, Mean, Median, Minimum, Minority, Percentile, Range, Standard Deviation, Sum, and Variety.',
    //                     name: 'AggregationFunction',
    //                     arguments: {
    //                         type: 'LocalFunctionArguments',
    //                         Rasters: {
    //                             name: 'Rasters',
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 62,
    //                         },
    //                         Operation: {
    //                             name: 'Operation',
    //                             value: 68,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 63,
    //                         },
    //                         ProcessAsMultiband: {
    //                             name: 'ProcessAsMultiband',
    //                             value: true,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 64,
    //                         },
    //                         PercentileValue: {
    //                             name: 'PercentileValue',
    //                             value: 90,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 65,
    //                         },
    //                         PercentileInterpolationType: {
    //                             name: 'PercentileInterpolationType',
    //                             value: 'AUTO_DETECT',
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 66,
    //                         },
    //                         CellsizeType: {
    //                             name: 'CellsizeType',
    //                             value: 1,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 67,
    //                         },
    //                         ExtentType: {
    //                             name: 'ExtentType',
    //                             value: 2,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 68,
    //                         },
    //                         _object_id: 61,
    //                     },
    //                     function: {
    //                         type: 'LocalFunction',
    //                         pixelType: 'F32',
    //                         name: 'Calculate Mean',
    //                         description:
    //                             'Calculates a per-cell statistic from multiple rasters. The available statistics are Majority, Maximum, Mean, Median, Minimum, Minority, Percentile, Range, Standard Deviation, Sum, and Variety.',
    //                         _object_id: 69,
    //                     },
    //                     functionType: 0,
    //                     thumbnail: '',
    //                     properties: {
    //                         MatchVariable: {
    //                             name: 'MatchVariable',
    //                             value: true,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 71,
    //                         },
    //                         UnionDimension: {
    //                             name: 'UnionDimension',
    //                             value: false,
    //                             isDataset: false,
    //                             isPublic: false,
    //                             type: 'RasterFunctionVariable',
    //                             _object_id: 72,
    //                         },
    //                         type: 'PropertySet',
    //                         _object_id: 70,
    //                     },
    //                     type: 'RasterFunctionTemplate',
    //                     _object_id: 60,
    //                 },
    //                 _object_id: 2,
    //             },
    //             function: {
    //                 pixelType: 'UNKNOWN',
    //                 name: 'Process Raster Collection',
    //                 description:
    //                     'Map, Aggregate, Reduce, and Process a raster collection.',
    //                 definition: '',
    //                 type: 'RasterCollectionFunction',
    //                 _object_id: 73,
    //             },
    //             functionType: 3,
    //             help: '',
    //             thumbnail: '',
    //             thumbnailEx: '',
    //             properties: {
    //                 MatchVariable: {
    //                     name: 'MatchVariable',
    //                     value: 1,
    //                     isDataset: false,
    //                     isPublic: false,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 75,
    //                 },
    //                 UnionDimension: {
    //                     name: 'UnionDimension',
    //                     value: 0,
    //                     isDataset: false,
    //                     isPublic: false,
    //                     type: 'RasterFunctionVariable',
    //                     _object_id: 76,
    //                 },
    //                 type: 'PropertySet',
    //                 _object_id: 74,
    //             },
    //             type: 'RasterFunctionTemplate',
    //             _object_id: 1,
    //             sourceItemId: 'e113b32c684c474985c9a8e0eedb4145',
    //         },
    //         outputName: {
    //             serviceProperties: {
    //                 // "name": "Monterrey SIUHI Data Aggregation - 2",
    //                 name: outputServiceName,
    //                 capabilities: 'Image, TilesOnly',
    //             },
    //             itemProperties: {
    //                 description:
    //                     'Output generated from running Landsat Level-2 SIUHI - Part 1 of 3 - Data Aggregation raster function template',
    //                 snippet:
    //                     'Output generated from running Landsat Level-2 SIUHI - Part 1 of 3 - Data Aggregation raster function template',
    //                 folderId: '',
    //             },
    //         },
    //         context: {
    //             // "extent": {
    //             //   "xmin": -11199085.178693239,
    //             //   "ymin": 2949214.897361696,
    //             //   "xmax": -11130750.475406382,
    //             //   "ymax": 2974553.772238198,
    //             //   "spatialReference": {
    //             //     "wkid": 102100,
    //             //     "latestWkid": 3857
    //             //   }
    //             // }
    //             extent: analysisExtent,
    //         },
    //     },
    // };
};
