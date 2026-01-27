import { UrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/reducer';
import { createRasterFunction4DataAggregation } from './createRasterFunction4DataAggregation';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { getToken } from '@shared/utils/esri-oauth';
import { getUrbanAreaGeometry } from './getUrbanAreaGeomtery';
import { RasterAnalysisRasterFunction } from '@shared/services/raster-analysis/types';
import { createRasterFunction4ZonalMean } from './createRasterFunction4ZonalMean';
import { data } from '@landsat-explorer/components/InterestingPlaces/data';
import { createRasterFunction4SurfaceHeatIndex } from './createRasterFunction4SurfaceHeatIndex';

type GetRasterFunction4DataAggregationParam = {
    selectedFeature: UrbanAreaFeature;
    selectedYear: number;
    selectedMonths: number[];
};

const RasterFunctionMap: Record<string, any> = new Map<
    string,
    RasterAnalysisRasterFunction
>();

export const getRasterFunction4DataAggregation = async ({
    selectedFeature,
    selectedYear,
    selectedMonths,
}: GetRasterFunction4DataAggregationParam): Promise<RasterAnalysisRasterFunction> => {
    const key = `${selectedFeature.URBAN_CENTER_ID}-${selectedYear}-${[...selectedMonths].sort().join(',')}`;

    if (RasterFunctionMap.has(key)) {
        return RasterFunctionMap.get(key);
    }

    const token = getToken();

    if (!token) {
        throw new Error('user token is required to access Landsat service.');
    }

    // Get the geometry of the selected urban area feature
    const geometry = await getUrbanAreaGeometry(selectedFeature.OBJECTID);
    // console.log('Urban Area Geometry:', geometry);

    // console.log('Urban Area Extent:', extent);
    const rasterFunction = createRasterFunction4DataAggregation({
        landsatServiceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
        geometry,
        selectedYear,
        selectedMonths,
        token,
    });
    // console.log('Generated Raster Function for Data Aggregation:', rasterFunctionTemplate);

    RasterFunctionMap.set(key, rasterFunction);

    return rasterFunction;
};

/**
 * Retrieves or creates a raster function for zonal mean analysis.
 *
 * This function manages a cache of raster functions based on the data aggregation output service URL.
 * If a raster function already exists for the given URL, it returns the cached version.
 * Otherwise, it creates a new raster function, caches it, and returns it.
 *
 * @param dataAggregationOutputServiceUrl - The URL of the data aggregation output service to be used for zonal mean analysis
 * @returns A RasterAnalysisRasterFunction configured for zonal mean calculations
 * @throws {Error} When user token is not available
 * @throws {Error} When dataAggregationOutputServiceUrl is not provided
 */
export const getRasterFunction4ZonalMean = (
    dataAggregationOutputServiceUrl: string
): RasterAnalysisRasterFunction => {
    const token = getToken();

    if (!token) {
        throw new Error('user token is required to access Landsat service.');
    }

    if (!dataAggregationOutputServiceUrl) {
        throw new Error(
            'Data aggregation output service URL is required to create zonal mean raster function.'
        );
    }

    if (RasterFunctionMap.has(dataAggregationOutputServiceUrl)) {
        return RasterFunctionMap.get(dataAggregationOutputServiceUrl);
    }

    const rasterFunction: RasterAnalysisRasterFunction =
        createRasterFunction4ZonalMean(dataAggregationOutputServiceUrl, token);
    RasterFunctionMap.set(dataAggregationOutputServiceUrl, rasterFunction);

    return rasterFunction;
};

/**
 * Retrieves or creates a raster function for calculating the Surface Heat Index.
 * The function uses data aggregation and zonal mean services to perform the analysis.
 * Results are cached based on the service URLs to avoid recreating identical raster functions.
 *
 * @param dataAggregationOutputServiceUrl - The URL of the data aggregation output service
 * @param zonalMeanOutputServiceUrl - The URL of the zonal mean output service
 * @returns A RasterAnalysisRasterFunction configured for surface heat index calculation
 */
export const getRasterFunction4SurfaceHeatIndex = (
    dataAggregationOutputServiceUrl: string,
    zonalMeanOutputServiceUrl: string
): RasterAnalysisRasterFunction => {
    const token = getToken();

    if (!token) {
        throw new Error('user token is required to access Landsat service.');
    }

    if (!dataAggregationOutputServiceUrl || !zonalMeanOutputServiceUrl) {
        throw new Error(
            'Data aggregation and zonal mean output service URLs are required to create surface heat index raster function.'
        );
    }

    const key = `${dataAggregationOutputServiceUrl}-${zonalMeanOutputServiceUrl}`;

    if (RasterFunctionMap.has(key)) {
        return RasterFunctionMap.get(key);
    }

    const rasterFunction = createRasterFunction4SurfaceHeatIndex({
        dataAggregationServiceUrl:
            dataAggregationOutputServiceUrl + `?token=${token}`,
        zonalMeanServiceUrl: zonalMeanOutputServiceUrl + `?token=${token}`,
    });
    RasterFunctionMap.set(key, rasterFunction);

    return rasterFunction;
};
