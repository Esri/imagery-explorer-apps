import { TIER } from '@shared/config';

export const RASTER_ANALYSIS_SERVER_ROOT_URL =
    TIER === 'development'
        ? 'https://rasteranalysisdev.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'
        : 'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer';
