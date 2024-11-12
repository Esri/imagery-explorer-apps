import { TIER } from '@shared/config';

export const RATER_ANALYSIS_SERVER_ROOT_URL =
    TIER === 'development'
        ? 'https://rasteranalysisdev.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'
        : 'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer';
