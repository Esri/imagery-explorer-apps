/**
 * Item ID of the World Imagery basemap layer used in the application.
 */
export const WORLD_IMAGERY_BASEMAP_LAYER_ITEM_ID =
    '10df2279f9684e4a9f6a7f08febac2a9';

/**
 * URL of the World Imagery service layer used in the application.
 */
export const WORLD_IMAGERY_SERVICE_URL = `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer`;

/**
 * Field names of the World Imagery metadata
 */
export enum WORLD_IMAGERY_METADATA_FIELDS {
    OBJECTID = 'OBJECTID',
    // SRC_DATE is in UNIX timestamp format
    SRC_DATE2 = 'SRC_DATE2',
    /**
     * SRC_RES is the spatial resolution of the imagery in meters. For example, a value of 0.3 means the imagery has a spatial resolution of 30cm.
     */
    SRC_RES = 'SRC_RES',
    /**
     * Describes the provider of the imagery, e.g. Vantor
     */
    NICE_DESC = 'NICE_DESC',
    /**
     * Sample accuracy of the imagery in meters. For example, a value of 5 means the imagery has a positional accuracy of 5 meters.
     */
    SRC_ACC = 'SRC_ACC',
}

export const WORLD_IMAGERY_SERVICE_SUB_LAYERS: {
    /**
     * ID of the World Imagery sub-layer for labels.
     */
    id: number;
    /**
     * Minimum scale of the visible range for the World Imagery sub-layer
     */
    minScale: number;
    /**
     * Maximum scale of the visible range for the World Imagery sub-layer
     */
    maxScale: number;
    /**
     * Additional properties
     */
    [key: string]: any;
}[] = [
    // {
    //   "id": 0,
    //   "name": "World Imagery",
    //   "minScale": 0,
    //   "maxScale": 0,
    //   "type": "Feature Layer",
    //   "geometryType": "esriGeometryPolygon",
    //   "supportsDynamicLegends": true
    // },
    // {
    //   "id": 1,
    //   "name": "Low Resolution 15m Imagery",
    //   "minScale": 0,
    //   "maxScale": 0,
    //   "type": "Feature Layer",
    //   "geometryType": "esriGeometryPolygon",
    //   "supportsDynamicLegends": true
    // },
    // {
    //   "id": 2,
    //   "name": "High Resolution 60cm Imagery",
    //   "minScale": 0,
    //   "maxScale": 0,
    //   "type": "Feature Layer",
    //   "geometryType": "esriGeometryPolygon",
    //   "supportsDynamicLegends": true
    // },
    // {
    //   "id": 3,
    //   "name": "High Resolution 30cm Imagery",
    //   "minScale": 0,
    //   "maxScale": 0,
    //   "type": "Feature Layer",
    //   "geometryType": "esriGeometryPolygon",
    //   "supportsDynamicLegends": true
    // },
    // {
    //   "id": 4,
    //   "name": "Citations",
    //   "minScale": 0,
    //   "maxScale": 0,
    //   "type": "Feature Layer",
    //   "geometryType": "esriGeometryPolygon",
    //   "supportsDynamicLegends": true
    // },
    {
        id: 5,
        name: '1.9cm Resolution Metadata',
        minScale: 106,
        maxScale: 0,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 6,
        name: '3.7cm Resolution Metadata',
        minScale: 212,
        maxScale: 106,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 7,
        name: '7.5cm Resolution Metadata',
        minScale: 425,
        maxScale: 212,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 8,
        name: '15cm Resolution Metadata',
        minScale: 850,
        maxScale: 425,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 9,
        name: '30cm Resolution Metadata',
        minScale: 1700,
        maxScale: 850,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 10,
        name: '60cm Resolution Metadata',
        minScale: 3400,
        maxScale: 1700,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 11,
        name: '1.2m Resolution Metadata',
        minScale: 6800,
        maxScale: 3400,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 12,
        name: '2.4m Resolution Metadata',
        minScale: 13500,
        maxScale: 6800,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 13,
        name: '4.8m Resolution Metadata',
        minScale: 27000,
        maxScale: 13500,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 14,
        name: '9.6m Resolution Metadata',
        minScale: 54000,
        maxScale: 27000,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 15,
        name: '19m Resolution Metadata',
        minScale: 108000,
        maxScale: 54000,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 16,
        name: '38m Resolution Metadata',
        minScale: 216000,
        maxScale: 108000,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 17,
        name: '75m Resolution Metadata',
        minScale: 432000,
        maxScale: 216000,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
    {
        id: 18,
        name: '150m Resolution Metadata',
        minScale: Infinity,
        maxScale: 432000,
        type: 'Feature Layer',
        geometryType: 'esriGeometryPolygon',
        supportsDynamicLegends: true,
    },
];
