import { TIER } from '@shared/constants';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';

/**
 * Landsat 8 and 9 multispectral and multitemporal atmospherically corrected imagery with on-the-fly renderings and indices for visualization and analysis.
 * @see https://www.arcgis.com/home/item.html?id=bd6b545b95654d91a0b7faf7b5e010f5
 */
export const LANDSAT_LEVEL_2_ITEM_ID = `bd6b545b95654d91a0b7faf7b5e010f5`;

export const LANDSAT_LEVEL_2_ITEM_URL = `https://www.arcgis.com/home/item.html?id=${LANDSAT_LEVEL_2_ITEM_ID}`;

export const LANDSAT_LEVEL_2_SERVICE_URL_PROD = `https://utility.arcgis.com/usrsvcs/servers/125204cf060644659af558f4f6719b0f/rest/services/LandsatC2L2/ImageServer`;

/**
 * A proxy item for Landsat Level-2 dev service
 * @see https://www.arcgis.com/home/item.html?id=f89d8adb0d5141a7a5820e8a6375480e
 */
export const LANDSAT_LEVEL_2_SERVICE_URL_DEV = `https://utility.arcgis.com/usrsvcs/servers/f89d8adb0d5141a7a5820e8a6375480e/rest/services/LandsatC2L2/ImageServer`;

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
 * List of Raster Functions for the Landsat Level-2 service
 */
const LANDSAT_RASTER_FUNCTIONS = [
    'Natural Color with DRA',
    'Color Infrared with DRA',
    'NDVI Colorized',
    'Agriculture with DRA',
    'Bathymetric with DRA',
    'Geology with DRA',
    'Short-wave Infrared with DRA',
    'Surface Temperature Colorized (Fahrenheit)',
    'Surface Temperature Colorized (Celsius)',
    'MNDWI Colorized',
    'Short-wave Infrared',
    'Color Infrared',
    'Geology with DRA',
    'Natural Color',
    'Geology',
    'Bathymetric',
    'Agriculture',
    'NDVI Raw',
    'QABand',
    'None',
] as const;

export type LandsatRasterFunctionName =
    (typeof LANDSAT_RASTER_FUNCTIONS)[number];

/**
 * Landsat-2 Raster Function Infos
 * @see https://utility.arcgis.com/usrsvcs/servers/fef56b39300841aaaf35ead6244b8bf7/rest/services/LandsatC2L2/ImageServer/rasterFunctionInfos/?f=json
 */
export const LANDSAT_RASTER_FUNCTION_INFOS: {
    name: LandsatRasterFunctionName;
    description: string;
    label: string;
}[] = [
    {
        name: 'Natural Color with DRA',
        description:
            'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied dynamic range adjustment applied.',
        label: 'Natural Color',
    },
    {
        name: 'Color Infrared with DRA',
        description:
            'Bands near-IR, red, green (5, 4, 3) with dynamic range adjustment applied dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
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
            'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied dynamic range adjustment applied. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
        label: 'Agriculture',
    },
    {
        name: 'Bathymetric with DRA',
        description:
            'Bands red, green, coastal/aerosol (4, 3, 1) with dynamic range adjustment applied dynamic range adjustment applied. Useful in bathymetric mapping applications.',
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
            'Bands shortwave IR-2, shortwave IR-1, red (7, 6, 4) with dynamic range adjustment applied dynamic range adjustment applied.',
        label: 'Short-wave IR',
    },
    {
        name: 'Surface Temperature Colorized (Fahrenheit)',
        description: 'Colorized surface temperature',
        label: 'Surface Temp',
    },
    {
        name: 'MNDWI Colorized',
        description:
            'Modified Normalized Difference Water Index with color map computed as (b3 - b6) / (b3 + b6).',
        label: 'MNDWI',
    },
    {
        name: 'Surface Temperature Colorized (Celsius)',
        description: 'Landsat8 TIRS1 temperature values in Celcius',
        label: 'Surface Temp Celcius',
    },
    {
        name: 'Short-wave Infrared',
        description:
            'Bands shortwave infrared2, shortwave infrared1, red (7, 6, 4) with fixed stretched applied dynamic range adjustment applied.',
        label: 'Short-wave IR',
    },
    {
        name: 'Color Infrared',
        description:
            'Bands near-IR, red, green (5, 4, 3) with fixed stretch applied dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
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
            'Natural Color bands red, green, blue(4, 3, 2) displayed with fixed stretch applied dynamic range adjustment applied.',
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
            'Bands red, green, coastal/aerosol (4, 3, 1) with fixed stretch applied dynamic range adjustment applied. Useful in bathymetric mapping applications.',
        label: '',
    },
    {
        name: 'Agriculture',
        description:
            'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with fixed stretch applied dynamic range adjustment applied. Vigorous vegetation is bright green, stressed vegetation dull green and bare areas as brown.',
        label: '',
    },
    {
        name: 'NDVI Raw',
        description:
            'Normalized difference vegetation index (NDVI) computed as (b5 - b4) / (b5 + b4) dynamic range adjustment applied.',
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

/**
 * This section defines constants for Landsat surface temperature measurements in various units.
 *
 * The application's UI/UX need to exclude the outliers, requiring the use of custom
 * minimum and maximum values for Landsat Surface temperature within the app.
 *
 * The custom temperature range is applied in the following contexts:
 * - Y Scale of Surface Temperature Line in the Temporal Profile Chart
 * - Pixel range of the Mask Layer for Surface Temperature
 *
 * The minimum value of Landsat surface temperature is -30 degrees Celsius.
 */
export const LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS = -30;

/**
 * The maximum value of the Landsat surface temperature in celcius degree (100)
 */
export const LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS = 90;

/**
 * the minimum value converted to Farhenheit
 */
export const LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT = celsius2fahrenheit(
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS
);

/**
 * the maximum value converted to Farhenheit
 */
export const LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT = celsius2fahrenheit(
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS
);

/**
 * The Landsat Level-2 service includes imagery from Landsat missions 4, 5, 7, 8, and 9, with a time span of 1982 to present
 */
export const LANDSAT_MISSIONS = [4, 5, 7, 8, 9];
