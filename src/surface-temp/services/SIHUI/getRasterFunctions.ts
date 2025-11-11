import { UrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/reducer';
import { createRasterFunction4DataAggregation } from './createRasterFunction4DataAggregation';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { getToken } from '@shared/utils/esri-oauth';
import { getUrbanAreaGeometry } from './getUrbanAreaGeomtery';
import { RasterAnalysisRasterFunction } from '@shared/services/raster-analysis/types';

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
