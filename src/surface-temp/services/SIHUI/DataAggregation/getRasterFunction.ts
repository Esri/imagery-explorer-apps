import { UrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/reducer';
import { DataAggregationRasterFunctionTemplate } from './RasterFunctionTemplate4DataAggregation';

type GetRasterFunction4DataAggregationParam = {
    selectedFeature: UrbanAreaFeature;
    selectedYear: number;
    selectedMonths: number[];
};

const RasterFunctionMap: Record<string, any> = new Map<
    string,
    DataAggregationRasterFunctionTemplate
>();

export const getRasterFunction4DataAggregation = async ({
    selectedFeature,
    selectedYear,
    selectedMonths,
}: GetRasterFunction4DataAggregationParam): Promise<DataAggregationRasterFunctionTemplate> => {
    const key = `${selectedFeature.URBAN_CENTER_ID}-${selectedYear}-${selectedMonths.sort().join(',')}`;

    if (RasterFunctionMap.has(key)) {
        return RasterFunctionMap.get(key);
    }
};
