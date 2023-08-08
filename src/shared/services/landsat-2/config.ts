import { TIER } from '@shared/constants';

/**
 * Landsat 8 and 9 multispectral and multitemporal atmospherically corrected imagery with on-the-fly renderings and indices for visualization and analysis.
 * @see https://www.arcgis.com/home/item.html?id=bd6b545b95654d91a0b7faf7b5e010f5
 */
export const LANDSAT_LEVEL_2_ITEM_ID = `bd6b545b95654d91a0b7faf7b5e010f5`;

export const LANDSAT_LEVEL_2_SERVICE_URL_PROD = `https://utility.arcgis.com/usrsvcs/servers/a73d9143b9d24ebf98278cca4bf2474e/rest/services/LandsatC2L2/ImageServer`;

// export const LANDSAT_LEVEL_2_SERVICE_URL_DEV = `https://landsatdev.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer`;
export const LANDSAT_LEVEL_2_SERVICE_URL_DEV = `https://utility.arcgis.com/usrsvcs/servers/fef56b39300841aaaf35ead6244b8bf7/rest/services/LandsatC2L2/ImageServer`;

/**
 * A proxy imagery service which has embedded credential that points to the actual Landsat Level-2 imagery service
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer
 */
export const LANDSAT_LEVEL_2_SERVICE_URL =
    TIER === 'development'
        ? LANDSAT_LEVEL_2_SERVICE_URL_DEV
        : LANDSAT_LEVEL_2_SERVICE_URL_PROD;

/**
 * Field Names Look-up table for LandsatC2L2 (ImageServer)
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer
 */
export const FIELD_NAMES = {
    OBJECTID: 'objectid',
    NAME: 'name',
    MINPS: 'minps',
    MAXPS: 'maxps',
    LOWPS: 'lowps',
    HIGHPS: 'highps',
    CATEGORY: 'category',
    PRODUCT_NAME: 'productname',
    BEST: 'best',
    /**
     * The Landsat product identifier includes the Collection processing levels, processing date,
     * collection number, and collection tier category: `LXSS_LLLL_PPPRRR_YYYYMMDD_yyyymmdd_CC_TX`
     *
     * Where:
     * - L = Landsat
     * - X = Sensor (“C”=OLI/TIRS combined, “O”=OLI-only, “T”=TIRS-only, “E”=ETM+, “T”=“TM, “M”=MSS)
     * - SS = Satellite (”07”=Landsat 7, “08”=Landsat 8)
     * - LLL = Processing correction level (L1TP/L1GT/L1GS)
     * - PPP = WRS path
     * - RRR = WRS row
     * - YYYYMMDD = Acquisition year, month, day
     * - yyyymmdd - Processing year, month, day
     * - CC = Collection number (01, 02, …)
     * - TX = Collection category (“RT”=Real-Time, “T1”=Tier 1, “T2”=Tier 2)
     *
     * @example LC08_L1GT_029030_20151209_20160131_01_RT
     * @see https://www.usgs.gov/faqs/what-naming-convention-landsat-collections-level-1-scenes
     */
    LANDSAT_PRODUCT_ID: 'landsat_product_id',
    PRODUCT_ID_L1: 'product_id_l1',
    CLOUD_COVER: 'cloudcover',
    ACQUISITION_DATE: 'acquisitiondate',
    SUNAZIMUTH: 'sunazimuth',
    SUNELEVATION: 'sunelevation',
    SENSORNAME: 'sensorname',
    WRS_PATH: 'wrs_path',
    WRS_ROW: 'wrs_row',
    PR: 'pr',
    DAYOFYEAR: 'dayofyear',
    MONTH: 'month',
    DATASET_ID: 'dataset_id',
    SHAPE: 'shape',
    LANDSAT_SCENE_ID: 'landsat_scene_id',
};

/**
 * Landsat-2 Raster Function Infos
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer/rasterFunctionInfos
 */
export const LANDSAT_RASTER_FUNCTION_INFOS = [
    {
        name: 'Natural Color with DRA',
        description:
            'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied on apparent reflectance.',
        label: 'Natural Color',
    },
    {
        name: 'Color Infrared with DRA',
        description:
            'Bands near-IR, red, green (5, 4, 3) with dynamic range adjustment applied on apparent reflectance. Healthy vegetation is bright red while stressed vegetation is dull red.',
        label: 'Color IR',
    },
    {
        name: 'NDVI Colorized',
        description:
            'Normalized difference vegetation index (NDVI) with color map. Dark green is thick vigorous vegetation and brown represents sparse vegetation.',
        label: 'NDVI Colorized',
    },
    {
        name: 'Agriculture with DRA',
        description:
            'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied on apparent reflectance. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
        label: 'Agriculture',
    },
    {
        name: 'Bathymetric with DRA',
        description:
            'Bands red, green, coastal/aerosol (4, 3, 1) with dynamic range adjustment applied on apparent reflectance. Useful in bathymetric mapping applications.',
        label: 'Bathymetric',
    },
    {
        name: 'Geology with DRA',
        description:
            'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
        label: 'Geology',
    },
    {
        name: 'Short-wave Infrared with DRA',
        description:
            'Bands shortwave IR-2, shortwave IR-1, red (7, 6, 4) with dynamic range adjustment applied on apparent reflectance.',
        label: 'Short-wave IR',
    },
    {
        name: 'Landsat8_TIRS1_Temperature_Celcius',
        description: 'Landsat8 TIRS1 temperature values in Celcius',
        label: 'Temp Celcius',
    },
    {
        name: 'Landsat8_TIRS1_Temperature_Farhenheit',
        description: 'Landsat8 TIRS1 temperature values in Farhenheit',
        label: 'Temp Farhenheit',
    },
    {
        name: 'Short-wave Infrared',
        description:
            'Bands shortwave infrared2, shortwave infrared1, red (7, 6, 4) with fixed stretched applied on apparent reflectance.',
        label: 'Short-wave IR',
    },
    {
        name: 'Color Infrared',
        description:
            'Bands near-IR, red, green (5, 4, 3) with fixed stretch applied on apparent reflectance. Healthy vegetation is bright red while stressed vegetation is dull red.',
        label: 'Color IR',
    },
    {
        name: 'Geology with DRA',
        description:
            'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
        label: '',
    },
    {
        name: 'Natural Color',
        description:
            'Natural Color bands red, green, blue(4, 3, 2) displayed with fixed stretch applied on apparent reflectance.',
        label: '',
    },
    {
        name: 'Geology',
        description:
            'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
        label: '',
    },
    {
        name: 'Bathymetric',
        description:
            'Bands red, green, coastal/aerosol (4, 3, 1) with fixed stretch applied on apparent reflectance. Useful in bathymetric mapping applications.',
        label: '',
    },
    {
        name: 'Agriculture',
        description:
            'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with fixed stretch applied on apparent reflectance. Vigorous vegetation is bright green, stressed vegetation dull green and bare areas as brown.',
        label: '',
    },
    {
        name: 'NDVI Raw',
        description:
            'Normalized difference vegetation index (NDVI) computed as (b5 - b4) / (b5 + b4) on apparent reflectance.',
        label: 'NDVI',
    },
    {
        name: 'QABand',
        description: 'A raster function template.',
        label: '',
    },
    {
        name: 'None',
        description: '',
        label: '',
    },
];
