export const mockedQuerySentinel2ScenesResponse2023 = {
    "objectIdFieldName": "objectid",
    "fields": [
        {
            "name": "objectid",
            "type": "esriFieldTypeOID",
            "alias": "objectid",
            "domain": null
        },
        {
            "name": "acquisitiondate",
            "type": "esriFieldTypeDate",
            "alias": "AcquisitionDate",
            "domain": null,
            "length": 8
        },
        {
            "name": "cloudcover",
            "type": "esriFieldTypeDouble",
            "alias": "CloudCover",
            "domain": null
        },
        {
            "name": "name",
            "type": "esriFieldTypeString",
            "alias": "name",
            "domain": null,
            "length": 200
        },
        {
            "name": "month",
            "type": "esriFieldTypeInteger",
            "alias": "Month",
            "domain": null
        },
        {
            "name": "platform",
            "type": "esriFieldTypeString",
            "alias": "Platform",
            "domain": null,
            "length": 15
        },
        {
            "name": "instrument",
            "type": "esriFieldTypeString",
            "alias": "Instrument",
            "domain": null,
            "length": 25
        },
        {
            "name": "snowicepercentage",
            "type": "esriFieldTypeDouble",
            "alias": "SnowIcePercentage",
            "domain": null
        },
        {
            "name": "productname",
            "type": "esriFieldTypeString",
            "alias": "productname",
            "domain": null,
            "length": 100
        },
        {
            "name": "relativeorbit",
            "type": "esriFieldTypeInteger",
            "alias": "RelativeOrbit",
            "domain": null
        },
        {
            "name": "meansolarzenith",
            "type": "esriFieldTypeDouble",
            "alias": "MeanSolarZenith",
            "domain": null
        },
        {
            "name": "meansolarazimuth",
            "type": "esriFieldTypeDouble",
            "alias": "MeanSolarAzimuth",
            "domain": null
        },
        {
            "name": "category",
            "type": "esriFieldTypeInteger",
            "alias": "category",
            "domain": {
                "type": "codedValue",
                "name": "MosaicCatalogItemCategoryDomain",
                "description": "Catalog item categories.",
                "codedValues": [
                    {
                        "name": "Unknown",
                        "code": 0
                    },
                    {
                        "name": "Primary",
                        "code": 1
                    },
                    {
                        "name": "Overview",
                        "code": 2
                    },
                    {
                        "name": "Unprocessed Overview",
                        "code": 3
                    },
                    {
                        "name": "Partial Overview",
                        "code": 4
                    },
                    {
                        "name": "Inactive",
                        "code": 5
                    },
                    {
                        "name": "Uploaded",
                        "code": 253
                    },
                    {
                        "name": "Incomplete",
                        "code": 254
                    },
                    {
                        "name": "Custom",
                        "code": 255
                    }
                ],
                "mergePolicy": "esriMPTDefaultValue",
                "splitPolicy": "esriSPTDefaultValue"
            }
        },
        {
            "name": "nodatapixelpercentage",
            "type": "esriFieldTypeDouble",
            "alias": "nodatapixelpercentage",
            "domain": null
        }
    ],
    "features": [
        // Jan
        {
            "attributes": {
                "objectid": 37795025,
                "acquisitiondate": 1672771071000,
                "cloudcover": 92.818229680000002,
                "name": "S2A_MSIL2A_20230103T183751_N0510_R027_T11SMT_20240807T110952",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.96412402000000008,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.99968338,
                "meansolarazimuth": 161.28015137,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Feb
        {
            "attributes": {
                "objectid": 37973335,
                "acquisitiondate": 1675362961000,
                "cloudcover": 45.817115780000002,
                "name": "S2A_MSIL2A_20230202T183601_N0510_R027_T11SMT_20240815T085203",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.50866795,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.931541439999997,
                "meansolarazimuth": 156.512146,
                "category": 1,
                "nodatapixelpercentage": 6.9999999999999999e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Mar
        {
            "attributes": {
                "objectid": 23732931,
                "acquisitiondate": 1677954761000,
                "cloudcover": 70.82484436,
                "name": "S2A_MSIL2A_20230304T183241_N0509_R027_T11SMT_20230305T012708",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 5.9762082100000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 44.078872680000003,
                "meansolarazimuth": 152.02586364999999,
                "category": 1,
                "nodatapixelpercentage": 3.0000000000000001e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Apr
        {
            "attributes": {
                "objectid": 37189671,
                "acquisitiondate": 1680546561000,
                "cloudcover": 81.050888059999991,
                "name": "S2A_MSIL2A_20230403T182921_N0510_R027_T11SMT_20240825T060842",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.52491200000000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.52748871,
                "meansolarazimuth": 147.11660767000001,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // May
        {
            "attributes": {
                "objectid": 24197458,
                "acquisitiondate": 1683138561000,
                "cloudcover": 49.311569210000002,
                "name": "S2A_MSIL2A_20230503T182921_N0509_R027_T11SMT_20230504T125418",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.79764801000000007,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 22.822053909999998,
                "meansolarazimuth": 138.60697937,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Jun
        {
            "attributes": {
                "objectid": 11885244,
                "acquisitiondate": 1685730561000,
                "cloudcover": 49.71469879,
                "name": "S2A_MSIL2A_20230602T182921_N0509_R027_T11SMT_20230603T045110",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.15465100000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.062370300000001,
                "meansolarazimuth": 125.96985626,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Jul
        {
            "attributes": {
                "objectid": 26387977,
                "acquisitiondate": 1689186561000,
                "cloudcover": 2.9623229499999999,
                "name": "S2A_MSIL2A_20230712T182921_N0509_R027_T11SMT_20230713T043131",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.57445908,
                "meansolarazimuth": 122.97183990000001,
                "category": 1,
                "nodatapixelpercentage": 6.9999999999999999e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Aug
        {
            "attributes": {
                "objectid": 20498195,
                "acquisitiondate": 1690914561000,
                "cloudcover": 39.731815339999997,
                "name": "S2A_MSIL2A_20230801T182921_N0509_R027_T11SMT_20230802T023558",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 22.508495330000002,
                "meansolarazimuth": 130.53668213,
                "category": 1,
                "nodatapixelpercentage": 6.9999999999999999e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Sep
        {
            "attributes": {
                "objectid": 26427693,
                "acquisitiondate": 1693506561000,
                "cloudcover": 11.812986370000001,
                "name": "S2A_MSIL2A_20230831T182921_N0509_R027_T11SMT_20230901T043607",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 29.43247032,
                "meansolarazimuth": 145.62338256999999,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Oct
        {
            "attributes": {
                "objectid": 22381521,
                "acquisitiondate": 1696962781000,
                "cloudcover": 1.0788860300000001,
                "name": "S2A_MSIL2A_20231010T183301_N0509_R027_T11SMT_20231011T013101",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0010380000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.427696229999995,
                "meansolarazimuth": 160.68626404000003,
                "category": 1,
                "nodatapixelpercentage": 0.00010300000000000001
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ],
                        [
                            -13012568.3116,
                            4074765.66679999977
                        ],
                        [
                            -13012702.563000001,
                            3942028.81210000068
                        ],
                        [
                            -13144060.0073999986,
                            3941414.49960000068
                        ],
                        [
                            -13145449.8312,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Nov
        {
            "attributes": {
                "objectid": 15624368,
                "acquisitiondate": 1699122939000,
                "cloudcover": 38.128955840000003,
                "name": "S2B_MSIL2A_20231104T183539_N0509_R027_T11SMT_20231104T223552",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00081300000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 50.642681119999999,
                "meansolarazimuth": 164.83811950999998,
                "category": 1,
                "nodatapixelpercentage": 6.9999999999999999e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Dec
        {
            "attributes": {
                "objectid": 18896846,
                "acquisitiondate": 1702147071000,
                "cloudcover": 4.3315281900000002,
                "name": "S2A_MSIL2A_20231209T183751_N0509_R027_T11SMT_20231209T233415",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.011832000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.310745239999996,
                "meansolarazimuth": 164.44290161000001,
                "category": 1,
                "nodatapixelpercentage": 0.0035240000000000002
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        }
    ]
};

export const mockedQuerySentinel2ScenesResponse2024 = {
    "objectIdFieldName": "objectid",
    "fields": [
        {
            "name": "objectid",
            "type": "esriFieldTypeOID",
            "alias": "objectid",
            "domain": null
        },
        {
            "name": "acquisitiondate",
            "type": "esriFieldTypeDate",
            "alias": "AcquisitionDate",
            "domain": null,
            "length": 8
        },
        {
            "name": "cloudcover",
            "type": "esriFieldTypeDouble",
            "alias": "CloudCover",
            "domain": null
        },
        {
            "name": "name",
            "type": "esriFieldTypeString",
            "alias": "name",
            "domain": null,
            "length": 200
        },
        {
            "name": "month",
            "type": "esriFieldTypeInteger",
            "alias": "Month",
            "domain": null
        },
        {
            "name": "platform",
            "type": "esriFieldTypeString",
            "alias": "Platform",
            "domain": null,
            "length": 15
        },
        {
            "name": "instrument",
            "type": "esriFieldTypeString",
            "alias": "Instrument",
            "domain": null,
            "length": 25
        },
        {
            "name": "snowicepercentage",
            "type": "esriFieldTypeDouble",
            "alias": "SnowIcePercentage",
            "domain": null
        },
        {
            "name": "productname",
            "type": "esriFieldTypeString",
            "alias": "productname",
            "domain": null,
            "length": 100
        },
        {
            "name": "relativeorbit",
            "type": "esriFieldTypeInteger",
            "alias": "RelativeOrbit",
            "domain": null
        },
        {
            "name": "meansolarzenith",
            "type": "esriFieldTypeDouble",
            "alias": "MeanSolarZenith",
            "domain": null
        },
        {
            "name": "meansolarazimuth",
            "type": "esriFieldTypeDouble",
            "alias": "MeanSolarAzimuth",
            "domain": null
        },
        {
            "name": "category",
            "type": "esriFieldTypeInteger",
            "alias": "category",
            "domain": {
                "type": "codedValue",
                "name": "MosaicCatalogItemCategoryDomain",
                "description": "Catalog item categories.",
                "codedValues": [
                    {
                        "name": "Unknown",
                        "code": 0
                    },
                    {
                        "name": "Primary",
                        "code": 1
                    },
                    {
                        "name": "Overview",
                        "code": 2
                    },
                    {
                        "name": "Unprocessed Overview",
                        "code": 3
                    },
                    {
                        "name": "Partial Overview",
                        "code": 4
                    },
                    {
                        "name": "Inactive",
                        "code": 5
                    },
                    {
                        "name": "Uploaded",
                        "code": 253
                    },
                    {
                        "name": "Incomplete",
                        "code": 254
                    },
                    {
                        "name": "Custom",
                        "code": 255
                    }
                ],
                "mergePolicy": "esriMPTDefaultValue",
                "splitPolicy": "esriSPTDefaultValue"
            }
        },
        {
            "name": "nodatapixelpercentage",
            "type": "esriFieldTypeDouble",
            "alias": "nodatapixelpercentage",
            "domain": null
        }
    ],
    "features": [
        // Jan
        {
            "attributes": {
                "objectid": 146597,
                "acquisitiondate": 1704307069000,
                "cloudcover": 67.875457760000003,
                "name": "S2B_MSIL2A_20240103T183749_N0510_R027_T11SMT_20240103T222901",
                "month": 1,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.1959199899999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.014186860000002,
                "meansolarazimuth": 161.32110596000001,
                "category": 1,
                "nodatapixelpercentage": 0.00040500000000000003
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Feb
        {
            "attributes": {
                "objectid": 451984,
                "acquisitiondate": 1706898959000,
                "cloudcover": 58.460296630000002,
                "name": "S2B_MSIL2A_20240202T183559_N0510_R027_T11SMT_20240202T222831",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.430107,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.997241969999997,
                "meansolarazimuth": 156.54197693,
                "category": 1,
                "nodatapixelpercentage": 0.00083300000000000008
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Mar
        {
            "attributes": {
                "objectid": 2004310,
                "acquisitiondate": 1709490769000,
                "cloudcover": 86.227569580000008,
                "name": "S2B_MSIL2A_20240303T183249_N0510_R027_T11SMT_20240303T233700",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.084253000000000008,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 44.170558929999999,
                "meansolarazimuth": 152.05836486999999,
                "category": 1,
                "nodatapixelpercentage": 3.0000000000000001e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Apr
        {
            "attributes": {
                "objectid": 2399050,
                "acquisitiondate": 1712082559000,
                "cloudcover": 0.02571,
                "name": "S2B_MSIL2A_20240402T182919_N0510_R027_T11SMT_20240402T235438",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 4.9556927700000006,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.619514470000006,
                "meansolarazimuth": 147.16287231000001,
                "category": 1,
                "nodatapixelpercentage": 0.00019599999999999999
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // May
        {
            "attributes": {
                "objectid": 28977886,
                "acquisitiondate": 1714674559000,
                "cloudcover": 39.96211624,
                "name": "S2B_MSIL2A_20240502T182919_N0510_R027_T11SMT_20240502T235401",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.63528298999999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 22.88229561,
                "meansolarazimuth": 138.70840454,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Jun
        {
            "attributes": {
                "objectid": 1874565,
                "acquisitiondate": 1717266559000,
                "cloudcover": 45.906074519999997,
                "name": "S2B_MSIL2A_20240601T182919_N0510_R027_T11SMT_20240601T231453",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.071496000000000004,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.08151436,
                "meansolarazimuth": 126.05066681000001,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Jul
        {
            "attributes": {
                "objectid": 1103278,
                "acquisitiondate": 1719858559000,
                "cloudcover": 4.9201898599999998,
                "name": "S2B_MSIL2A_20240701T182919_N0510_R027_T11SMT_20240702T012050",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.571605680000001,
                "meansolarazimuth": 121.13025665000001,
                "category": 1,
                "nodatapixelpercentage": 6.9999999999999999e-06
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Aug
        {
            "attributes": {
                "objectid": 678777,
                "acquisitiondate": 1722883261000,
                "cloudcover": 9.062706949999999,
                "name": "S2A_MSIL2A_20240805T184101_N0511_R027_T11SMT_20240806T012051",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 23.407318119999999,
                "meansolarazimuth": 132.80439758,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Sep
        {
            "attributes": {
                "objectid": 2734713,
                "acquisitiondate": 1725475261000,
                "cloudcover": 0.65899903000000004,
                "name": "S2A_MSIL2A_20240904T184101_N0511_R027_T11SMT_20240905T013057",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.00089900000000000006,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.81264114,
                "meansolarazimuth": 147.86071777000001,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Oct
        {
            "attributes": {
                "objectid": 27409776,
                "acquisitiondate": 1728066741000,
                "cloudcover": 52.109237669999999,
                "name": "S2A_MSIL2A_20241004T183221_N0511_R027_T11SMT_20241004T231446",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 6.6000000000000005e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 40.614757539999999,
                "meansolarazimuth": 159.30158997000001,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Nov
        {
            "attributes": {
                "objectid": 29282896,
                "acquisitiondate": 1730658931000,
                "cloudcover": 4.95696783,
                "name": "S2A_MSIL2A_20241103T183531_N0511_R027_T11SMT_20241103T222945",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.010391000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 50.575271610000001,
                "meansolarazimuth": 164.79411315999999,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        // Dec
        {
            "attributes": {
                "objectid": 36416973,
                "acquisitiondate": 1734547029000,
                "cloudcover": 0.0013040000000000003,
                "name": "S2B_MSIL2A_20241218T183709_N0511_R027_T11SMT_20241218T222347",
                "month": 12,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0095919999999999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.120643620000003,
                "meansolarazimuth": 163.42961120999999,
                "category": 1,
                "nodatapixelpercentage": 0
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012703.3705,
                            3942028.81210000068
                        ],
                        [
                            -13144061.127,
                            3941414.49960000068
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        }
    ]
}
