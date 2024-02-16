/* Copyright 2024 Esri
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

import {
    DEFAULT_RENDERING_RULE,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from './config';

import IPoint from '@arcgis/core/geometry/Point';
import { getAvailableYears } from './timeInfo';
import {
    getLandCoverClassificationByPixelValue,
    LandcoverClassificationData,
} from './rasterAttributeTable';

export type LandcoverClassificationsByYear = {
    year: number;
    data: LandcoverClassificationData;
};

type IdentifyTaskResponse = {
    /**
     * Pixel value
     */
    value: string;
    objectId: number;
    name: string;
    location: {
        x: number;
        y: number;
        spatialReference: {
            wkid: number;
            latestWkid: number;
        };
    };
};

/**
 * The identify operation is performed on an image service resource. It identifies the content of an image service for a given location, mosaic rule,
 * and rendering rule or rules.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/identify-image-service-.htm
 *
 * @param point
 * @param year
 */
const identify = async (
    point: IPoint,
    year: number
): Promise<IdentifyTaskResponse> => {
    const params = new URLSearchParams({
        f: 'json',
        renderingRule: JSON.stringify(DEFAULT_RENDERING_RULE),
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicAttribute',
            sortValue: null,
            where: `(Year = ${year})`,
        }),
        geometry: JSON.stringify(point),
        geometryType: 'esriGeometryPoint',
        returnGeometry: 'false',
        returnCatalogItems: 'false',
    });

    const requestURL =
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL +
        `/identify?${params.toString()}`;

    const res = await fetch(requestURL);

    const data = await res.json();

    return data;
};

/**
 * Get Land Cover Classification Data for all available years from pixel that intersect with input point.
 *
 * @param point location that will be used as input geometry for the identify task
 *
 * @return LandcoverClassificationData[] Array of Landcover Classification Data
 */
export const identifyLandcoverClassificationsByLocation = async (
    point: IPoint
): Promise<LandcoverClassificationsByYear[]> => {
    try {
        const availableYears = getAvailableYears();

        const identifyTasks = availableYears.map((year) => {
            return identify(point, year);
        });

        const identifyTasksResults = await Promise.all(identifyTasks);

        const output: LandcoverClassificationsByYear[] = [];

        for (let i = 0; i < availableYears.length; i++) {
            const res = identifyTasksResults[i];
            const { value } = res;

            output.push({
                year: availableYears[i],
                data: getLandCoverClassificationByPixelValue(+value),
            });
        }

        return output;
    } catch (err) {
        console.log('failed to get Land Cover Classification Data', err);
    }

    return null;
};
