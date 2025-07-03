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

import Extent from '@arcgis/core/geometry/Extent';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';
// import { MapExtent } from '@landcover-explorer/store/LandcoverExplorer/reducer';
import { DEFAULT_RENDERING_RULE } from './config';
import {
    getDistinctLandCoverClassificationPixelValues,
    getSentinel2LandCoverClassificationByPixelValue,
} from './rasterAttributeTable';
import { getAvailableYears } from './timeInfo';
import { LandcoverClassificationData } from '@typing/landcover';
import {
    computeHistograms,
    ComputeHistogramsResponse,
} from '../helpers/computeHistograms';
import {
    convertNumOfPixel2Acres,
    formatAreaPercentage,
    getTotalAreaInAcres,
} from '../helpers/getLandcoverSummaryGraphData';

export type AreaByYear = {
    year: number;
    /**
     * area (in acres) of a specific land cover type between two years
     */
    area: number;
    /**
     * area (in percentage) of a specific land cover type between two years
     */
    areaInPercentage: number;
    /**
     * area (in percentage) of a specific land cover type between two years
     * this is the raw value, not formatted, which is used for the CSV download
     */
    areaInPercentageRaw: number;
};

export type HistoricalLandCoverData = {
    /**
     * area of a specific land cover classification in acres by year
     */
    areaByYear: AreaByYear[];
    /**
     * data of a specific land cover
     */
    landCoverClassificationData: LandcoverClassificationData;
};

export const getHistoricalLandCoverDataByMapExtent = async (
    extent: Extent,
    resolution: number
): Promise<HistoricalLandCoverData[]> => {
    const availableYears = getAvailableYears();

    const distinctLandCoverClassificationPixelValues =
        getDistinctLandCoverClassificationPixelValues();

    const historicalLandCoverDataByLandCoverId = new Map<
        number,
        HistoricalLandCoverData
    >();

    for (const pixelValue of distinctLandCoverClassificationPixelValues) {
        const areaByYear: AreaByYear[] = availableYears.map((year) => {
            return {
                year,
                area: 0,
                areaInPercentage: 0,
                areaInPercentageRaw: 0,
            };
        });

        historicalLandCoverDataByLandCoverId.set(pixelValue, {
            areaByYear,
            landCoverClassificationData:
                getSentinel2LandCoverClassificationByPixelValue(pixelValue),
        });
    }

    try {
        const computeHistogramsRequest = availableYears.map((year) => {
            return computeHistograms({
                serviceUrl: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
                rasterFunction: DEFAULT_RENDERING_RULE.rasterFunction,
                extent,
                resolution,
                year,
            });
        });

        const computeHistogramsResults = await Promise.all(
            computeHistogramsRequest
        );

        for (let i = 0; i < availableYears.length; i++) {
            const result: ComputeHistogramsResponse =
                computeHistogramsResults[i];

            const counts = result.histograms[0].counts;

            const totalArea = getTotalAreaInAcres(counts, resolution);

            for (let j = 0; j < counts.length; j++) {
                if (historicalLandCoverDataByLandCoverId.has(j) === false) {
                    continue;
                }

                const numOfPixels = counts[j];

                const area = convertNumOfPixel2Acres(numOfPixels, resolution);

                const areaInPercentage = (area / totalArea) * 100;

                historicalLandCoverDataByLandCoverId.get(j).areaByYear[i].area =
                    area;

                historicalLandCoverDataByLandCoverId.get(j).areaByYear[
                    i
                ].areaInPercentage = formatAreaPercentage(areaInPercentage);

                historicalLandCoverDataByLandCoverId.get(j).areaByYear[
                    i
                ].areaInPercentageRaw = areaInPercentage;
            }
        }

        return [...historicalLandCoverDataByLandCoverId.values()];
    } catch (err) {
        console.log('failed to getLandCoverChangeInAcres', err);
        return null;
    }
};
