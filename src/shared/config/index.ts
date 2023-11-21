type AppConfig = {
    /**
     * title of the explorer app (e.g., 'Esri | Landsat Explorer')
     */
    title: string;
    /**
     * item id of the web map to be used in the app
     */
    webmapId: string;
    /**
     * sources information to be added to output MP4 file
     */
    animationMetadataSources?: string;
};

export const TIER =
    window.location.host === 'livingatlas.arcgis.com'
        ? 'production'
        : 'development';

const LandsatExplorerConfig: AppConfig = {
    title: 'Esri | Landsat Explorer (beta)',
    webmapId: '81609bbe235942919ad27c77e42c600e',
    animationMetadataSources: 'Esri, USGS, NASA',
};

let appConfig: AppConfig;

if (IMAGERY_SERVICE === 'landsat') {
    appConfig = LandsatExplorerConfig;
}

export { appConfig };
