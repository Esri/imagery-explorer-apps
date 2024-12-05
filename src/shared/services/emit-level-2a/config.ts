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

const serviceConfig = getServiceConfig('emit-level-2a');
// console.log('landsat-level-2 service config', serviceConfig);
//
// const serviceUrls = {
//     development:
//         'https://utility.arcgis.com/usrsvcs/servers/f89d8adb0d5141a7a5820e8a6375480e/rest/services/LandsatC2L2/ImageServer',
//     production:
//         'https://utility.arcgis.com/usrsvcs/servers/125204cf060644659af558f4f6719b0f/rest/services/LandsatC2L2/ImageServer',
// };

/**
 * EMIT L2a atmospherically corrected imagery with on-the-fly renderings and indices for visualization and analysis.
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
    OBJECTID: 'OBJECTID',
    NAME: 'Name',
    MINPS: 'MinPS',
    MAXPS: 'MaxPS',
    LOWPS: 'LowPS',
    HIGHPS: 'HighPS',
    CATEGORY: 'Category',
    PRODUCT_NAME: 'ProductName',
    CLOUD_COVER: 'TotalCloudFraction',
    ACQUISITION_DATE: 'AcquisitionDate',
    SUNAZIMUTH: 'ToSunAzimuth',
    SUNZENITH: 'ToSunZenith',
    SENSORNAME: 'SensorName',
    SHAPE: 'Shape',
    EMIT_SCENE_ID: 'fid'
    
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

export type EmitRasterFunctionName = (typeof EMIT_RASTER_FUNCTIONS)[number];

/**
 * Landsat-2 Raster Function Infos
 * @see https://utility.arcgis.com/usrsvcs/servers/fef56b39300841aaaf35ead6244b8bf7/rest/services/LandsatC2L2/ImageServer/rasterFunctionInfos/?f=json
 */
export const EMIT_RASTER_FUNCTION_INFOS: {
    name: EmitRasterFunctionName;
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
    'band_1',
    'band_2',
    'band_3',
    'band_4',
    'band_5',
    'band_6',
    'band_7',
    'band_8',
    'band_9',
    'band_10',
    'band_11',
    'band_12',
    'band_13',
    'band_14',
    'band_15',
    'band_16',
    'band_17',
    'band_18',
    'band_19',
    'band_20',
    'band_21',
    'band_22',
    'band_23',
    'band_24',
    'band_25',
    'band_26',
    'band_27',
    'band_28',
    'band_29',
    'band_30',
    'band_31',
    'band_32',
    'band_33',
    'band_34',
    'band_35',
    'band_36',
    'band_37',
    'band_38',
    'band_39',
    'band_40',
    'band_41',
    'band_42',
    'band_43',
    'band_44',
    'band_45',
    'band_46',
    'band_47',
    'band_48',
    'band_49',
    'band_50',
    'band_51',
    'band_52',
    'band_53',
    'band_54',
    'band_55',
    'band_56',
    'band_57',
    'band_58',
    'band_59',
    'band_60',
    'band_61',
    'band_62',
    'band_63',
    'band_64',
    'band_65',
    'band_66',
    'band_67',
    'band_68',
    'band_69',
    'band_70',
    'band_71',
    'band_72',
    'band_73',
    'band_74',
    'band_75',
    'band_76',
    'band_77',
    'band_78',
    'band_79',
    'band_80',
    'band_81',
    'band_82',
    'band_83',
    'band_84',
    'band_85',
    'band_86',
    'band_87',
    'band_88',
    'band_89',
    'band_90',
    'band_91',
    'band_92',
    'band_93',
    'band_94',
    'band_95',
    'band_96',
    'band_97',
    'band_98',
    'band_99',
    'band_100',
    'band_101',
    'band_102',
    'band_103',
    'band_104',
    'band_105',
    'band_106',
    'band_107',
    'band_108',
    'band_109',
    'band_110',
    'band_111',
    'band_112',
    'band_113',
    'band_114',
    'band_115',
    'band_116',
    'band_117',
    'band_118',
    'band_119',
    'band_120',
    'band_121',
    'band_122',
    'band_123',
    'band_124',
    'band_125',
    'band_126',
    'band_127',
    'band_128',
    'band_129',
    'band_130',
    'band_131',
    'band_132',
    'band_133',
    'band_134',
    'band_135',
    'band_136',
    'band_137',
    'band_138',
    'band_139',
    'band_140',
    'band_141',
    'band_142',
    'band_143',
    'band_144',
    'band_145',
    'band_146',
    'band_147',
    'band_148',
    'band_149',
    'band_150',
    'band_151',
    'band_152',
    'band_153',
    'band_154',
    'band_155',
    'band_156',
    'band_157',
    'band_158',
    'band_159',
    'band_160',
    'band_161',
    'band_162',
    'band_163',
    'band_164',
    'band_165',
    'band_166',
    'band_167',
    'band_168',
    'band_169',
    'band_170',
    'band_171',
    'band_172',
    'band_173',
    'band_174',
    'band_175',
    'band_176',
    'band_177',
    'band_178',
    'band_179',
    'band_180',
    'band_181',
    'band_182',
    'band_183',
    'band_184',
    'band_185',
    'band_186',
    'band_187',
    'band_188',
    'band_189',
    'band_190',
    'band_191',
    'band_192',
    'band_193',
    'band_194',
    'band_195',
    'band_196',
    'band_197',
    'band_198',
    'band_199',
    'band_200',
    'band_201',
    'band_202',
    'band_203',
    'band_204',
    'band_205',
    'band_206',
    'band_207',
    'band_208',
    'band_209',
    'band_210',
    'band_211',
    'band_212',
    'band_213',
    'band_214',
    'band_215',
    'band_216',
    'band_217',
    'band_218',
    'band_219',
    'band_220',
    'band_221',
    'band_222',
    'band_223',
    'band_224',
    'band_225',
    'band_226',
    'band_227',
    'band_228',
    'band_229',
    'band_230',
    'band_231',
    'band_232',
    'band_233',
    'band_234',
    'band_235',
    'band_236',
    'band_237',
    'band_238',
    'band_239',
    'band_240',
    'band_241',
    'band_242',
    'band_243',
    'band_244',
    'band_245',
    'band_246',
    'band_247',
    'band_248',
    'band_249',
    'band_250',
    'band_251',
    'band_252',
    'band_253',
    'band_254',
    'band_255',
    'band_256',
    'band_257',
    'band_258',
    'band_259',
    'band_260',
    'band_261',
    'band_262',
    'band_263',
    'band_264',
    'band_265',
    'band_266',
    'band_267',
    'band_268',
    'band_269',
    'band_270',
    'band_271',
    'band_272',
    'band_273',
    'band_274',
    'band_275',
    'band_276',
    'band_277',
    'band_278',
    'band_279',
    'band_280',
    'band_281',
    'band_282',
    'band_283',
    'band_284',
    'band_285'

];

export const EMIT_LEVEL_2a_SERVICE_SORT_FIELD = 'ToSunZenith';

export const EMIT_LEVEL_2a_SERVICE_SORT_VALUE = '0';
