import { TIER } from '@shared/config';

export const RASTER_ANALYSIS_SERVER_ROOT_URL =
    TIER === 'development'
        ? 'https://rasteranalysisdev.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'
        : 'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer';

/**
 * The names of the raster analysis tasks.
 */
export enum RasteranalysisTaskName {
    EstimateRasterAnalysisCost = 'EstimateRasterAnalysisCost',
    GenerateRaster = 'GenerateRaster',
}
