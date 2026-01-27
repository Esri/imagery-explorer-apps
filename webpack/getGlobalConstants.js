const { ERROR_TERMIAL_OUTPUT_COLOR } = require('./constants');

/**
 * Get global constants to be defined in the webpack build process.
 * These constants are made available in the application code via webpack's DefinePlugin.
 * @param {*} app name of the application to get global constants for, should match a key in src/config.json
 * @param {*} envConfig object containing environment variables loaded from .env file by dotenv
 * @returns {Object} - object containing global constants to be defined in webpack
 */
const getGlobalConstants = (app, envConfig) => {
    if (!app) {
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            'No application specified for global constants generation.'
        );
        process.exit(1);
    }

    if (!envConfig) {
        console.error(
            ERROR_TERMIAL_OUTPUT_COLOR,
            'No environment configuration provided for global constants generation.'
        );
        process.exit(1);
    }

    console.log(`Generating global constants for "${app}"\n`);

    return {
        // /**
        //  * node running environment
        //  */
        // NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        /**
         * name of the imagery explorer app to start/build
         */
        WEBPACK_DEFINED_APP_NAME: JSON.stringify(app),
        /**
         * APP ID for Landsat Explorer app
         */
        ENV_LANDSAT_EXPLORER_APP_ID: JSON.stringify(
            envConfig.LANDSAT_EXPLORER_APP_ID
        ),
        /**
         * URL for Landsat Level 2 original service
         */
        ENV_LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL: JSON.stringify(
            envConfig.LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL
        ),
        /**
         * URL for Landsat Level 2 proxy service
         */
        ENV_LANDSAT_LEVEL_2_PROXY_SERVICE_URL: JSON.stringify(
            envConfig.LANDSAT_LEVEL_2_PROXY_SERVICE_URL
        ),
        /**
         * APP ID for Sentinel-2 Explorer app
         */
        ENV_SENTINEL2_EXPLORER_APP_ID: JSON.stringify(
            envConfig.SENTINEL2_EXPLORER_APP_ID
        ),
        /**
         * URL for Sentinel-2 original service
         */
        ENV_SENTINEL2_ORIGINAL_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL2_ORIGINAL_SERVICE_URL
        ),
        /**
         * URL for sentinel-2 proxy service
         */
        ENV_SENTINEL2_PROXY_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL2_PROXY_SERVICE_URL
        ),
        /**
         * APP ID for Sentinel-1 Explorer app
         */
        ENV_SENTINEL1_EXPLORER_APP_ID: JSON.stringify(
            envConfig.SENTINEL1_EXPLORER_APP_ID
        ),
        /**
         * URL for Sentinel-1 original service
         */
        ENV_SENTINEL1_ORIGINAL_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL1_ORIGINAL_SERVICE_URL
        ),
        /**
         * URL for sentinel-1 proxy service
         */
        ENV_SENTINEL1_PROXY_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL1_PROXY_SERVICE_URL
        ),
        /**
         * APP ID Land Cover Explorer app
         */
        ENV_LANDCOVER_EXPLORER_APP_ID: JSON.stringify(
            envConfig.LANDCOVER_EXPLORER_APP_ID
        ),
        /**
         * URL for Sentinel-2 Land Cover service
         */
        ENV_SENTINEL2_LANDCOVER_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL2_LANDCOVER_SERVICE_URL
        ),
        /**
         * URL for Sentinel-2 Land Cover statistics service
         */
        ENV_SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL: JSON.stringify(
            envConfig.SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL
        ),
        /**
         * ArcGIS Online portal root URL
         */
        ENV_ARCGIS_PORTAL_ROOT_URL: JSON.stringify(
            envConfig.ARCGIS_PORTAL_ROOT_URL
        ),
        /**
         * Raster Analysis service root URL
         */
        ENV_RASTER_ANALYSIS_ROOT_URL: JSON.stringify(
            envConfig.RASTER_ANALYSIS_ROOT_URL
        ),
        /**
         * Application ID for the NLCD Land Cover Explorer app.
         */
        ENV_NLCD_LANDCOVER_EXPLORER_APP_ID: JSON.stringify(
            envConfig.NLCD_LANDCOVER_EXPLORER_APP_ID
        ),
        /**
         * URL for the NLCD Land Cover service.
         */
        ENV_NLCD_LANDCOVER_SERVICE_URL: JSON.stringify(
            envConfig.NLCD_LANDCOVER_SERVICE_URL
        ),
        /**
         * Web map ID for the Imagery Explorer app.
         * Optional: defaults to `f8770e0adc5c41038026494b871ceb99` if not specified.
         */
        ENV_WEB_MAP_ID: JSON.stringify(envConfig.IMAGERY_EXPLORER_WEB_MAP_ID),
        /**
         * Application ID for the LANDSAT SURFACE TEMP EXPLORER app.
         */
        ENV_SUREFACE_TEMP_EXPLORER_APP_ID: JSON.stringify(
            envConfig.SUREFACE_TEMP_EXPLORER_APP_ID
        ),
    };
};

module.exports = getGlobalConstants;
