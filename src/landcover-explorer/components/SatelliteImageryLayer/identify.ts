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
import {
    getMosaicRuleByAcquisitionDate,
    ImageryServiceFieldNames,
} from './exportSatelliteImage';
// import { SENTINEL_2_SERVICE_URL } from '@shared/services/sentinel-2/config';
import { ImageryRasterFunction4LandcoverApp } from '@shared/store/LandcoverExplorer/reducer';
// import {
//     SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
//     SENTINEL_2_IMAGE_SERVICE_URL,
// } from './config';

type IdentifyParams = {
    serviceUrl: string;
    geometry: IPoint;
    resolution: number;
    rasterFunction: ImageryRasterFunction4LandcoverApp;
    year: number;
    month: number;
};

type CatalogItemsFeatures = {
    attributes: {
        [key: string]: any;
    };
};

type IdentifyTaskResponse = {
    catalogItems: {
        features: CatalogItemsFeatures[];
    };
};

const identify = async ({
    serviceUrl,
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

    const requestURL = `${serviceUrl}/identify?${params.toString()}`;

    const res = await fetch(requestURL);

    const data = (await res.json()) as IdentifyTaskResponse;

    return data;
};

export const getAcquisitionDateOfSatelliteImage = async ({
    serviceUrl,
    geometry,
    resolution,
    rasterFunction,
    year,
    month,
}: IdentifyParams): Promise<number> => {
    /**
     * The acquisition date of the satellite image in the specified month and year.
     * The date is represented as UNIX timestamp (milliseconds since epoch).
     */
    let acquisitionDate: number = null;

    try {
        const identifyTaskRes = await identify({
            serviceUrl,
            geometry,
            resolution,
            rasterFunction,
            year,
            month,
        });

        const acquisitionDateFieldName =
            ImageryServiceFieldNames.AcquisitionDate;

        if (
            identifyTaskRes.catalogItems &&
            identifyTaskRes.catalogItems.features &&
            identifyTaskRes.catalogItems.features.length > 0
        ) {
            const feature = identifyTaskRes.catalogItems.features[0];

            const attributes = feature.attributes;

            acquisitionDate =
                attributes[acquisitionDateFieldName] &&
                typeof attributes[acquisitionDateFieldName] === 'number'
                    ? attributes[acquisitionDateFieldName]
                    : null;
        }

        return acquisitionDate;
    } catch (error) {
        console.log(error);
        return null;
    }
};
