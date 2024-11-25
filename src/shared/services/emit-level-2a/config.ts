/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { TIER } from '@shared/constants';
import { TIER, getServiceConfig } from '@shared/config';
import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';

const serviceConfig = getServiceConfig('landsat-level-2');
// console.log('landsat-level-2 service config', serviceConfig);
//
// const serviceUrls = {
//     development:
//         'https://utility.arcgis.com/usrsvcs/servers/f89d8adb0d5141a7a5820e8a6375480e/rest/services/LandsatC2L2/ImageServer',
//     production:
//         'https://utility.arcgis.com/usrsvcs/servers/125204cf060644659af558f4f6719b0f/rest/services/LandsatC2L2/ImageServer',
// };

/**
 * Landsat 8 and 9 multispectral and multitemporal atmospherically corrected imagery with on-the-fly renderings and indices for visualization and analysis.
 * @see https://wmugeography.maps.arcgis.com/home/item.html?id=811ed89d3e3948ae8ba92c9315976fd9
 */
export const EMIT_LEVEL_2a_ITEM_ID = `811ed89d3e3948ae8ba92c9315976fd9`;

/**
 * URL of the Landsat-Level-2 Item on ArcGIS Online
 */
export const EMIT_LEVEL_2a_ITEM_URL = `https://wmugeography.maps.arcgis.com/home/item.html?id=${EMIT_LEVEL_2a_ITEM_ID}`;

/**
 * This is the original service URL, which will prompt user to sign in by default as it requires subscription
 */
const EMIT_LEVEL_2a_ORIGINAL_SERVICE_URL =
    'https://www.esrs.wmich.edu/arcgis/rest/services/NASA_EMIT/EMIT_L2A_mosaic_ANS_AP_to_grid/ImageServer';

/**
 * Service URL to be used in PROD enviroment
 */
export const EMIT_LEVEL_2a_SERVICE_URL_PROD =
    serviceConfig.production || EMIT_LEVEL_2a_ORIGINAL_SERVICE_URL;

/**
 * Service URL to be used in DEV enviroment
 */
export const EMIT_LEVEL_2a_SERVICE_URL_DEV =
    serviceConfig.development || EMIT_LEVEL_2a_ORIGINAL_SERVICE_URL;

/**
 * A proxy imagery service which has embedded credential that points to the actual Landsat Level-2 imagery service
 * @see https://www.esrs.wmich.edu/arcgis/rest/services/NASA_EMIT/EMIT_L2A_mosaic_ANS_AP_to_grid/ImageServer
 */
export const EMIT_LEVEL_2a_SERVICE_URL =
    TIER === 'development'
        ? EMIT_LEVEL_2a_SERVICE_URL_DEV
        : EMIT_LEVEL_2a_SERVICE_URL_PROD;

/**
 * Field Names Look-up table for LandsatC2L2 (ImageServer)
 * @see https://www.esrs.wmich.edu/arcgis/rest/services/NASA_EMIT/EMIT_L2A_mosaic_ANS_AP_to_grid/ImageServer
 */
export const FIELD_NAMES = {
    OBJECTID: 'objectid',
    NAME: 'name',
    MINPS: 'minps',
    MAXPS: 'maxps',
    LOWPS: 'lowps',
    HIGHPS: 'highps',
    CATEGORY: 'category',
    PRODUCT_NAME: 'ProductName',
    BEST: 'best', // TO DO LIST
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
const EMIT_RASTER_FUNCTIONS = [
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
    'Urban with DRA',
    'NDMI Colorized',
    // 'Short-wave Infrared',
    // 'Color Infrared',
    // 'Geology with DRA',
    // 'Natural Color',
    // 'Geology',
    // 'Bathymetric',
    // 'Agriculture',
    // 'NDVI Raw',
    // 'QABand',
    // 'None',
] as const;

export type LandsatRasterFunctionName = (typeof EMIT_RASTER_FUNCTIONS)[number];

/**
 * Landsat-2 Raster Function Infos
 * @see https://utility.arcgis.com/usrsvcs/servers/fef56b39300841aaaf35ead6244b8bf7/rest/services/LandsatC2L2/ImageServer/rasterFunctionInfos/?f=json
 */
export const EMIT_RASTER_FUNCTION_INFOS: {
    name: LandsatRasterFunctionName;
    description: string;
    label: string;
}[] = [
    {
        name: 'Natural Color with DRA',
        description:
            'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
        label: 'Natural Color',
    },
    {
        name: 'Color Infrared with DRA',
        description:
            'Bands near-IR, red, green (5, 4, 3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
        label: 'Color IR',
    },
    {
        name: 'Short-wave Infrared with DRA',
        description:
            'Bands shortwave IR-2, shortwave IR-1, red (7, 6, 4) with dynamic range adjustment applied.',
        label: 'Short-wave IR',
    },
    {
        name: 'Agriculture with DRA',
        description:
            'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
        label: 'Agriculture',
    },
    {
        name: 'Bathymetric with DRA',
        description:
            'Bands red, green, coastal/aerosol (4, 3, 1) with dynamic range adjustment applied. Useful in bathymetric mapping applications.',
        label: 'Bathymetric',
    },
    {
        name: 'Urban with DRA',
        description:
            'Bands shortwave IR-2, shortwave IR-1, red (7, 6, 4) with dynamic range adjustment applied.',
        label: 'Urban',
    },
    {
        name: 'NDVI Colorized',
        description:
            'Normalized difference vegetation index (NDVI) with color map. Dark green is thick vigorous vegetation and brown represents sparse vegetation.',
        label: 'NDVI Colorized',
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
        name: 'NDMI Colorized',
        description:
            'Normalized Difference Moisture Index with color map computed as (b5 - b6) / (b5 + b6). Moist areas range from light green to dark blue.',
        label: 'NDMI',
    },
    {
        name: 'Geology with DRA',
        description:
            'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
        label: 'Geology',
    },
    // {
    //     name: 'Surface Temperature Colorized (Celsius)',
    //     description: 'Landsat8 TIRS1 temperature values in Celcius',
    //     label: 'Surface Temp Celcius',
    // },
    // {
    //     name: 'Short-wave Infrared',
    //     description:
    //         'Bands shortwave infrared2, shortwave infrared1, red (7, 6, 4) with fixed stretched applied dynamic range adjustment applied.',
    //     label: 'Short-wave IR',
    // },
    // {
    //     name: 'Color Infrared',
    //     description:
    //         'Bands near-IR, red, green (5, 4, 3) with fixed stretch applied dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
    //     label: 'Color IR',
    // },
    // {
    //     name: 'Geology with DRA',
    //     description:
    //         'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
    //     label: '',
    // },
    // {
    //     name: 'Natural Color',
    //     description:
    //         'Natural Color bands red, green, blue(4, 3, 2) displayed with fixed stretch applied dynamic range adjustment applied.',
    //     label: '',
    // },
    // {
    //     name: 'Geology',
    //     description:
    //         'The band combination (7,6,2) enables easier visualization and extraction of delineation of major structural features like thrust faults and folds, textural characteristics of igneous and sedimentary rocks, and for lithological and geological mapping like recognizing hydrothermal altered rocks, etc. Additionally, various band combinations like 4,3,2 ; 7,6,5; 7,5,2; 7,4,2 etc. can also be used to determine specific geological features.',
    //     label: '',
    // },
    // {
    //     name: 'Bathymetric',
    //     description:
    //         'Bands red, green, coastal/aerosol (4, 3, 1) with fixed stretch applied dynamic range adjustment applied. Useful in bathymetric mapping applications.',
    //     label: '',
    // },
    // {
    //     name: 'Agriculture',
    //     description:
    //         'Bands shortwave IR-1, near-IR, blue (6, 5, 2) with fixed stretch applied dynamic range adjustment applied. Vigorous vegetation is bright green, stressed vegetation dull green and bare areas as brown.',
    //     label: '',
    // },
    // {
    //     name: 'NDVI Raw',
    //     description:
    //         'Normalized difference vegetation index (NDVI) computed as (b5 - b4) / (b5 + b4) dynamic range adjustment applied.',
    //     label: 'NDVI',
    // },
    // {
    //     name: 'QABand',
    //     description: 'A raster function template.',
    //     label: '',
    // },
    // {
    //     name: 'None',
    //     description: '',
    //     label: '',
    // },
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
export const EMIT_SURFACE_TEMPERATURE_MIN_CELSIUS = -30;

/**
 * The maximum value of the Landsat surface temperature in celcius degree (100)
 */
export const EMIT_SURFACE_TEMPERATURE_MAX_CELSIUS = 90;

/**
 * the minimum value converted to Farhenheit
 */
export const EMIT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT = celsius2fahrenheit(
    EMIT_SURFACE_TEMPERATURE_MIN_CELSIUS
);

/**
 * the maximum value converted to Farhenheit
 */
export const EMIT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT = celsius2fahrenheit(
    EMIT_SURFACE_TEMPERATURE_MAX_CELSIUS
);

/**
 * The Landsat Level-2 service includes imagery from Landsat missions 4, 5, 7, 8, and 9, with a time span of 1982 to present
 */
export const EMIT_MISSIONS = [1];

/**
 * Name of Multispectral Bands of Landsat Level-2 service
 */
export const EMIT_BAND_NAMES = [
    'band001',
    'band002',
    'band003',
    'band004',
    'band005',
    'band006',
    'band007',
    'band008',
    'band009',
    'band010',
    'band011',
    'band012',
    'band013',
    'band014',
    'band015',
    'band016',
    'band017',
    'band018',
    'band019',
    'band020',
    'band021',
    'band022',
    'band023',
    'band024',
    'band025',
    'band026',
    'band027',
    'band028',
    'band029',
    'band030',
    'band031',
    'band032',
    'band033',
    'band034',
    'band035',
    'band036',
    'band037',
    'band038',
    'band039',
    'band040',
    'band041',
    'band042',
    'band043',
    'band044',
    'band045',
    'band046',
    'band047',
    'band048',
    'band049',
    'band050',
    'band051',
    'band052',
    'band053',
    'band054',
    'band055',
    'band056',
    'band057',
    'band058',
    'band059',
    'band060',
    'band061',
    'band062',
    'band063',
    'band064',
    'band065',
    'band066',
    'band067',
    'band068',
    'band069',
    'band070',
    'band071',
    'band072',
    'band073',
    'band074',
    'band075',
    'band076',
    'band077',
    'band078',
    'band079',
    'band080',
    'band081',
    'band082',
    'band083',
    'band084',
    'band085',
    'band086',
    'band087',
    'band088',
    'band089',
    'band090',
    'band091',
    'band092',
    'band093',
    'band094',
    'band095',
    'band096',
    'band097',
    'band098',
    'band099',
    'band100',
    'band101',
    'band102',
    'band103',
    'band104',
    'band105',
    'band106',
    'band107',
    'band108',
    'band109',
    'band110',
    'band111',
    'band112',
    'band113',
    'band114',
    'band115',
    'band116',
    'band117',
    'band118',
    'band119',
    'band120',
    'band121',
    'band122',
    'band123',
    'band124',
    'band125',
    'band126',
    'band127',
    'band128',
    'band129',
    'band130',
    'band131',
    'band132',
    'band133',
    'band134',
    'band135',
    'band136',
    'band137',
    'band138',
    'band139',
    'band140',
    'band141',
    'band142',
    'band143',
    'band144',
    'band145',
    'band146',
    'band147',
    'band148',
    'band149',
    'band150',
    'band151',
    'band152',
    'band153',
    'band154',
    'band155',
    'band156',
    'band157',
    'band158',
    'band159',
    'band160',
    'band161',
    'band162',
    'band163',
    'band164',
    'band165',
    'band166',
    'band167',
    'band168',
    'band169',
    'band170',
    'band171',
    'band172',
    'band173',
    'band174',
    'band175',
    'band176',
    'band177',
    'band178',
    'band179',
    'band180',
    'band181',
    'band182',
    'band183',
    'band184',
    'band185',
    'band186',
    'band187',
    'band188',
    'band189',
    'band190',
    'band191',
    'band192',
    'band193',
    'band194',
    'band195',
    'band196',
    'band197',
    'band198',
    'band199',
    'band200',
    'band201',
    'band202',
    'band203',
    'band204',
    'band205',
    'band206',
    'band207',
    'band208',
    'band209',
    'band210',
    'band211',
    'band212',
    'band213',
    'band214',
    'band215',
    'band216',
    'band217',
    'band218',
    'band219',
    'band220',
    'band221',
    'band222',
    'band223',
    'band224',
    'band225',
    'band226',
    'band227',
    'band228',
    'band229',
    'band230',
    'band231',
    'band232',
    'band233',
    'band234',
    'band235',
    'band236',
    'band237',
    'band238',
    'band239',
    'band240',
    'band241',
    'band242',
    'band243',
    'band244',
    'band245',
    'band246',
    'band247',
    'band248',
    'band249',
    'band250',
    'band251',
    'band252',
    'band253',
    'band254',
    'band255',
    'band256',
    'band257',
    'band258',
    'band259',
    'band260',
    'band261',
    'band262',
    'band263',
    'band264',
    'band265',
    'band266',
    'band267',
    'band268',
    'band269',
    'band270',
    'band271',
    'band272',
    'band273',
    'band274',
    'band275',
    'band276',
    'band277',
    'band278',
    'band279',
    'band280',
    'band281',
    'band282',
    'band283',
    'band284',
    'band285',
];

export const EMIT_LEVEL_2a_SERVICE_SORT_FIELD = 'best';

export const EMIT_LEVEL_2a_SERVICE_SORT_VALUE = '0';
