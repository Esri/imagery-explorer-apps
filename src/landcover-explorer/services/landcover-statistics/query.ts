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

import {
    IFeature,
    IQueryFeaturesResponse,
    queryFeatures,
} from '@esri/arcgis-rest-feature-service';
import {
    AreaByYear,
    formatAreaPercentage,
    HistoricalLandCoverData,
} from '@shared/services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassifications } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';

import { LAND_COVER_STATISTICS_SERVICE_URL, FIELD_NAMES } from './config';
import { LandCoverClassification } from '@typing/landcover';

const {
    COUNTRY,
    ISO_CODE,
    NAME,
    YEAR,
    WATER,
    TREE,
    FLOODED_VEG,
    CROPS,
    BUILT,
    BARE,
    SNOW,
    CLOUD,
    RANGE,
} = FIELD_NAMES;

type PixelCountByLandCover = Partial<Record<LandCoverClassification, number>>;

type GetHistoricalLandCoverDataByRegionParams = {
    countryName?: string;
    subRegionISOCode?: string;
};

export type SubRegion = {
    /**
     * ISO Code of the sub-region (e.g. 'JP01')
     */
    ISOCode: string;
    /**
     * Name of the sub-region (e.g. 'Hokkaidô')
     */
    name: string;
};

/**
 * Get unique list of country names
 *
 * @returns array of country names sorted in alphabetical order
 *
 * @example
 * ```
 * const res = await getCountries() // ['Australia', 'Austria', 'Azerbaijan', 'Bahamas'...]
 * ```
 */
export const getCountries = async (): Promise<string[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: '1=1',
            outFields: [COUNTRY],
            orderByFields: COUNTRY,
            returnDistinctValues: true,
        })) as IQueryFeaturesResponse;

        return res.features.map((feature) => {
            const { attributes } = feature;
            return attributes[COUNTRY];
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

/**
 * Get unique list of sub-regions of the input country
 * @param country name of the country
 */
export const getSubRegions = async (country: string): Promise<SubRegion[]> => {
    try {
        const res = (await queryFeatures({
            url: LAND_COVER_STATISTICS_SERVICE_URL,
            where: `${COUNTRY}='${country}'`,
            outFields: [ISO_CODE, NAME],
            orderByFields: NAME,
            returnDistinctValues: true,
        })) as IQueryFeaturesResponse;

        return res.features.map((feature) => {
            const { attributes } = feature;
            return {
                ISOCode: attributes[ISO_CODE],
                name: attributes[NAME],
            };
        });
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getHistoricalLandCoverDataByRegion = async ({
    countryName,
    subRegionISOCode,
}: GetHistoricalLandCoverDataByRegionParams) => {
    if (!countryName && !subRegionISOCode) {
        return null;
    }

    const res = subRegionISOCode
        ? await queryLandCoverStatsBySunRegionISOCode(subRegionISOCode)
        : await queryLandCoverStatsByCountry(countryName);

    return formatLandCoverStatsFeatures(res.features);
};

const queryLandCoverStatsByCountry = async (
    countryName: string
): Promise<IQueryFeaturesResponse> => {
    const res = (await queryFeatures({
        url: LAND_COVER_STATISTICS_SERVICE_URL,
        where: `${COUNTRY}='${countryName}'`,
        groupByFieldsForStatistics: `${COUNTRY}, ${YEAR}`,
        outStatistics: [
            {
                statisticType: 'sum',
                onStatisticField: WATER,
                outStatisticFieldName: WATER,
            },
            {
                statisticType: 'sum',
                onStatisticField: TREE,
                outStatisticFieldName: TREE,
            },
            {
                statisticType: 'sum',
                onStatisticField: FLOODED_VEG,
                outStatisticFieldName: FLOODED_VEG,
            },
            {
                statisticType: 'sum',
                onStatisticField: CROPS,
                outStatisticFieldName: CROPS,
            },
            {
                statisticType: 'sum',
                onStatisticField: BUILT,
                outStatisticFieldName: BUILT,
            },
            {
                statisticType: 'sum',
                onStatisticField: BARE,
                outStatisticFieldName: BARE,
            },
            {
                statisticType: 'sum',
                onStatisticField: SNOW,
                outStatisticFieldName: SNOW,
            },
            {
                statisticType: 'sum',
                onStatisticField: CLOUD,
                outStatisticFieldName: CLOUD,
            },
            {
                statisticType: 'sum',
                onStatisticField: RANGE,
                outStatisticFieldName: RANGE,
            },
        ],
    })) as IQueryFeaturesResponse;

    return res;
};

/**
 * Query Land Cover Statistics table to get features by ISO Code
 * @param subRegionISOCode ISO Code of sub region
 * @returns
 */
const queryLandCoverStatsBySunRegionISOCode = async (
    subRegionISOCode: string
): Promise<IQueryFeaturesResponse> => {
    const res = (await queryFeatures({
        url: LAND_COVER_STATISTICS_SERVICE_URL,
        where: `${ISO_CODE}='${subRegionISOCode}'`,
        outFields: [
            COUNTRY,
            NAME,
            YEAR,
            WATER,
            TREE,
            FLOODED_VEG,
            CROPS,
            BUILT,
            BARE,
            SNOW,
            CLOUD,
            RANGE,
        ],
        orderByFields: YEAR,
    })) as IQueryFeaturesResponse;

    return res;
};

/**
 * Format features returned from Land Cover Stats table into Historical Land Cover Data
 * @param features array of features from the query results of Land Cover Stats table
 * @returns array of Historical Land Cover data that can be used to populate the Land Cover Graph in Info Panel
 *
 * @example
 * Usage
 * ```
 * formatLandCoverStatsFeatures(
 *     [
 *          {
 *              "attributes":{
 *                  "WaterPixelCount":241,
 *                  "TreesPixelCount":37650,
 *                  "FloodedVegetationPixelCount":0,
 *                  "CropsPixelCount":8,
 *                  "BuitAreaPixelCount":2291,
 *                  "BareGroundPixelCount":503,
 *                  "SnowIcePixelCount":0,
 *                  "CloudsPixelCount":0,
 *                  "RangelandPixelCount":45502,
 *                  "COUNTRY":"Andorra",
 *                  "LCYear":2017
 *              }
 *          },
 *          //...
 *     ]
 * )
 * ```
 *
 * Returns
 * ```
 * [
 *      {
 *          "areaByYear":[
 *              {"year":2017,"area":130820,"areaInPercentage":1.767},
 *              {"year":2018,"area":126360,"areaInPercentage":1.549},
 *              {"year":2019,"area":154930,"areaInPercentage":1.542},
 *              {"year":2020,"area":187929,"areaInPercentage":1.394},
 *              {"year":2021,"area":134675,"areaInPercentage":1.315}
 *          ],
 *          "landCoverClassificationData":{
 *              "Value":1,
 *              "Description":"Areas where water was predominantly present throughout the year; may not cover areas with sporadic or ephemeral water; contains little to no sparse vegetation, no rock outcrop nor built up features like docks.",
 *              "ClassName":"Water",
 *              "Color":[26,91,171]
 *          }
 *      },
 *      {
 *          "areaByYear":[
 *              {"year":2017,"area":352310,"areaInPercentage":12.178},
 *              {"year":2018,"area":334714,"areaInPercentage":12.748},
 *              {"year":2019,"area":416607,"areaInPercentage":13.074},
 *              {"year":2020,"area":435815,"areaInPercentage":12.696},
 *              {"year":2021,"area":334914,"areaInPercentage":12.292}
 *          ],
 *          "landCoverClassificationData":{
 *              "Value":2,
 *              "Description":"Any significant clustering of tall (~15-m or higher) dense vegetation, typically with a closed or dense canopy.",
 *              "ClassName":"Trees",
 *              "Color":[53,130,33]
 *          }
 *      },
 *      //...
 * ]
 * ```
 */
const formatLandCoverStatsFeatures = (
    features: IFeature[]
): HistoricalLandCoverData[] => {
    if (!features || !features.length) {
        return [];
    }

    const uniqueYears = features.map((feature) => +feature.attributes[YEAR]);

    const LandCoverClassifications = getLandCoverClassifications();

    const historicalLandCoverDataByClassName = new Map<
        LandCoverClassification,
        HistoricalLandCoverData
    >();

    for (const landCoverClassification of LandCoverClassifications) {
        const { ClassName } = landCoverClassification;

        const areaByYear: AreaByYear[] = uniqueYears.map((year) => {
            return {
                year,
                area: 0,
                areaInPercentage: 0,
                areaInPercentageRaw: 0,
            };
        });

        historicalLandCoverDataByClassName.set(ClassName, {
            areaByYear,
            landCoverClassificationData: landCoverClassification,
        });
    }

    for (const feature of features) {
        const { attributes } = feature;

        const year = attributes[YEAR];

        const yearIdx = uniqueYears.indexOf(year);

        const pixelCounts: PixelCountByLandCover = {
            'Bare Ground': attributes[BARE] as number,
            'Built Area': attributes[BUILT] as number,
            Clouds: attributes[CLOUD] as number,
            Crops: attributes[CROPS] as number,
            'Flooded Vegetation': attributes[FLOODED_VEG] as number,
            'No Data': 0,
            Rangeland: attributes[RANGE] as number,
            'Snow/Ice': attributes[SNOW] as number,
            Trees: attributes[TREE] as number,
            Water: attributes[WATER] as number,
        };

        const totalPixelCounts = Object.values(pixelCounts).reduce(
            (total, count) => total + count,
            0
        );

        for (const [landcoverClassName, count] of Object.entries(pixelCounts)) {
            const historicalData = historicalLandCoverDataByClassName.get(
                landcoverClassName as LandCoverClassification
            );

            if (!historicalData || landcoverClassName === 'No Data') {
                continue;
            }

            historicalData.areaByYear[yearIdx].area = count;

            historicalData.areaByYear[yearIdx].areaInPercentage =
                formatAreaPercentage((count / totalPixelCounts) * 100);

            historicalData.areaByYear[yearIdx].areaInPercentageRaw =
                (count / totalPixelCounts) * 100;
        }
    }

    const output = [...historicalLandCoverDataByClassName.values()];

    return output;
};
