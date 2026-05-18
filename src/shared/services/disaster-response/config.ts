export const DISASTER_RESPONSE_IMAGERY_SERVICE_URL =
    ENV_DISASTER_RESPONSE_SERVICE_URL;

/**
 * List of Raster Functions for the Disaster Response imagery service.
 */
const DISASTER_RESPONSE_RASTER_FUNCTIONS = [
    'Natural Color for Visualization - DRA',
] as const;

export type DisasterResponseRasterFunctionName =
    (typeof DISASTER_RESPONSE_RASTER_FUNCTIONS)[number];
