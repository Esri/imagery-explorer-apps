export const mockedSentinel2LandcoverRasterAttributeTableResponse = {
    "objectIdFieldName": "OBJECTID",
    "fields": [
        {
            "name": "OBJECTID",
            "type": "esriFieldTypeOID",
            "alias": "OBJECTID",
            "domain": null
        },
        {
            "name": "Value",
            "type": "esriFieldTypeInteger",
            "alias": "Value",
            "domain": null
        },
        {
            "name": "ClassName",
            "type": "esriFieldTypeString",
            "alias": "ClassName",
            "domain": null,
            "length": 32
        },
        {
            "name": "Red",
            "type": "esriFieldTypeSmallInteger",
            "alias": "Red",
            "domain": null
        },
        {
            "name": "Green",
            "type": "esriFieldTypeSmallInteger",
            "alias": "Green",
            "domain": null
        },
        {
            "name": "Blue",
            "type": "esriFieldTypeSmallInteger",
            "alias": "Blue",
            "domain": null
        },
        {
            "name": "UlcPopupText",
            "type": "esriFieldTypeString",
            "alias": "ULC Popup Text",
            "domain": null,
            "length": 32
        },
        {
            "name": "PopupText",
            "type": "esriFieldTypeString",
            "alias": "Popup Text",
            "domain": null,
            "length": 32
        },
        {
            "name": "Description",
            "type": "esriFieldTypeString",
            "alias": "Description",
            "domain": null,
            "length": 1024
        },
        {
            "name": "Examples",
            "type": "esriFieldTypeString",
            "alias": "Examples",
            "domain": null,
            "length": 1024
        }
    ],
    "features": [
        {
            "attributes": {
                "OBJECTID": 2,
                "Value": 1,
                "ClassName": "Water",
                "Red": 26,
                "Green": 91,
                "Blue": 171,
                "UlcPopupText": "Water",
                "PopupText": "water",
                "Description": "Areas where water was predominantly present throughout the year; may not cover areas with sporadic or ephemeral water; contains little to no sparse vegetation, no rock outcrop nor built up features like docks.",
                "Examples": "Rivers, ponds, lakes, oceans, flooded salt plains."
            }
        },
        {
            "attributes": {
                "OBJECTID": 3,
                "Value": 2,
                "ClassName": "Trees",
                "Red": 53,
                "Green": 130,
                "Blue": 33,
                "UlcPopupText": "Trees",
                "PopupText": "trees",
                "Description": "Any significant clustering of tall (~15-m or higher) dense vegetation, typically with a closed or dense canopy.",
                "Examples": "Wooded vegetation,  clusters of dense tall vegetation within savannas, plantations, swamp or mangroves (dense/tall vegetation with ephemeral water or canopy too thick to detect water underneath)."
            }
        },
        {
            "attributes": {
                "OBJECTID": 5,
                "Value": 4,
                "ClassName": "Flooded Vegetation",
                "Red": 135,
                "Green": 209,
                "Blue": 158,
                "UlcPopupText": "Flooded Vegetation",
                "PopupText": "flooded vegetation",
                "Description": "Areas of any type of vegetation with obvious intermixing of water throughout a majority of the year; seasonally flooded area that is a mix of grass/shrub/trees/bare ground.",
                "Examples": "Flooded mangroves, emergent vegetation, rice paddies and other heavily irrigated and inundated agriculture."
            }
        },
        {
            "attributes": {
                "OBJECTID": 6,
                "Value": 5,
                "ClassName": "Crops",
                "Red": 255,
                "Green": 219,
                "Blue": 92,
                "UlcPopupText": "Crops",
                "PopupText": "crops",
                "Description": "Human planted/plotted cereals, grasses, and crops not at tree height.",
                "Examples": "Corn, wheat, soy, fallow plots of structured land."
            }
        },
        {
            "attributes": {
                "OBJECTID": 8,
                "Value": 7,
                "ClassName": "Built Area",
                "Red": 237,
                "Green": 2,
                "Blue": 42,
                "UlcPopupText": "Built Area",
                "PopupText": "built area",
                "Description": "Human made structures; major road and rail networks; large homogenous impervious surfaces including parking structures, office buildings and residential housing.",
                "Examples": "Houses, dense villages / towns / cities, paved roads, asphalt."
            }
        },
        {
            "attributes": {
                "OBJECTID": 9,
                "Value": 8,
                "ClassName": "Bare Ground",
                "Red": 237,
                "Green": 233,
                "Blue": 228,
                "UlcPopupText": "Bare Ground",
                "PopupText": "bare ground",
                "Description": "Areas of rock or soil with very sparse to no vegetation for the entire year; large areas of sand and deserts with no to little vegetation.",
                "Examples": "Exposed rock or soil, desert and sand dunes, dry salt flats/pans, dried lake beds, mines."
            }
        },
        {
            "attributes": {
                "OBJECTID": 10,
                "Value": 9,
                "ClassName": "Snow/Ice",
                "Red": 242,
                "Green": 250,
                "Blue": 255,
                "UlcPopupText": "Snow and Ice",
                "PopupText": "snow and ice",
                "Description": "Large homogenous areas of permanent snow or ice, typically only in mountain areas or highest latitudes.",
                "Examples": "Glaciers, permanent snowpack, snow fields."
            }
        },
        {
            "attributes": {
                "OBJECTID": 11,
                "Value": 10,
                "ClassName": "Clouds",
                "Red": 200,
                "Green": 200,
                "Blue": 200,
                "UlcPopupText": "Clouds",
                "PopupText": "clouds",
                "Description": "No land cover information due to persistent cloud cover.",
                "Examples": ""
            }
        },
        {
            "attributes": {
                "OBJECTID": 12,
                "Value": 11,
                "ClassName": "Rangeland",
                "Red": 239,
                "Green": 207,
                "Blue": 168,
                "UlcPopupText": "Rangeland",
                "PopupText": "rangeland",
                "Description": "Open areas covered in homogenous grasses with little to no taller vegetation; wild cereals and grasses, Mix of small clusters of plants or single plants dispersed on a landscape that shows exposed soil or rock; scrub-filled clearings within forests that are clearly not taller than trees.",
                "Examples": "Natural meadows and fields with sparse to no tree cover, open savanna with few to no trees, parks/golf courses/lawns, pastures, moderate to sparse cover of bushes, shrubs and tufts of grass, savannas with very sparse grasses, trees or other plants."
            }
        },
        {
            "attributes": {
                "OBJECTID": 13,
                "Value": 0,
                "ClassName": "No Data",
                "Red": 255,
                "Green": 255,
                "Blue": 255,
                "UlcPopupText": "No Data",
                "PopupText": "no data",
                "Description": "no data",
                "Examples": "no data"
            }
        }
    ]
}

export const mockedSentinel2LandcoverServiceJSONResponse = {
    "currentVersion": 11.0,
    "serviceDescription": "Sentinel-2 10m land cover time series of the world. Produced by Impact Observatory, Microsoft, and Esri.",
    "name": "Sentinel2_10m_LandCover",
    "description": "Sentinel-2 10m land cover time series of the world. Produced by Impact Observatory, Microsoft, and Esri.",
    "extent": {
        "xmin": -2.00375070672E7,
        "ymin": -1.5547304298299924E7,
        "xmax": 2.0037507842788246E7,
        "ymax": 1.8841995701700002E7,
        "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
        }
    },
    "initialExtent": {
        "xmin": -2.00375070672E7,
        "ymin": -1.5547304298299924E7,
        "xmax": 2.0037507842788246E7,
        "ymax": 1.8841995701700002E7,
        "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
        }
    },
    "fullExtent": {
        "xmin": -2.00375070672E7,
        "ymin": -1.5547304298299924E7,
        "xmax": 2.0037507842788246E7,
        "ymax": 1.8841995701700002E7,
        "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
        }
    },
    "sortableFields": "",
    "bandCount": 1,
    "pixelType": "U8",
    "minValues": [
        0
    ],
    "maxValues": [
        11
    ],
    "meanValues": [
        7.281947135864333
    ],
    "stdvValues": [
        3.6240001343670425
    ],
    "hasMultidimensions": false,
    "timeInfo": {
        "startTimeField": "StartDate",
        "endTimeField": "EndDate",
        "timeExtent": [
            1483228800000,
            1735689599000
        ],
        "timeReference": null
    },
    "pixelSizeX": 9.999998729879174,
    "pixelSizeY": 9.999999999999979,
    "datasetFormat": "AMD",
    "uncompressedSize": 13781518852860,
    "blockWidth": 2048,
    "blockHeight": 256,
    "compressionType": "None",
    "bandNames": [
        "Band_1"
    ],
    "allowCopy": false,
    "allowAnalysis": true,
    "minPixelSize": 0,
    "maxPixelSize": 0,
    "copyrightText": "Impact Observatory, Microsoft, and Esri.",
    "serviceDataType": "esriImageServiceDataTypeThematic",
    "serviceSourceType": "esriImageServiceSourceTypeMosaicDataset",
    "objectIdField": "OBJECTID",
    "fields": [
        {
            "name": "OBJECTID",
            "type": "esriFieldTypeOID",
            "alias": "OBJECTID",
            "domain": null
        },
        {
            "name": "Shape",
            "type": "esriFieldTypeGeometry",
            "alias": "Shape",
            "domain": null
        },
        {
            "name": "Name",
            "type": "esriFieldTypeString",
            "alias": "Name",
            "domain": null,
            "length": 200
        },
        {
            "name": "MinPS",
            "type": "esriFieldTypeDouble",
            "alias": "MinPS",
            "domain": null
        },
        {
            "name": "MaxPS",
            "type": "esriFieldTypeDouble",
            "alias": "MaxPS",
            "domain": null
        },
        {
            "name": "LowPS",
            "type": "esriFieldTypeDouble",
            "alias": "LowPS",
            "domain": null
        },
        {
            "name": "HighPS",
            "type": "esriFieldTypeDouble",
            "alias": "HighPS",
            "domain": null
        },
        {
            "name": "Category",
            "type": "esriFieldTypeInteger",
            "alias": "Category",
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
            "name": "Tag",
            "type": "esriFieldTypeString",
            "alias": "Tag",
            "domain": null,
            "length": 100
        },
        {
            "name": "GroupName",
            "type": "esriFieldTypeString",
            "alias": "GroupName",
            "domain": null,
            "length": 100
        },
        {
            "name": "ProductName",
            "type": "esriFieldTypeString",
            "alias": "ProductName",
            "domain": null,
            "length": 100
        },
        {
            "name": "CenterX",
            "type": "esriFieldTypeDouble",
            "alias": "CenterX",
            "domain": null
        },
        {
            "name": "CenterY",
            "type": "esriFieldTypeDouble",
            "alias": "CenterY",
            "domain": null
        },
        {
            "name": "ZOrder",
            "type": "esriFieldTypeInteger",
            "alias": "ZOrder",
            "domain": null
        },
        {
            "name": "Shape_Length",
            "type": "esriFieldTypeDouble",
            "alias": "Shape_Length",
            "domain": null
        },
        {
            "name": "Shape_Area",
            "type": "esriFieldTypeDouble",
            "alias": "Shape_Area",
            "domain": null
        },
        {
            "name": "Dataset_ID",
            "type": "esriFieldTypeString",
            "alias": "Dataset_ID",
            "domain": null,
            "length": 50
        },
        {
            "name": "Year",
            "type": "esriFieldTypeSmallInteger",
            "alias": "Year",
            "domain": null
        },
        {
            "name": "StartDate",
            "type": "esriFieldTypeDate",
            "alias": "StartDate",
            "domain": null,
            "length": 8
        },
        {
            "name": "EndDate",
            "type": "esriFieldTypeDate",
            "alias": "EndDate",
            "domain": null,
            "length": 8
        }
    ],
    "capabilities": "Image,Metadata,Catalog,Mensuration",
    "defaultMosaicMethod": "ByAttribute",
    "allowedMosaicMethods": "ByAttribute,NorthWest,Center,LockRaster,Nadir,Viewpoint,None",
    "sortField": "Year",
    "sortValue": "2050",
    "sortAscending": true,
    "mosaicOperator": "First",
    "maxDownloadSizeLimit": 2048,
    "defaultCompressionQuality": 85,
    "defaultResamplingMethod": "Nearest",
    "maxImageHeight": 10000,
    "maxImageWidth": 10000,
    "maxRecordCount": 1000,
    "maxDownloadImageCount": 20,
    "maxMosaicImageCount": 20,
    "allowRasterFunction": true,
    "rasterFunctionInfos": [
        {
            "name": "Cartographic Renderer for Visualization and Analysis",
            "description": "Legend and attribute table for Sentinel 2 10m Land Cover.",
            "help": ""
        },
        {
            "name": "None",
            "description": "Make a Raster or Raster Dataset into a Function Raster Dataset.",
            "help": ""
        },
        {
            "name": "Isolate Bare Ground Areas for Visualization and Analysis",
            "description": "Shows only areas of bare ground(class 8).",
            "help": ""
        },
        {
            "name": "Isolate Built Areas for Visualization and Analysis",
            "description": "Shows only built areas (class 7).",
            "help": ""
        },
        {
            "name": "Isolate Clouds for Visualization and Analysis",
            "description": "Shows only Clouds(class 10)",
            "help": ""
        },
        {
            "name": "Isolate Converted Lands for Visualization and Analysis",
            "description": "Shows only built areas and crops (class 5 and 7).",
            "help": ""
        },
        {
            "name": "Isolate Crops for Visualization and Analysis",
            "description": "Shows only Croplands(class 5)",
            "help": ""
        },
        {
            "name": "Isolate Flooded Vegeation Areas for Visualization and Analysis",
            "description": "Shows only areas of flooded vegetation (class 4).",
            "help": ""
        },
        {
            "name": "Isolate Rangelands Areas for Visualization and Analysis",
            "description": "Shows only rangeland areas (class 11).",
            "help": ""
        },
        {
            "name": "Isolate Snow or Ice for Visualization and Analysis",
            "description": "Shows only areas of snow or ice (class 9).",
            "help": ""
        },
        {
            "name": "Isolate Trees for Visualization and Analysis",
            "description": "Shows only areas of trees (class 2).",
            "help": ""
        },
        {
            "name": "Isolate Water Areas for Visualization and Analysis",
            "description": "Shows only water areas (class 1).",
            "help": ""
        }
    ],
    "rasterTypeInfos": [
        {
            "name": "Raster Dataset",
            "description": "Supports all ArcGIS Raster Datasets",
            "help": ""
        }
    ],
    "mensurationCapabilities": "",
    "hasHistograms": true,
    "hasColormap": false,
    "hasRasterAttributeTable": false,
    "minScale": 0,
    "maxScale": 0,
    "exportTilesAllowed": false,
    "supportsStatistics": true,
    "supportsAdvancedQueries": true,
    "editFieldsInfo": null,
    "ownershipBasedAccessControlForRasters": null,
    "allowComputeTiePoints": false,
    "useStandardizedQueries": true,
    "advancedQueryCapabilities": {
        "useStandardizedQueries": true,
        "supportsStatistics": true,
        "supportsOrderBy": true,
        "supportsDistinct": true,
        "supportsPagination": true
    },
    "spatialReference": {
        "wkid": 102100,
        "latestWkid": 3857
    }
}

export const mockedSentinel2LandcoverComputeHistogramResponse = {
    "histograms": [
        {
            "size": 12,
            "min": -0.5,
            "max": 11.5,
            "counts": [
                0,
                50,
                100,
                0,
                100,
                250,
                0,
                500,
                1,
                0,
                0,
                1000
            ]
        }
    ]
}

export const mockedSentinel2IdentifyResponse = {
    "objectId": 0,
    "name": "Pixel",
    "value": "2",
    "location": {
        "x": -13017317.071678244,
        "y": 4039491.0779388938,
        "spatialReference": {
            "wkid": 102100,
            "latestWkid": 3857
        }
    },
    "properties": null,
    "catalogItems": null,
    "catalogItemVisibilities": []
}