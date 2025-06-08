/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { Sentinel2RasterFunction } from '../ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';

import IPoint from '@arcgis/core/geometry/Point';
import { getMosaicRuleByAcquisitionDate } from '../AnimationPanel/exportSatelliteImage';
import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { ImageryRasterFunction4LandcoverApp } from '@shared/store/LandcoverExplorer/reducer';
// import {
//     SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
//     SENTINEL_2_IMAGE_SERVICE_URL,
// } from './config';

type IdentifyParams = {
    geometry: IPoint;
    resolution: number;
    rasterFunction: ImageryRasterFunction4LandcoverApp;
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

    const requestURL = `${SENTINEL_2_SERVICE_URL}/identify?${params.toString()}`;

    try {
        const res = await fetch(requestURL);

        const data = (await res.json()) as IdentifyTaskResponse;

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
