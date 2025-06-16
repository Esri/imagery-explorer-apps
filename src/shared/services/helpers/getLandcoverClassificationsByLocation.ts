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
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils';
import IPoint from '@arcgis/core/geometry/Point';
import { LandcoverClassificationData } from '@typing/landcover';

export type LandcoverClassificationDataByYear = {
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

type IdentifyLandcoverClassificationsByLocationParams = {
    /**
     * The point location that will be used as input geometry for the identify task.
     */
    point: IPoint;
    /**
     * URL for the Land Cover Image Service.
     * This is used to perform the identify task.
     */
    landCoverServiceUrl: string;
    /**
     * The raster function to be used for the identify task.
     * This is used to specify how the data should be rendered.
     */
    rasterFunction: string;
    /**
     * Available years for which the land cover classification data can be retrieved.
     */
    years: number[];
    /**
     * The field in the Land Cover Image Service that contains the year of the imagery.
     */
    yearField: string;
    /**
     * Map stores Land Cover Classification Data using pixel value as the key.
     */
    classificationDataMap: Map<number, LandcoverClassificationData>;
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
export const identify = async ({
    landCoverServiceUrl,
    point,
    year,
    yearField,
    rasterFunction,
}: {
    /**
     * URL for the Land Cover Image Service
     */
    landCoverServiceUrl: string;
    /**
     * Point that will be used as input geometry for the identify task.
     */
    point: IPoint;
    /**
     * Year for which the land cover classification data is requested.
     */
    year: number;
    /**
     * Field in the Land Cover Image Service that contains the year of the imagery.
     */
    yearField: string;
    /**
     * The raster function that will be used for rendering the land cover layer.
     */
    rasterFunction: string;
}): Promise<IdentifyTaskResponse> => {
    // To prevent inaccuracies due to moving the map across the International Date Line,
    // convert the map extent to geographic units from Web Mercator.
    point = webMercatorToGeographic(point) as IPoint;

    const params = new URLSearchParams({
        f: 'json',
        renderingRule: JSON.stringify({
            rasterFunction,
        }),
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicAttribute',
            sortValue: null,
            where: `(${yearField} = ${year})`,
        }),
        geometry: JSON.stringify(point),
        geometryType: 'esriGeometryPoint',
        returnGeometry: 'false',
        returnCatalogItems: 'false',
    });

    const requestURL = landCoverServiceUrl + `/identify?${params.toString()}`;

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
export const identifyLandcoverClassificationsByLocation = async ({
    point,
    landCoverServiceUrl,
    rasterFunction,
    years,
    yearField,
    classificationDataMap,
}: IdentifyLandcoverClassificationsByLocationParams): Promise<
    LandcoverClassificationDataByYear[]
> => {
    try {
        // const availableYears = getAvailableYears();

        const identifyTasks = years.map((year) => {
            return identify({
                landCoverServiceUrl, //: SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
                point,
                year,
                yearField, //: SENTINEL2_LANDCOVER_10M_END_YEAR_FIELD,
                rasterFunction, //: SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION,
            });
        });

        const identifyTasksResults = await Promise.all(identifyTasks);

        const output: LandcoverClassificationDataByYear[] = [];

        for (let i = 0; i < years.length; i++) {
            const res = identifyTasksResults[i];
            const { value } = res;

            if (!value || !classificationDataMap.has(+value)) {
                continue; // Skip if no value or classification data is not available
            }

            output.push({
                year: years[i],
                data: classificationDataMap.get(+value),
            });
        }

        return output;
    } catch (err) {
        console.log('failed to get Land Cover Classification Data', err);
    }

    return null;
};
