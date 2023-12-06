import config from '../../config.json';

// Create a type that represents the keys of the Config object
export type AppName = keyof typeof config;

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

export const TIER =
    window.location.host === 'livingatlas.arcgis.com'
        ? 'production'
        : 'development';

export const appConfig: AppConfig = config[APP_NAME];
