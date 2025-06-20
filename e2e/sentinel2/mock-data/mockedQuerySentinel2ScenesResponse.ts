export const mockedQuerySentinel2ScenesResponse = {
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
        {
            "attributes": {
                "objectid": 32349,
                "acquisitiondate": 1704739061000,
                "cloudcover": 0.007928000000000001,
                "name": "S2A_MSIL2A_20240108T183741_N0510_R027_T11SMT_20240108T234128",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.3343180400000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.612068180000001,
                "meansolarazimuth": 160.52873229999997,
                "category": 1,
                "nodatapixelpercentage": 0.18243100000000001
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
        {
            "attributes": {
                "objectid": 202133,
                "acquisitiondate": 1705171049000,
                "cloudcover": 14.208324429999999,
                "name": "S2B_MSIL2A_20240113T183729_N0510_R027_T11SMT_20240113T221410",
                "month": 1,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.23334301000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.02088165,
                "meansolarazimuth": 159.74659729000001,
                "category": 1,
                "nodatapixelpercentage": 0.012475000000000002
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
        {
            "attributes": {
                "objectid": 74292,
                "acquisitiondate": 1705603021000,
                "cloudcover": 8.4914941800000001,
                "name": "S2A_MSIL2A_20240118T183701_N0510_R027_T11SMT_20240118T233606",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.088113999999999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 57.266723630000001,
                "meansolarazimuth": 158.90934752999999,
                "category": 1,
                "nodatapixelpercentage": 0.002379
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
        {
            "attributes": {
                "objectid": 254531,
                "acquisitiondate": 1706035009000,
                "cloudcover": 35.877449040000002,
                "name": "S2B_MSIL2A_20240123T183649_N0510_R027_T11SMT_20240123T220857",
                "month": 1,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.30765900000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 56.32455444,
                "meansolarazimuth": 158.14109801999999,
                "category": 1,
                "nodatapixelpercentage": 0.019170000000000003
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
        {
            "attributes": {
                "objectid": 117823,
                "acquisitiondate": 1706466981000,
                "cloudcover": 64.950416560000008,
                "name": "S2A_MSIL2A_20240128T183621_N0510_R027_T11SMT_20240128T233814",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.54813403000000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 55.239406590000002,
                "meansolarazimuth": 157.32270813,
                "category": 1,
                "nodatapixelpercentage": 0.0001
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
        {
            "attributes": {
                "objectid": 331342,
                "acquisitiondate": 1707330931000,
                "cloudcover": 73.114730829999999,
                "name": "S2A_MSIL2A_20240207T183531_N0510_R027_T11SMT_20240207T221345",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 3.1166899200000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.6232872,
                "meansolarazimuth": 155.75492858999999,
                "category": 1,
                "nodatapixelpercentage": 5.5999999999999999e-05
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
        {
            "attributes": {
                "objectid": 511306,
                "acquisitiondate": 1707762909000,
                "cloudcover": 0.005104,
                "name": "S2B_MSIL2A_20240212T183509_N0510_R027_T11SMT_20240212T224007",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 6.3462529199999995,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 51.115821840000002,
                "meansolarazimuth": 155.01298523,
                "category": 1,
                "nodatapixelpercentage": 0.024688000000000002
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
        {
            "attributes": {
                "objectid": 379004,
                "acquisitiondate": 1708194871000,
                "cloudcover": 85.061637879999992,
                "name": "S2A_MSIL2A_20240217T183431_N0510_R027_T11SMT_20240217T232852",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 3.3945770299999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 49.509746550000003,
                "meansolarazimuth": 154.24900818,
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
        {
            "attributes": {
                "objectid": 673020,
                "acquisitiondate": 1708626839000,
                "cloudcover": 8.0429439499999997,
                "name": "S2B_MSIL2A_20240222T183359_N0510_R027_T11SMT_20240222T230750",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 3.19521809,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 47.800426480000006,
                "meansolarazimuth": 153.52658080999998,
                "category": 1,
                "nodatapixelpercentage": 0.00072000000000000005
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
        {
            "attributes": {
                "objectid": 430064,
                "acquisitiondate": 1709058801000,
                "cloudcover": 73.041206360000004,
                "name": "S2A_MSIL2A_20240227T183321_N0510_R027_T11SMT_20240227T234020",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.52550411,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 46.015937810000004,
                "meansolarazimuth": 152.79801940999999,
                "category": 1,
                "nodatapixelpercentage": 7.6000000000000004e-05
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
        {
            "attributes": {
                "objectid": 964899,
                "acquisitiondate": 1709922731000,
                "cloudcover": 0.12428600000000001,
                "name": "S2A_MSIL2A_20240308T183211_N0510_R027_T11SMT_20240309T002701",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.55795789,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.264770509999998,
                "meansolarazimuth": 151.34974670000003,
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
        {
            "attributes": {
                "objectid": 2078498,
                "acquisitiondate": 1710354639000,
                "cloudcover": 70.980560300000008,
                "name": "S2B_MSIL2A_20240313T183039_N0510_R027_T11SMT_20240313T230706",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.86741304,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 40.338714600000003,
                "meansolarazimuth": 150.58273315,
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
        {
            "attributes": {
                "objectid": 1122597,
                "acquisitiondate": 1710786661000,
                "cloudcover": 40.682430270000005,
                "name": "S2A_MSIL2A_20240318T183101_N0510_R027_T11SMT_20240319T012244",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.22439601000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 38.385791779999998,
                "meansolarazimuth": 149.82688904,
                "category": 1,
                "nodatapixelpercentage": 0.00018200000000000001
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
        {
            "attributes": {
                "objectid": 2144876,
                "acquisitiondate": 1711218569000,
                "cloudcover": 97.011482239999992,
                "name": "S2B_MSIL2A_20240323T182929_N0510_R027_T11SMT_20240324T002117",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.064010999999999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 36.439895629999995,
                "meansolarazimuth": 149.00903319999998,
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
        {
            "attributes": {
                "objectid": 1709342,
                "acquisitiondate": 1711650591000,
                "cloudcover": 3.4179420499999997,
                "name": "S2A_MSIL2A_20240328T182951_N0510_R027_T11SMT_20240330T064152",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.6846289600000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 34.511600489999999,
                "meansolarazimuth": 148.13085938,
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
        {
            "attributes": {
                "objectid": 2241994,
                "acquisitiondate": 1712514561000,
                "cloudcover": 35.67408752,
                "name": "S2A_MSIL2A_20240407T182921_N0510_R027_T11SMT_20240408T002900",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 3.1204009099999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.774211879999999,
                "meansolarazimuth": 146.10615540000001,
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
        {
            "attributes": {
                "objectid": 2465609,
                "acquisitiondate": 1712946559000,
                "cloudcover": 59.939826969999999,
                "name": "S2B_MSIL2A_20240412T182919_N0510_R027_T11SMT_20240412T234328",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.7722929700000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 28.994049069999999,
                "meansolarazimuth": 144.93725585999999,
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
        {
            "attributes": {
                "objectid": 2304286,
                "acquisitiondate": 1713378561000,
                "cloudcover": 26.997211459999999,
                "name": "S2A_MSIL2A_20240417T182921_N0510_R027_T11SMT_20240418T020639",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.3296170200000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 27.29524803,
                "meansolarazimuth": 143.64141846000001,
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
        {
            "attributes": {
                "objectid": 2531278,
                "acquisitiondate": 1713810559000,
                "cloudcover": 41.631744380000001,
                "name": "S2B_MSIL2A_20240422T182919_N0510_R027_T11SMT_20240423T001813",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.1097539699999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 25.708700180000001,
                "meansolarazimuth": 142.14724731000001,
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
        {
            "attributes": {
                "objectid": 2366792,
                "acquisitiondate": 1714242561000,
                "cloudcover": 20.471899030000003,
                "name": "S2A_MSIL2A_20240427T182921_N0510_R027_T11SMT_20240428T014201",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.85419798000000013,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 24.225040440000001,
                "meansolarazimuth": 140.53411864999998,
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
        {
            "attributes": {
                "objectid": 28938735,
                "acquisitiondate": 1715106561000,
                "cloudcover": 0.10904700000000001,
                "name": "S2A_MSIL2A_20240507T182921_N0510_R027_T11SMT_20240508T015202",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.48396,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 21.673898699999999,
                "meansolarazimuth": 136.75418091,
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
        {
            "attributes": {
                "objectid": 28648399,
                "acquisitiondate": 1715538559000,
                "cloudcover": 16.076721189999997,
                "name": "S2B_MSIL2A_20240512T182919_N0510_R027_T11SMT_20240513T002335",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.25889799000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.63170242,
                "meansolarazimuth": 134.62419127999999,
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
        {
            "attributes": {
                "objectid": 28644734,
                "acquisitiondate": 1715970561000,
                "cloudcover": 70.993621829999995,
                "name": "S2A_MSIL2A_20240517T182921_N0510_R027_T11SMT_20240518T031815",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.25002199000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.740236280000001,
                "meansolarazimuth": 132.45053100999999,
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
        {
            "attributes": {
                "objectid": 28873489,
                "acquisitiondate": 1716402559000,
                "cloudcover": 36.855934139999995,
                "name": "S2B_MSIL2A_20240522T182919_N0510_R027_T11SMT_20240522T233016",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.17228501000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.027187350000002,
                "meansolarazimuth": 130.21488952999999,
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
        {
            "attributes": {
                "objectid": 28708317,
                "acquisitiondate": 1716834561000,
                "cloudcover": 16.231313710000002,
                "name": "S2A_MSIL2A_20240527T182921_N0510_R027_T11SMT_20240528T062730",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.115331,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.470012659999998,
                "meansolarazimuth": 128.07096862999998,
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
        {
            "attributes": {
                "objectid": 1365789,
                "acquisitiondate": 1717698561000,
                "cloudcover": 16.469984050000001,
                "name": "S2A_MSIL2A_20240606T182921_N0510_R027_T11SMT_20240607T022302",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.038868,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.83596039,
                "meansolarazimuth": 124.30032349,
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
        {
            "attributes": {
                "objectid": 1555421,
                "acquisitiondate": 1718130559000,
                "cloudcover": 25.622993470000001,
                "name": "S2B_MSIL2A_20240611T182919_N0510_R027_T11SMT_20240611T232437",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.018879,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.75333977,
                "meansolarazimuth": 122.8115921,
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
        {
            "attributes": {
                "objectid": 1991622,
                "acquisitiondate": 1718562561000,
                "cloudcover": 0.58646101000000006,
                "name": "S2A_MSIL2A_20240616T182921_N0510_R027_T11SMT_20240617T022825",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0069640000000000006,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.786483759999999,
                "meansolarazimuth": 121.75034332,
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
        {
            "attributes": {
                "objectid": 1204481,
                "acquisitiondate": 1718994559000,
                "cloudcover": 0.171343,
                "name": "S2B_MSIL2A_20240621T182919_N0510_R027_T11SMT_20240622T013516",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0027440000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.954008099999999,
                "meansolarazimuth": 121.07221222,
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
        {
            "attributes": {
                "objectid": 1602319,
                "acquisitiondate": 1719426561000,
                "cloudcover": 0.24243100000000001,
                "name": "S2A_MSIL2A_20240626T182921_N0510_R027_T11SMT_20240627T022848",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0012110000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.21466637,
                "meansolarazimuth": 120.87641907,
                "category": 1,
                "nodatapixelpercentage": 1.3000000000000001e-05
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
        {
            "attributes": {
                "objectid": 1373072,
                "acquisitiondate": 1720290561000,
                "cloudcover": 11.55042744,
                "name": "S2A_MSIL2A_20240706T182921_N0510_R027_T11SMT_20240707T023655",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.020938870000002,
                "meansolarazimuth": 121.80904388,
                "category": 1,
                "nodatapixelpercentage": 0.15986
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13128542.3797000013,
                            3941487.07349999994
                        ],
                        [
                            -13144102.3207999989,
                            3945329.59929999709
                        ],
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
                            -13128542.3797000013,
                            3941487.07349999994
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        {
            "attributes": {
                "objectid": 1756065,
                "acquisitiondate": 1720722559000,
                "cloudcover": 46.379203799999999,
                "name": "S2B_MSIL2A_20240711T182919_N0510_R027_T11SMT_20240712T022705",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.556734089999999,
                "meansolarazimuth": 122.88372803,
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
        {
            "attributes": {
                "objectid": 1973301,
                "acquisitiondate": 1721154561000,
                "cloudcover": 8.8877782800000009,
                "name": "S2A_MSIL2A_20240716T182921_N0510_R027_T11SMT_20240717T020020",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.167480470000001,
                "meansolarazimuth": 124.33562469,
                "category": 1,
                "nodatapixelpercentage": 1.0000000000000001e-05
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
        {
            "attributes": {
                "objectid": 1410686,
                "acquisitiondate": 1721586559000,
                "cloudcover": 6.3950319299999991,
                "name": "S2B_MSIL2A_20240721T182919_N0510_R027_T11SMT_20240722T002413",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.848449710000001,
                "meansolarazimuth": 126.12747191999999,
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
        {
            "attributes": {
                "objectid": 1604111,
                "acquisitiondate": 1722018561000,
                "cloudcover": 1.25847602,
                "name": "S2A_MSIL2A_20240726T182921_N0511_R027_T11SMT_20240727T021649",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 21.618299480000001,
                "meansolarazimuth": 128.15971374999998,
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
        {
            "attributes": {
                "objectid": 2004624,
                "acquisitiondate": 1722450559000,
                "cloudcover": 0.044388999999999998,
                "name": "S2B_MSIL2A_20240731T182919_N0511_R027_T11SMT_20240731T220220",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 22.474256520000001,
                "meansolarazimuth": 130.39263915999999,
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
        {
            "attributes": {
                "objectid": 904469,
                "acquisitiondate": 1723746561000,
                "cloudcover": 0.026151000000000001,
                "name": "S2A_MSIL2A_20240815T182921_N0511_R027_T11SMT_20240816T005200",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 25.538251880000001,
                "meansolarazimuth": 137.87118530000001,
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
        {
            "attributes": {
                "objectid": 661778,
                "acquisitiondate": 1724178559000,
                "cloudcover": 0.0090360000000000006,
                "name": "S2B_MSIL2A_20240820T182919_N0511_R027_T11SMT_20240820T230357",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 26.73178673,
                "meansolarazimuth": 140.44548035,
                "category": 1,
                "nodatapixelpercentage": 58.727352140000001
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13012642.4008999988,
                            4001561.71930000186
                        ],
                        [
                            -13015369.3366,
                            4002357.71379999816
                        ],
                        [
                            -13015367.1073,
                            4002367.57020000368
                        ],
                        [
                            -13015380.8713999987,
                            4002371.47600000352
                        ],
                        [
                            -13015377.5566999987,
                            4002386.35069999844
                        ],
                        [
                            -13015386.5921,
                            4002388.91759999841
                        ],
                        [
                            -13015379.8839,
                            4002419.57919999957
                        ],
                        [
                            -13015384.1721,
                            4002420.79900000244
                        ],
                        [
                            -13015357.3191,
                            4002541.242399998
                        ],
                        [
                            -13015386.7919999994,
                            4002549.62520000339
                        ],
                        [
                            -13015378.2785,
                            4002587.75779999793
                        ],
                        [
                            -13015385.6484999992,
                            4002589.860299997
                        ],
                        [
                            -13015370.7692999989,
                            4002658.003200002
                        ],
                        [
                            -13041751.5918000005,
                            4010208.95229999721
                        ],
                        [
                            -13041751.9386,
                            4010207.53549999744
                        ],
                        [
                            -13041853.9681,
                            4010236.86980000138
                        ],
                        [
                            -13041924.5694999993,
                            4009957.90349999815
                        ],
                        [
                            -13071500.7676,
                            4017915.42390000075
                        ],
                        [
                            -13071461.6677,
                            4018075.96779999882
                        ],
                        [
                            -13071479.819,
                            4018080.68980000168
                        ],
                        [
                            -13071450.1533,
                            4018203.05629999936
                        ],
                        [
                            -13071488.3682,
                            4018213.02589999884
                        ],
                        [
                            -13071487.1416,
                            4018217.91860000044
                        ],
                        [
                            -13097682.7028,
                            4025053.09749999642
                        ],
                        [
                            -13097734.1908,
                            4024845.14220000058
                        ],
                        [
                            -13127214.8104,
                            4032139.79399999976
                        ],
                        [
                            -13127198.3664,
                            4032208.91820000112
                        ],
                        [
                            -13127204.2864999995,
                            4032210.313699998
                        ],
                        [
                            -13127175.3845000006,
                            4032332.44210000336
                        ],
                        [
                            -13127197.4721999988,
                            4032337.63729999959
                        ],
                        [
                            -13127193.2333,
                            4032355.2546999976
                        ],
                        [
                            -13127198.0529999994,
                            4032356.38840000331
                        ],
                        [
                            -13127192.8623000011,
                            4032377.56780000031
                        ],
                        [
                            -13145058.4785000011,
                            4036579.5353000015
                        ],
                        [
                            -13145449.6402,
                            4074120.67140000314
                        ],
                        [
                            -13012567.863499999,
                            4074765.66679999977
                        ],
                        [
                            -13012642.4008999988,
                            4001561.71930000186
                        ]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100,
                    "latestWkid": 3857
                }
            }
        },
        {
            "attributes": {
                "objectid": 760035,
                "acquisitiondate": 1724610561000,
                "cloudcover": 0.0031620000000000003,
                "name": "S2A_MSIL2A_20240825T182921_N0511_R027_T11SMT_20240826T015359",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 28.015439990000001,
                "meansolarazimuth": 142.9730835,
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
        {
            "attributes": {
                "objectid": 917501,
                "acquisitiondate": 1725042559000,
                "cloudcover": 18.416358949999999,
                "name": "S2B_MSIL2A_20240830T182919_N0511_R027_T11SMT_20240830T235532",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 29.367801669999999,
                "meansolarazimuth": 145.49011230000002,
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
        {
            "attributes": {
                "objectid": 28235793,
                "acquisitiondate": 1725906559000,
                "cloudcover": 8.2031049700000001,
                "name": "S2B_MSIL2A_20240909T182919_N0511_R027_T11SMT_20240909T224820",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.01358,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.319812769999999,
                "meansolarazimuth": 150.14938354,
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
        {
            "attributes": {
                "objectid": 27629532,
                "acquisitiondate": 1727202671000,
                "cloudcover": 10.68815994,
                "name": "S2A_MSIL2A_20240924T183111_N0511_R027_T11SMT_20240925T003352",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 4.6e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 37.187683110000002,
                "meansolarazimuth": 156.12875366,
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
        {
            "attributes": {
                "objectid": 27684258,
                "acquisitiondate": 1727634659000,
                "cloudcover": 7.4680872000000003,
                "name": "S2B_MSIL2A_20240929T183059_N0511_R027_T11SMT_20240929T223749",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00047800000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 38.891910549999999,
                "meansolarazimuth": 157.79632568,
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
        {
            "attributes": {
                "objectid": 27521022,
                "acquisitiondate": 1728498709000,
                "cloudcover": 7.54394293,
                "name": "S2B_MSIL2A_20241009T183149_N0511_R027_T11SMT_20241009T222257",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00064700000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.346488950000001,
                "meansolarazimuth": 160.62133788999998,
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
        {
            "attributes": {
                "objectid": 27673896,
                "acquisitiondate": 1728930811000,
                "cloudcover": 10.807156560000001,
                "name": "S2A_MSIL2A_20241014T183331_N0511_R027_T11SMT_20241014T222403",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.012701,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 44.06498337,
                "meansolarazimuth": 161.79438782,
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
        {
            "attributes": {
                "objectid": 27825104,
                "acquisitiondate": 1729362789000,
                "cloudcover": 1.5440989700000001,
                "name": "S2B_MSIL2A_20241019T183309_N0511_R027_T11SMT_20241019T220825",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0013270000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 45.759941099999999,
                "meansolarazimuth": 162.80288696,
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
        {
            "attributes": {
                "objectid": 27616967,
                "acquisitiondate": 1729794881000,
                "cloudcover": 3.0333840800000003,
                "name": "S2A_MSIL2A_20241024T183441_N0511_R027_T11SMT_20241024T220704",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.001583,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 47.421318050000004,
                "meansolarazimuth": 163.63002014,
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
        {
            "attributes": {
                "objectid": 29290889,
                "acquisitiondate": 1730226849000,
                "cloudcover": 25.738201139999997,
                "name": "S2B_MSIL2A_20241029T183409_N0511_R027_T11SMT_20241029T210117",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.178122,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 49.030605319999999,
                "meansolarazimuth": 164.29811096,
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
        {
            "attributes": {
                "objectid": 35556908,
                "acquisitiondate": 1731090899000,
                "cloudcover": 0.0038059999999999999,
                "name": "S2B_MSIL2A_20241108T183459_N0511_R027_T11SMT_20241108T235810",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0032650000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.03947067,
                "meansolarazimuth": 165.12483215,
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
        {
            "attributes": {
                "objectid": 35350240,
                "acquisitiondate": 1731522981000,
                "cloudcover": 0.017305999999999998,
                "name": "S2A_MSIL2A_20241113T183621_N0511_R027_T11SMT_20241113T223000",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0062340000000000008,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.396320339999995,
                "meansolarazimuth": 165.36160278,
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
        {
            "attributes": {
                "objectid": 35693895,
                "acquisitiondate": 1731954949000,
                "cloudcover": 4.7548451400000005,
                "name": "S2B_MSIL2A_20241118T183549_N0511_R027_T11SMT_20241118T203936",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.52245997999999993,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 54.646682740000003,
                "meansolarazimuth": 165.43040465999999,
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
        {
            "attributes": {
                "objectid": 35436507,
                "acquisitiondate": 1732387031000,
                "cloudcover": 40.103919980000001,
                "name": "S2A_MSIL2A_20241123T183711_N0511_R027_T11SMT_20241123T214451",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.031310000000000004,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 55.772109990000004,
                "meansolarazimuth": 165.37025452,
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
        {
            "attributes": {
                "objectid": 35835319,
                "acquisitiondate": 1732818999000,
                "cloudcover": 1.13315499,
                "name": "S2B_MSIL2A_20241128T183639_N0511_R027_T11SMT_20241128T202428",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.013636000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 56.758369449999996,
                "meansolarazimuth": 165.19577025999999,
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
        {
            "attributes": {
                "objectid": 35526500,
                "acquisitiondate": 1733251061000,
                "cloudcover": 67.418846130000006,
                "name": "S2A_MSIL2A_20241203T183741_N0511_R027_T11SMT_20241203T221112",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.00562,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 57.598541260000005,
                "meansolarazimuth": 164.89057922000001,
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
        {
            "attributes": {
                "objectid": 30041630,
                "acquisitiondate": 1733683019000,
                "cloudcover": 84.229156490000008,
                "name": "S2B_MSIL2A_20241208T183659_N0511_R027_T11SMT_20241208T221226",
                "month": 12,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.003016,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.277248380000003,
                "meansolarazimuth": 164.48971558,
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
        {
            "attributes": {
                "objectid": 36357890,
                "acquisitiondate": 1734115081000,
                "cloudcover": 36.80984497,
                "name": "S2A_MSIL2A_20241213T183801_N0511_R027_T11SMT_20241213T220549",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.014141000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.786964420000004,
                "meansolarazimuth": 163.99784851000001,
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
        },
        {
            "attributes": {
                "objectid": 36468573,
                "acquisitiondate": 1734979081000,
                "cloudcover": 84.080383299999994,
                "name": "S2A_MSIL2A_20241223T183801_N0511_R027_T11SMT_20241223T220353",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0050660000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.274360659999999,
                "meansolarazimuth": 162.79144287,
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
        {
            "attributes": {
                "objectid": 36522626,
                "acquisitiondate": 1735411029000,
                "cloudcover": 99.962356569999997,
                "name": "S2B_MSIL2A_20241228T183709_N0511_R027_T11SMT_20241228T215329",
                "month": 12,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.243377689999996,
                "meansolarazimuth": 162.1003418,
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