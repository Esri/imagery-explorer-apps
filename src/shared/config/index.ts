import { AppName } from '@typing/index';

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

const LandsatExplorerConfig: AppConfig = {
    title: 'Esri | Landsat Explorer (beta)',
    webmapId: '81609bbe235942919ad27c77e42c600e',
    animationMetadataSources: 'Esri, USGS, NASA',
};

const Sentinel2ExplorerConfig: AppConfig = {
    title: 'Esri | Sentinel-2 Explorer',
    webmapId: '81609bbe235942919ad27c77e42c600e',
};

const SpectralSamplingToolConfig: AppConfig = {
    title: 'Spectral Sampling Tool',
    webmapId: '81609bbe235942919ad27c77e42c600e',
};

const AppConfigByName: Record<AppName, AppConfig> = {
    landsat: LandsatExplorerConfig,
    'sentinel-2': Sentinel2ExplorerConfig,
    'spectral-sampling-tool': SpectralSamplingToolConfig,
};

export const appConfig: AppConfig = AppConfigByName[APP_NAME];
