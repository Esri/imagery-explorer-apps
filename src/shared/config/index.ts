import config from '../../config.json';

type AppConfig = {
    /**
     * Title of the explorer app (e.g., 'Esri | Landsat Explorer')
     */
    title: string;
    /**
     * Item id of the web map to be used in the app
     */
    webmapId: string;
    /**
     * Sources information to be added to output MP4 file
     */
    animationMetadataSources?: string;
};

/**
 * a type that represents the keys of the apps object in the config file
 */
export type AppName = keyof typeof config.apps;

/**
 * Name of the imagery explore app to start/build that defined in Webpack via DefinePlugin.
 * The APP_NAME should match one of the keys in `apps.config.json` file.
 */
export const APP_NAME: AppName = WEBPACK_DEFINED_APP_NAME as AppName;

/**
 * config file for the app to start/build
 */
export const appConfig: AppConfig = config.apps[APP_NAME];

export const TIER =
    window.location.host === 'livingatlas.arcgis.com'
        ? 'production'
        : 'development';
