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
        {
            "attributes": {
                "objectid": 11847703,
                "acquisitiondate": 1672771071000,
                "cloudcover": 92.825584410000005,
                "name": "S2A_MSIL2A_20230103T183751_N0400_R027_T11SMT_20230104T081027",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.054914000000000004,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.999679569999998,
                "meansolarazimuth": 161.28015137,
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
        {
            "attributes": {
                "objectid": 16204601,
                "acquisitiondate": 1673203059000,
                "cloudcover": 35.757873540000006,
                "name": "S2B_MSIL2A_20230108T183739_N0400_R027_T11SMT_20230109T101620",
                "month": 1,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.82809800000000011,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.585220339999999,
                "meansolarazimuth": 160.50077819999998,
                "category": 1,
                "nodatapixelpercentage": 0.0034310000000000005
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
        {
            "attributes": {
                "objectid": 37809604,
                "acquisitiondate": 1673635051000,
                "cloudcover": 99.058250430000001,
                "name": "S2A_MSIL2A_20230113T183731_N0510_R027_T11SMT_20240810T224227",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.018139000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 57.987899779999999,
                "meansolarazimuth": 159.71177673,
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
                "objectid": 12961833,
                "acquisitiondate": 1673635051000,
                "cloudcover": 99.066009520000009,
                "name": "S2A_MSIL2A_20230113T183731_N0400_R027_T11SMT_20230114T093324",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.019015000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 57.987899779999999,
                "meansolarazimuth": 159.71177673,
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
        {
            "attributes": {
                "objectid": 17630364,
                "acquisitiondate": 1674067029000,
                "cloudcover": 29.55714798,
                "name": "S2B_MSIL2A_20230118T183709_N0400_R027_T11SMT_20230120T162616",
                "month": 1,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 3.8002700800000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 57.216533660000003,
                "meansolarazimuth": 158.90776062,
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
        {
            "attributes": {
                "objectid": 14148243,
                "acquisitiondate": 1674499011000,
                "cloudcover": 6.8044481299999999,
                "name": "S2A_MSIL2A_20230123T183651_N0400_R027_T11SMT_20230124T232419",
                "month": 1,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.5746290700000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 56.278827669999998,
                "meansolarazimuth": 158.09524536000001,
                "category": 1,
                "nodatapixelpercentage": 0.00046100000000000004
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
        {
            "attributes": {
                "objectid": 22900965,
                "acquisitiondate": 1675362961000,
                "cloudcover": 45.810653690000002,
                "name": "S2A_MSIL2A_20230202T183601_N0400_R027_T11SMT_20230203T141313",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.5172970299999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.931537630000001,
                "meansolarazimuth": 156.51216124999999,
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
        {
            "attributes": {
                "objectid": 38109105,
                "acquisitiondate": 1675794929000,
                "cloudcover": 0.031858000000000004,
                "name": "S2B_MSIL2A_20230207T183529_N0510_R027_T11SMT_20240812T224025",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 2.00705409,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.549888609999996,
                "meansolarazimuth": 155.73350524999998,
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
                "objectid": 24874813,
                "acquisitiondate": 1675794929000,
                "cloudcover": 0.033232999999999999,
                "name": "S2B_MSIL2A_20230207T183529_N0400_R027_T11SMT_20230208T132345",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 2.0141320199999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.549888609999996,
                "meansolarazimuth": 155.73350524999998,
                "category": 1,
                "nodatapixelpercentage": 0.044728000000000004
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
        {
            "attributes": {
                "objectid": 23758160,
                "acquisitiondate": 1676226901000,
                "cloudcover": 34.073993680000001,
                "name": "S2A_MSIL2A_20230212T183501_N0400_R027_T11SMT_20230213T075527",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.1821709899999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 51.044574740000002,
                "meansolarazimuth": 154.97105408000002,
                "category": 1,
                "nodatapixelpercentage": 0.00015900000000000002
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
        {
            "attributes": {
                "objectid": 38068135,
                "acquisitiondate": 1676226901000,
                "cloudcover": 34.069591519999996,
                "name": "S2A_MSIL2A_20230212T183501_N0510_R027_T11SMT_20240817T035430",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.1846480400000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 51.044574740000002,
                "meansolarazimuth": 154.97105408000002,
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
                "objectid": 41637924,
                "acquisitiondate": 1676658869000,
                "cloudcover": 98.735275270000002,
                "name": "S2B_MSIL2A_20230217T183429_N0510_R027_T11SMT_20240820T011902",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.083736000000000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 49.429141999999999,
                "meansolarazimuth": 154.22328185999999,
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
                "objectid": 24532537,
                "acquisitiondate": 1677090831000,
                "cloudcover": 28.978750229999999,
                "name": "S2A_MSIL2A_20230222T183351_N0400_R027_T11SMT_20230226T184734",
                "month": 2,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.61929798000000014,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 47.720577240000004,
                "meansolarazimuth": 153.48098754999998,
                "category": 1,
                "nodatapixelpercentage": 1.3000000000000001e-05
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
        {
            "attributes": {
                "objectid": 27357188,
                "acquisitiondate": 1677522799000,
                "cloudcover": 87.945976259999995,
                "name": "S2B_MSIL2A_20230227T183319_N0400_R027_T11SMT_20230301T081216",
                "month": 2,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.73968898999999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 45.925823210000004,
                "meansolarazimuth": 152.77027892999999,
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
        {
            "attributes": {
                "objectid": 36865039,
                "acquisitiondate": 1677954761000,
                "cloudcover": 70.836067200000002,
                "name": "S2A_MSIL2A_20230304T183241_N0510_R027_T11SMT_20240819T135632",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 5.9728131300000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 44.078872680000003,
                "meansolarazimuth": 152.02584838999999,
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
                "objectid": 38256547,
                "acquisitiondate": 1678386729000,
                "cloudcover": 20.428203580000002,
                "name": "S2B_MSIL2A_20230309T183209_N0510_R027_T11SMT_20240823T150614",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 9.0970067999999991,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.166316989999999,
                "meansolarazimuth": 151.33781432999999,
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
                "objectid": 12544092,
                "acquisitiondate": 1678386729000,
                "cloudcover": 20.400325780000003,
                "name": "S2B_MSIL2A_20230309T183209_N0509_R027_T11SMT_20230310T013230",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 9.1057024000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.166316989999999,
                "meansolarazimuth": 151.33781432999999,
                "category": 1,
                "nodatapixelpercentage": 0.00090600000000000012
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
        {
            "attributes": {
                "objectid": 37039003,
                "acquisitiondate": 1678818691000,
                "cloudcover": 99.988021849999996,
                "name": "S2A_MSIL2A_20230314T183131_N0510_R027_T11SMT_20240820T003209",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 2.0000000000000002e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 40.245883940000006,
                "meansolarazimuth": 150.55154419000002,
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
                "objectid": 24649575,
                "acquisitiondate": 1678818691000,
                "cloudcover": 99.982330319999988,
                "name": "S2A_MSIL2A_20230314T183131_N0509_R027_T11SMT_20230315T063303",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 5.5999999999999999e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 40.245880130000003,
                "meansolarazimuth": 150.55155945000001,
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
        {
            "attributes": {
                "objectid": 14363002,
                "acquisitiondate": 1679250659000,
                "cloudcover": 99.606910709999994,
                "name": "S2B_MSIL2A_20230319T183059_N0509_R027_T11SMT_20230320T003147",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00023600000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 38.287410739999999,
                "meansolarazimuth": 149.81144713999998,
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
        {
            "attributes": {
                "objectid": 40814684,
                "acquisitiondate": 1679250659000,
                "cloudcover": 99.616989140000001,
                "name": "S2B_MSIL2A_20230319T183059_N0510_R027_T11SMT_20240825T110257",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 9.0000000000000006e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 38.287410739999999,
                "meansolarazimuth": 149.81144713999998,
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
                "objectid": 40905536,
                "acquisitiondate": 1679682621000,
                "cloudcover": 9.9179525399999999,
                "name": "S2A_MSIL2A_20230324T183021_N0510_R027_T11SMT_20240824T142745",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 7.4860172299999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 36.34990311,
                "meansolarazimuth": 148.95709228999999,
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
                "objectid": 23182233,
                "acquisitiondate": 1679682621000,
                "cloudcover": 9.9126014700000002,
                "name": "S2A_MSIL2A_20230324T183021_N0509_R027_T11SMT_20230325T012155",
                "month": 3,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 7.4857711799999995,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 36.349899290000003,
                "meansolarazimuth": 148.95709228999999,
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
        {
            "attributes": {
                "objectid": 41006339,
                "acquisitiondate": 1680114589000,
                "cloudcover": 99.761245729999999,
                "name": "S2B_MSIL2A_20230329T182949_N0510_R027_T11SMT_20240824T093310",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 4.6e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 34.413215640000004,
                "meansolarazimuth": 148.10426330999999,
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
                "objectid": 16270678,
                "acquisitiondate": 1680114589000,
                "cloudcover": 99.754425050000009,
                "name": "S2B_MSIL2A_20230329T182949_N0509_R027_T11SMT_20230330T014010",
                "month": 3,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.3000000000000001e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 34.413215640000004,
                "meansolarazimuth": 148.10426330999999,
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
        {
            "attributes": {
                "objectid": 17132692,
                "acquisitiondate": 1680546561000,
                "cloudcover": 81.062301639999987,
                "name": "S2A_MSIL2A_20230403T182921_N0509_R027_T11SMT_20230404T024935",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.52126901999999997,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.527484889999997,
                "meansolarazimuth": 147.11660767000001,
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
        {
            "attributes": {
                "objectid": 37634445,
                "acquisitiondate": 1680978559000,
                "cloudcover": 14.58277607,
                "name": "S2B_MSIL2A_20230408T182919_N0510_R027_T11SMT_20240903T204542",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 3.7241320600000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.680498119999999,
                "meansolarazimuth": 146.07723999000001,
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
                "objectid": 21479180,
                "acquisitiondate": 1680978559000,
                "cloudcover": 14.542530060000001,
                "name": "S2B_MSIL2A_20230408T182919_N0509_R027_T11SMT_20230409T015243",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 3.7220749899999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.680500029999997,
                "meansolarazimuth": 146.07723999000001,
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
        {
            "attributes": {
                "objectid": 35612975,
                "acquisitiondate": 1681410561000,
                "cloudcover": 90.239212039999998,
                "name": "S2A_MSIL2A_20230413T182921_N0509_R027_T11SMT_20230414T033653",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.7416030200000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 28.911378859999999,
                "meansolarazimuth": 144.87910460999998,
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
        {
            "attributes": {
                "objectid": 37532224,
                "acquisitiondate": 1681410561000,
                "cloudcover": 90.222976680000002,
                "name": "S2A_MSIL2A_20230413T182921_N0510_R027_T11SMT_20240824T225800",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.7386439999999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 28.911380770000001,
                "meansolarazimuth": 144.87910460999998,
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
                "objectid": 37378193,
                "acquisitiondate": 1681842559000,
                "cloudcover": 73.625877379999991,
                "name": "S2B_MSIL2A_20230418T182919_N0510_R027_T11SMT_20240902T072049",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 2.1117019699999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 27.219020840000002,
                "meansolarazimuth": 143.56652832,
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
                "objectid": 22638748,
                "acquisitiondate": 1681842559000,
                "cloudcover": 73.622406010000006,
                "name": "S2B_MSIL2A_20230418T182919_N0509_R027_T11SMT_20230419T082913",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 2.10869193,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 27.219020840000002,
                "meansolarazimuth": 143.56652832,
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
        {
            "attributes": {
                "objectid": 23167481,
                "acquisitiondate": 1682274561000,
                "cloudcover": 1.23570895,
                "name": "S2A_MSIL2A_20230423T182921_N0509_R027_T11SMT_20230425T022243",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.64735699,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 25.63611221,
                "meansolarazimuth": 142.06384276999998,
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
        {
            "attributes": {
                "objectid": 37560172,
                "acquisitiondate": 1682274561000,
                "cloudcover": 1.2367210399999999,
                "name": "S2A_MSIL2A_20230423T182921_N0510_R027_T11SMT_20240831T081646",
                "month": 4,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.6461460600000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 25.63611221,
                "meansolarazimuth": 142.06382750999998,
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
                "objectid": 37689086,
                "acquisitiondate": 1682706559000,
                "cloudcover": 8.0376481999999996,
                "name": "S2B_MSIL2A_20230428T182919_N0510_R027_T11SMT_20240901T064250",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.2087550199999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 24.15951729,
                "meansolarazimuth": 140.43362427000002,
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
                "objectid": 19484361,
                "acquisitiondate": 1682706559000,
                "cloudcover": 8.0461206399999998,
                "name": "S2B_MSIL2A_20230428T182919_N0509_R027_T11SMT_20230429T013941",
                "month": 4,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 1.2084100199999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 24.159519200000002,
                "meansolarazimuth": 140.43362427000002,
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
        {
            "attributes": {
                "objectid": 41142273,
                "acquisitiondate": 1683138561000,
                "cloudcover": 49.32089233,
                "name": "S2A_MSIL2A_20230503T182921_N0510_R027_T11SMT_20240906T100736",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.79720402000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 22.822055819999999,
                "meansolarazimuth": 138.60697937,
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
                "objectid": 19962363,
                "acquisitiondate": 1684434559000,
                "cloudcover": 43.564834589999997,
                "name": "S2B_MSIL2A_20230518T182919_N0509_R027_T11SMT_20230519T024241",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.19215900000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.69536781,
                "meansolarazimuth": 132.36579895,
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
        {
            "attributes": {
                "objectid": 18765022,
                "acquisitiondate": 1684866561000,
                "cloudcover": 62.404651640000004,
                "name": "S2A_MSIL2A_20230523T182921_N0509_R027_T11SMT_20230524T042948",
                "month": 5,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.27741101000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.989234920000001,
                "meansolarazimuth": 130.12957764000001,
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
        {
            "attributes": {
                "objectid": 27329572,
                "acquisitiondate": 1685298559000,
                "cloudcover": 86.236900330000012,
                "name": "S2B_MSIL2A_20230528T182919_N0509_R027_T11SMT_20230529T003817",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.21923900000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.44261551,
                "meansolarazimuth": 127.9800415,
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
        {
            "attributes": {
                "objectid": 38478908,
                "acquisitiondate": 1685298559000,
                "cloudcover": 86.258216860000005,
                "name": "S2B_MSIL2A_20230528T182919_N0510_R027_T11SMT_20240908T233506",
                "month": 5,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.21923301000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.44261551,
                "meansolarazimuth": 127.98004913,
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
                "objectid": 38530728,
                "acquisitiondate": 1685730561000,
                "cloudcover": 49.693111420000001,
                "name": "S2A_MSIL2A_20230602T182921_N0510_R027_T11SMT_20240911T202022",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.15407699,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.06237411,
                "meansolarazimuth": 125.96984863,
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
        {
            "attributes": {
                "objectid": 17933285,
                "acquisitiondate": 1686162559000,
                "cloudcover": 85.275772090000004,
                "name": "S2B_MSIL2A_20230607T182919_N0509_R027_T11SMT_20230608T015034",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.044303000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.831987380000001,
                "meansolarazimuth": 124.21208954000001,
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
        {
            "attributes": {
                "objectid": 38696640,
                "acquisitiondate": 1686162559000,
                "cloudcover": 85.263740540000001,
                "name": "S2B_MSIL2A_20230607T182919_N0510_R027_T11SMT_20240913T151900",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.044393000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.831987380000001,
                "meansolarazimuth": 124.21208954000001,
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
                "objectid": 38799408,
                "acquisitiondate": 1686594561000,
                "cloudcover": 92.455116270000005,
                "name": "S2A_MSIL2A_20230612T182921_N0510_R027_T11SMT_20240911T195258",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0061610000000000007,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.74998665,
                "meansolarazimuth": 122.75801849,
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
                "objectid": 13631393,
                "acquisitiondate": 1686594561000,
                "cloudcover": 92.461196900000004,
                "name": "S2A_MSIL2A_20230612T182921_N0509_R027_T11SMT_20230613T030213",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0061080000000000006,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.749984739999999,
                "meansolarazimuth": 122.75802612,
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
        {
            "attributes": {
                "objectid": 38905222,
                "acquisitiondate": 1687026559000,
                "cloudcover": 1.6358209800000001,
                "name": "S2B_MSIL2A_20230617T182919_N0510_R027_T11SMT_20240916T172046",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.018394000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.795942310000001,
                "meansolarazimuth": 121.69646453999999,
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
                "objectid": 35751712,
                "acquisitiondate": 1687026559000,
                "cloudcover": 1.6329909600000001,
                "name": "S2B_MSIL2A_20230617T182919_N0509_R027_T11SMT_20230618T004750",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.018397,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.795944209999998,
                "meansolarazimuth": 121.69646453999999,
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
        {
            "attributes": {
                "objectid": 15451579,
                "acquisitiondate": 1687458561000,
                "cloudcover": 8.9426012000000004,
                "name": "S2A_MSIL2A_20230622T182921_N0509_R027_T11SMT_20230623T023506",
                "month": 6,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.047258999999999995,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 17.964387890000001,
                "meansolarazimuth": 121.05110931,
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
        {
            "attributes": {
                "objectid": 39161894,
                "acquisitiondate": 1687890559000,
                "cloudcover": 0.40691301000000002,
                "name": "S2B_MSIL2A_20230627T182919_N0510_R027_T11SMT_20240912T105241",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.034306000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.229751590000003,
                "meansolarazimuth": 120.87944031000001,
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
                "objectid": 21612562,
                "acquisitiondate": 1687890559000,
                "cloudcover": 0.40860200000000002,
                "name": "S2B_MSIL2A_20230627T182919_N0509_R027_T11SMT_20230628T075555",
                "month": 6,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.034462,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.229751590000003,
                "meansolarazimuth": 120.87944031000001,
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
        {
            "attributes": {
                "objectid": 25705647,
                "acquisitiondate": 1688322561000,
                "cloudcover": 9.9539690000000007,
                "name": "S2A_MSIL2A_20230702T182921_N0509_R027_T11SMT_20230703T043234",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 18.592622760000001,
                "meansolarazimuth": 121.15264893000001,
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
        {
            "attributes": {
                "objectid": 25643443,
                "acquisitiondate": 1688754559000,
                "cloudcover": 3.47867799,
                "name": "S2B_MSIL2A_20230707T182919_N0509_R027_T11SMT_20230708T011714",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.040779110000003,
                "meansolarazimuth": 121.86422729,
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
        {
            "attributes": {
                "objectid": 39271302,
                "acquisitiondate": 1688754559000,
                "cloudcover": 3.47463298,
                "name": "S2B_MSIL2A_20230707T182919_N0510_R027_T11SMT_20241023T150018",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.040779110000003,
                "meansolarazimuth": 121.86422729,
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
                "objectid": 39400364,
                "acquisitiondate": 1689186561000,
                "cloudcover": 2.9725348899999999,
                "name": "S2A_MSIL2A_20230712T182921_N0510_R027_T11SMT_20241016T145027",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 19.574460980000001,
                "meansolarazimuth": 122.97183228,
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
        {
            "attributes": {
                "objectid": 39525451,
                "acquisitiondate": 1689618559000,
                "cloudcover": 10.396740909999998,
                "name": "S2B_MSIL2A_20230717T182919_N0510_R027_T11SMT_20241020T132202",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.187866209999999,
                "meansolarazimuth": 124.44390106,
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
                "objectid": 24563588,
                "acquisitiondate": 1689618559000,
                "cloudcover": 10.57152653,
                "name": "S2B_MSIL2A_20230717T182919_N0509_R027_T11SMT_20230718T015212",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.187866209999999,
                "meansolarazimuth": 124.44390106,
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
        {
            "attributes": {
                "objectid": 39577630,
                "acquisitiondate": 1690050561000,
                "cloudcover": 23.792644500000002,
                "name": "S2A_MSIL2A_20230722T182921_N0510_R027_T11SMT_20241018T064432",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.884769439999999,
                "meansolarazimuth": 126.2197876,
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
                "objectid": 20703265,
                "acquisitiondate": 1690050561000,
                "cloudcover": 23.781297679999998,
                "name": "S2A_MSIL2A_20230722T182921_N0509_R027_T11SMT_20230723T014803",
                "month": 7,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 20.884767529999998,
                "meansolarazimuth": 126.2197876,
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
        {
            "attributes": {
                "objectid": 25474303,
                "acquisitiondate": 1690482569000,
                "cloudcover": 2.6529180999999999,
                "name": "S2B_MSIL2A_20230727T182929_N0509_R027_T11SMT_20230728T012738",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 21.653682710000002,
                "meansolarazimuth": 128.28039551000001,
                "category": 1,
                "nodatapixelpercentage": 1.3000000000000001e-05
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
        {
            "attributes": {
                "objectid": 39687739,
                "acquisitiondate": 1690482569000,
                "cloudcover": 2.6591780200000001,
                "name": "S2B_MSIL2A_20230727T182929_N0510_R027_T11SMT_20241010T173201",
                "month": 7,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 21.653682710000002,
                "meansolarazimuth": 128.28039551000001,
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
        {
            "attributes": {
                "objectid": 41335419,
                "acquisitiondate": 1691346559000,
                "cloudcover": 9.6378612500000003,
                "name": "S2B_MSIL2A_20230806T182919_N0510_R027_T11SMT_20241021T054204",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 23.44655418,
                "meansolarazimuth": 132.94851685,
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
                "objectid": 12413096,
                "acquisitiondate": 1691346559000,
                "cloudcover": 9.6303558300000009,
                "name": "S2B_MSIL2A_20230806T182919_N0509_R027_T11SMT_20230807T011738",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 23.44655418,
                "meansolarazimuth": 132.94851685,
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
        {
            "attributes": {
                "objectid": 21768198,
                "acquisitiondate": 1691778561000,
                "cloudcover": 25.715932850000002,
                "name": "S2A_MSIL2A_20230811T182921_N0509_R027_T11SMT_20230812T050717",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 24.47241592,
                "meansolarazimuth": 135.45878600999998,
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
        {
            "attributes": {
                "objectid": 14186981,
                "acquisitiondate": 1692210559000,
                "cloudcover": 31.162658690000001,
                "name": "S2B_MSIL2A_20230816T182919_N0509_R027_T11SMT_20230817T032145",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 25.583965299999999,
                "meansolarazimuth": 138.02812194999998,
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
        {
            "attributes": {
                "objectid": 25747957,
                "acquisitiondate": 1692642561000,
                "cloudcover": 35.667358399999998,
                "name": "S2A_MSIL2A_20230821T182921_N0509_R027_T11SMT_20230823T221650",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 26.782253269999998,
                "meansolarazimuth": 140.60638428000001,
                "category": 1,
                "nodatapixelpercentage": 0.00051100000000000006
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
        {
            "attributes": {
                "objectid": 41355618,
                "acquisitiondate": 1692642561000,
                "cloudcover": 35.646339419999997,
                "name": "S2A_MSIL2A_20230821T182921_N0510_R027_T11SMT_20241030T055932",
                "month": 8,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 26.782255169999999,
                "meansolarazimuth": 140.60638428000001,
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
                "objectid": 16043419,
                "acquisitiondate": 1693074559000,
                "cloudcover": 2.24866199,
                "name": "S2B_MSIL2A_20230826T182919_N0509_R027_T11SMT_20230827T003000",
                "month": 8,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 28.07002258,
                "meansolarazimuth": 143.13613892000001,
                "category": 1,
                "nodatapixelpercentage": 4.3591327699999995
            },
            "geometry": {
                "rings": [
                    [
                        [
                            -13089141.6497999988,
                            4074393.97879999876
                        ],
                        [
                            -13088478.8535000011,
                            4074229.579400003
                        ],
                        [
                            -13088446.5709000006,
                            4074364.137000002
                        ],
                        [
                            -13088443.120000001,
                            4074363.31069999933
                        ],
                        [
                            -13088434.771,
                            4074397.4095999971
                        ],
                        [
                            -13087133.4462,
                            4074403.72800000012
                        ],
                        [
                            -13075486.0878,
                            4071371.30279999971
                        ],
                        [
                            -13058707.4576000012,
                            4066989.96130000055
                        ],
                        [
                            -13058758.1079999991,
                            4066781.69839999825
                        ],
                        [
                            -13058728.0517,
                            4066773.48680000007
                        ],
                        [
                            -13058741.41,
                            4066717.58269999921
                        ],
                        [
                            -13058722.4857,
                            4066712.45889999717
                        ],
                        [
                            -13058775.3625000007,
                            4066495.13620000333
                        ],
                        [
                            -13032355.3511,
                            4059375.96130000055
                        ],
                        [
                            -13032353.6812999994,
                            4059382.7268999964
                        ],
                        [
                            -13032324.7382999994,
                            4059374.8981000036
                        ],
                        [
                            -13032224.5507,
                            4059790.2456
                        ],
                        [
                            -13012588.3491999991,
                            4054203.10710000247
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
                        ],
                        [
                            -13089141.6497999988,
                            4074393.97879999876
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
                "objectid": 26427693,
                "acquisitiondate": 1693506561000,
                "cloudcover": 11.812986370000001,
                "name": "S2A_MSIL2A_20230831T182921_N0509_R027_T11SMT_20230901T043607",
                "month": 8,
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
        {
            "attributes": {
                "objectid": 24184183,
                "acquisitiondate": 1693938559000,
                "cloudcover": 43.930027009999996,
                "name": "S2B_MSIL2A_20230905T182919_N0509_R027_T11SMT_20230906T012910",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.874979020000001,
                "meansolarazimuth": 148.00628662,
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
        {
            "attributes": {
                "objectid": 39881924,
                "acquisitiondate": 1693938559000,
                "cloudcover": 42.556606290000005,
                "name": "S2B_MSIL2A_20230905T182919_N0510_R027_T11SMT_20240916T132430",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 4.3000000000000002e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 30.874979020000001,
                "meansolarazimuth": 148.00630188000002,
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
                "objectid": 35791772,
                "acquisitiondate": 1694370571000,
                "cloudcover": 85.453865050000005,
                "name": "S2A_MSIL2A_20230910T182931_N0509_R027_T11SMT_20230911T045600",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.387775420000004,
                "meansolarazimuth": 150.27824401999999,
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
        {
            "attributes": {
                "objectid": 39800290,
                "acquisitiondate": 1694370571000,
                "cloudcover": 85.457939150000001,
                "name": "S2A_MSIL2A_20230910T182931_N0510_R027_T11SMT_20241024T174818",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 32.38777924,
                "meansolarazimuth": 150.27824401999999,
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
                "objectid": 39940383,
                "acquisitiondate": 1694802609000,
                "cloudcover": 56.113071439999999,
                "name": "S2B_MSIL2A_20230915T183009_N0510_R027_T11SMT_20241105T120039",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 33.968151089999999,
                "meansolarazimuth": 152.39825439000001,
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
                "objectid": 25199803,
                "acquisitiondate": 1694802609000,
                "cloudcover": 56.113178250000004,
                "name": "S2B_MSIL2A_20230915T183009_N0509_R027_T11SMT_20230916T040705",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 33.968151089999999,
                "meansolarazimuth": 152.39825439000001,
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
        {
            "attributes": {
                "objectid": 40049285,
                "acquisitiondate": 1695234641000,
                "cloudcover": 57.836067199999995,
                "name": "S2A_MSIL2A_20230920T183041_N0510_R027_T11SMT_20241031T180036",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.001928,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 35.600036620000004,
                "meansolarazimuth": 154.37792969,
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
                "objectid": 20823111,
                "acquisitiondate": 1695234641000,
                "cloudcover": 57.925151820000004,
                "name": "S2A_MSIL2A_20230920T183041_N0509_R027_T11SMT_20230921T021346",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0019380000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 35.600036620000004,
                "meansolarazimuth": 154.37792969,
                "category": 1,
                "nodatapixelpercentage": 1.0000000000000001e-05
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
        {
            "attributes": {
                "objectid": 41546746,
                "acquisitiondate": 1695666629000,
                "cloudcover": 0.185056,
                "name": "S2B_MSIL2A_20230925T183029_N0510_R027_T11SMT_20241031T222625",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00026200000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 37.270145419999999,
                "meansolarazimuth": 156.21803283999998,
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
                "objectid": 19054309,
                "acquisitiondate": 1695666629000,
                "cloudcover": 0.19013000000000002,
                "name": "S2B_MSIL2A_20230925T183029_N0509_R027_T11SMT_20230926T004026",
                "month": 9,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00031900000000000006,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 37.270145419999999,
                "meansolarazimuth": 156.21803283999998,
                "category": 1,
                "nodatapixelpercentage": 0.00045100000000000001
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
        {
            "attributes": {
                "objectid": 21975245,
                "acquisitiondate": 1696098711000,
                "cloudcover": 87.016883849999999,
                "name": "S2A_MSIL2A_20230930T183151_N0509_R027_T11SMT_20231001T013353",
                "month": 9,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 1.0000000000000001e-05,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 38.973869319999999,
                "meansolarazimuth": 157.87936400999999,
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
        {
            "attributes": {
                "objectid": 22265108,
                "acquisitiondate": 1696530689000,
                "cloudcover": 0.0018080000000000001,
                "name": "S2B_MSIL2A_20231005T183129_N0509_R027_T11SMT_20231006T021209",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00029500000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 40.698352810000003,
                "meansolarazimuth": 159.36419678000001,
                "category": 1,
                "nodatapixelpercentage": 0.0055280000000000008
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
        {
            "attributes": {
                "objectid": 40197741,
                "acquisitiondate": 1696962781000,
                "cloudcover": 1.05901098,
                "name": "S2A_MSIL2A_20231010T183301_N0510_R027_T11SMT_20241105T203803",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0010319999999999999,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 42.427696229999995,
                "meansolarazimuth": 160.68626404000003,
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
                "objectid": 20494946,
                "acquisitiondate": 1697826851000,
                "cloudcover": 0.20255800000000002,
                "name": "S2A_MSIL2A_20231020T183411_N0509_R027_T11SMT_20231021T002925",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.011257,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 45.844406130000003,
                "meansolarazimuth": 162.83691406000003,
                "category": 1,
                "nodatapixelpercentage": 0.00024899999999999998
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
                "objectid": 40303356,
                "acquisitiondate": 1697826851000,
                "cloudcover": 0.116622,
                "name": "S2A_MSIL2A_20231020T183411_N0510_R027_T11SMT_20240909T155917",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.01652,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 45.844406130000003,
                "meansolarazimuth": 162.83691406000003,
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
                "objectid": 40428270,
                "acquisitiondate": 1698258879000,
                "cloudcover": 88.84415435999999,
                "name": "S2B_MSIL2A_20231025T183439_N0510_R027_T11SMT_20240917T152627",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00049100000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 47.502197269999996,
                "meansolarazimuth": 163.66389465,
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
                "objectid": 24795554,
                "acquisitiondate": 1698258879000,
                "cloudcover": 89.948684689999993,
                "name": "S2B_MSIL2A_20231025T183439_N0509_R027_T11SMT_20231025T225003",
                "month": 10,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 47.502197269999996,
                "meansolarazimuth": 163.66389465,
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
                "objectid": 21510961,
                "acquisitiondate": 1698690911000,
                "cloudcover": 42.792728420000003,
                "name": "S2A_MSIL2A_20231030T183511_N0509_R027_T11SMT_20231030T234129",
                "month": 10,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0036600000000000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 49.108219149999996,
                "meansolarazimuth": 164.31866454999999,
                "category": 1,
                "nodatapixelpercentage": 0.0031020000000000002
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
        {
            "attributes": {
                "objectid": 40592058,
                "acquisitiondate": 1699122939000,
                "cloudcover": 38.181270599999998,
                "name": "S2B_MSIL2A_20231104T183539_N0510_R027_T11SMT_20241110T122846",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.00080000000000000004,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 50.642681119999999,
                "meansolarazimuth": 164.83811950999998,
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
                "objectid": 40513484,
                "acquisitiondate": 1699554961000,
                "cloudcover": 1.8393199400000002,
                "name": "S2A_MSIL2A_20231109T183601_N0510_R027_T11SMT_20240901T184059",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0084170000000000009,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.10127258,
                "meansolarazimuth": 165.16853333,
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
                "objectid": 12508375,
                "acquisitiondate": 1699554961000,
                "cloudcover": 1.9324070199999999,
                "name": "S2A_MSIL2A_20231109T183601_N0509_R027_T11SMT_20231109T221524",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.006268000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 52.101268769999997,
                "meansolarazimuth": 165.16854857999999,
                "category": 1,
                "nodatapixelpercentage": 0.0018050000000000002
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
                "objectid": 40815503,
                "acquisitiondate": 1699986989000,
                "cloudcover": 0.087873000000000007,
                "name": "S2B_MSIL2A_20231114T183629_N0510_R027_T11SMT_20241112T055837",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0036030000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.459072110000001,
                "meansolarazimuth": 165.37080383,
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
                "objectid": 17211558,
                "acquisitiondate": 1699986989000,
                "cloudcover": 0.088594000000000006,
                "name": "S2B_MSIL2A_20231114T183629_N0509_R027_T11SMT_20231114T221429",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0039300000000000003,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 53.459072110000001,
                "meansolarazimuth": 165.37080383,
                "category": 1,
                "nodatapixelpercentage": 0.045972000000000006
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
                "objectid": 41090579,
                "acquisitiondate": 1700419011000,
                "cloudcover": 12.02590942,
                "name": "S2A_MSIL2A_20231119T183651_N0510_R027_T11SMT_20241113T021907",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.00643,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 54.707347870000007,
                "meansolarazimuth": 165.418396,
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
                "objectid": 13733162,
                "acquisitiondate": 1700419011000,
                "cloudcover": 11.995516779999999,
                "name": "S2A_MSIL2A_20231119T183651_N0509_R027_T11SMT_20231119T233358",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0063309999999999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 54.707347870000007,
                "meansolarazimuth": 165.418396,
                "category": 1,
                "nodatapixelpercentage": 0.0011510000000000001
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
                "objectid": 41788262,
                "acquisitiondate": 1700851029000,
                "cloudcover": 46.135379790000002,
                "name": "S2B_MSIL2A_20231124T183709_N0510_R027_T11SMT_20241109T164304",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.005182,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 55.827938080000003,
                "meansolarazimuth": 165.34205627,
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
                "objectid": 35888057,
                "acquisitiondate": 1700851029000,
                "cloudcover": 46.140495299999998,
                "name": "S2B_MSIL2A_20231124T183709_N0509_R027_T11SMT_20231124T221218",
                "month": 11,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0058690000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 55.827938080000003,
                "meansolarazimuth": 165.34205627,
                "category": 1,
                "nodatapixelpercentage": 2.3e-05
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
                "objectid": 14895444,
                "acquisitiondate": 1701283041000,
                "cloudcover": 55.259025569999999,
                "name": "S2A_MSIL2A_20231129T183721_N0509_R027_T11SMT_20231129T231322",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0032420000000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 56.811302189999999,
                "meansolarazimuth": 165.13711548000001,
                "category": 1,
                "nodatapixelpercentage": 0.00039500000000000006
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
                "objectid": 41226002,
                "acquisitiondate": 1701283041000,
                "cloudcover": 55.240596769999996,
                "name": "S2A_MSIL2A_20231129T183721_N0510_R027_T11SMT_20241110T231323",
                "month": 11,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.0033609999999999998,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 56.811302189999999,
                "meansolarazimuth": 165.13711548000001,
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
        },
        {
            "attributes": {
                "objectid": 27361867,
                "acquisitiondate": 1702579079000,
                "cloudcover": 2.19165206,
                "name": "S2B_MSIL2A_20231214T183759_N0510_R027_T11SMT_20231219T215828",
                "month": 12,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.0060750000000000005,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 58.809570309999998,
                "meansolarazimuth": 163.96212768999999,
                "category": 1,
                "nodatapixelpercentage": 0.0039420000000000002
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
                "objectid": 19768427,
                "acquisitiondate": 1703011081000,
                "cloudcover": 91.87474060000001,
                "name": "S2A_MSIL2A_20231219T183801_N0510_R027_T11SMT_20231222T002016",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.00075599999999999994,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.138015750000001,
                "meansolarazimuth": 163.37593079000001,
                "category": 1,
                "nodatapixelpercentage": 0.000116
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
                "objectid": 19009877,
                "acquisitiondate": 1703443089000,
                "cloudcover": 14.25028706,
                "name": "S2B_MSIL2A_20231224T183809_N0510_R027_T11SMT_20231224T221833",
                "month": 12,
                "platform": "Sentinel-2B",
                "instrument": "MSI",
                "snowicepercentage": 0.19277699000000001,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.277084350000003,
                "meansolarazimuth": 162.75775146000001,
                "category": 1,
                "nodatapixelpercentage": 0.00034500000000000004
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
                "objectid": 26770451,
                "acquisitiondate": 1703875081000,
                "cloudcover": 96.505996699999997,
                "name": "S2A_MSIL2A_20231229T183801_N0510_R027_T11SMT_20231229T233917",
                "month": 12,
                "platform": "Sentinel-2A",
                "instrument": "MSI",
                "snowicepercentage": 0.00020600000000000002,
                "productname": "S2MSI2A",
                "relativeorbit": 27,
                "meansolarzenith": 59.241840359999998,
                "meansolarazimuth": 162.04534912,
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