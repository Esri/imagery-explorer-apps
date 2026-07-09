const DISASTER_RESPONSE_IMAGERY_SERVICE_URL_DEFAULT =
    'https://di-disasterresponse.img.arcgis.com/arcgis/rest/services/drp_imagery/ImageServer';

export const DISASTER_RESPONSE_IMAGERY_SERVICE_URL =
    ENV_DISASTER_RESPONSE_SERVICE_URL ||
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL_DEFAULT;

/**
 * List of Raster Functions for the Disaster Response imagery service.
 */
const DISASTER_RESPONSE_RASTER_FUNCTIONS = [
    'Natural Color for Visualization - DRA',
] as const;

export type DisasterResponseRasterFunctionName =
    (typeof DISASTER_RESPONSE_RASTER_FUNCTIONS)[number];

export const DisasterResponseImageryServiceDefaultRenderer: DisasterResponseRasterFunctionName =
    'Natural Color for Visualization - DRA';

export enum DisasterResponseImageryServiceField {
    OBJECTID = 'objectid',
    NAME = 'name',
    MINPS = 'minps',
    MAXPS = 'maxps',
    LOWPS = 'lowps',
    HIGHPS = 'highps',
    CATEGORY = 'category',
    TAG = 'tag',
    GROUP_NAME = 'groupname',
    PRODUCT_NAME = 'productname',
    CENTER_X = 'centerx',
    CENTER_Y = 'centery',
    ZORDER = 'zorder',
    PROVIDER = 'provider',
    EVENT = 'event',
    TITLE = 'title',
    DESCRIPTION = 'description',
    PLATFORM = 'platform',
    IMAGE_TYPE = 'image_type',
    EVENT_START_DATE = 'event_start_date',
    DATETIME = 'datetime',
    CATALOG_ID = 'catalog_id',
    CLOUDS_PERCENT = 'clouds_percent',
    SHAPE = 'shape',
    EVENT_TYPE = 'event_type',
}
