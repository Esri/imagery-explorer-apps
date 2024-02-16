import { Sentinel2RasterFunction } from '../ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';

import IPoint from '@arcgis/core/geometry/Point';
import { getMosaicRuleByAcquisitionDate } from './exportImage';
import {
    SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
    SENTINEL_2_IMAGE_SERVICE_URL,
} from './config';

type IdentifyParams = {
    geometry: IPoint;
    resolution: number;
    rasterFunction: Sentinel2RasterFunction;
    year: number;
    month: number;
};

type Sentinel2Feature = {
    attributes: {
        acquisitiondate: number;
    };
};

type IdentifyTaskResponse = {
    catalogItems: {
        features: Sentinel2Feature[];
    };
};

export const identify = async ({
    geometry,
    resolution,
    rasterFunction,
    year,
    month,
}: IdentifyParams): Promise<IdentifyTaskResponse> => {
    const params = new URLSearchParams({
        f: 'json',
        geometryType: 'esriGeometryPoint',
        geometry: JSON.stringify(geometry.toJSON()),
        renderingRules: JSON.stringify({
            rasterFunction,
        }),
        mosaicRule: JSON.stringify(getMosaicRuleByAcquisitionDate(year, month)),
        pixelSize: JSON.stringify({
            x: resolution,
            y: resolution,
            spatialReference: {
                wkid: 102100,
                latestWkid: 3857,
            },
        }),
        returnGeometry: 'false',
        returnCatalogItems: 'true',
        returnPixelValues: 'false',
        maxItemCount: '1',
        processAsMultidimensional: 'false',
    });

    const requestURL = `${SENTINEL_2_IMAGE_SERVICE_URL}/identify?${params.toString()}`;

    try {
        const res = await fetch(requestURL);

        const data = (await res.json()) as IdentifyTaskResponse;

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
