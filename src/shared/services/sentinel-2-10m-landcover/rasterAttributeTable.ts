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

import { t } from 'i18next';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';
import { DEFAULT_RENDERING_RULE } from './config';
import { APP_NAME } from '@shared/config';
import {
    LandCoverClassification,
    Sentinel2LandCoverClassification,
} from '@typing/landcover';
import { LandcoverClassificationData } from '@typing/landcover';

/**
 * Feature from Attribute Table
 */
type RasterAttributeTableFeature = {
    attributes: {
        OBJECTID: number;
        Blue: number;
        Green: number;
        Red: number;
        ClassName: string;
        // Count: number; // "Count" field is no longer included in the Raster Attribute table sicn September 2023.
        Description: string;
        Examples: string;
        PopupText: string;
        UlcPopupText: string;
        Value: number;
    };
};

export const RasterFunctionsByClassificationName: Record<
    Sentinel2LandCoverClassification,
    string
> = {
    Water: 'Water Areas Only',
    Trees: 'Trees Only',
    'Flooded Vegetation': 'Flooded Vegeation Areas Only',
    Crops: 'Crops Only',
    'Built Area': 'Built Areas Only',
    'Bare Ground': 'Bare Ground Areas Only',
    'Snow/Ice': 'Snow or Ice Only',
    Clouds: 'Clouds Only',
    Rangeland: 'Rangelands Areas Only',
    'No Data': '',
};

const LandcoverClassificationShortNames: Record<
    Sentinel2LandCoverClassification,
    string
> = {
    'Bare Ground': 'Bare',
    'Built Area': 'Built',
    Clouds: 'Clouds',
    Crops: 'Crops',
    'Flooded Vegetation': 'Flooded',
    Rangeland: 'Range',
    'Snow/Ice': 'Snow/Ice',
    Trees: 'Trees',
    Water: 'Water',
    'No Data': 'No Data',
};

type RasterAttributeTableResponse = {
    features: RasterAttributeTableFeature[];
};

/**
 * Map stores pixel data from Raster attribute table using Value as the key
 */
const landcoverClassificationDataMap: Map<number, LandcoverClassificationData> =
    new Map();

/**
 * The rasterAttributeTable resource returns categorical mapping of pixel values (for example, a class, color, value).
 * This resource is supported if the hasRasterAttributeTable property of the service is true.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/raster-attribute-table.htm
 *
 * @example
 *
 * Get Attribute Table of Sentinel2_10m_LandCover
 * ```js
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Cartographic%20Renderer%20-%20Legend%20and%20Attribute%20Table%22%7D&f=json
 * ```
 *
 * Returns
 * ```js
 * {
 *   features: [
 *     ...
 *      {
 *           OBJECTID: 3,
 *           Value: 2,
 *           Count: 292251633,
 *           ClassName: "Trees",
 *           Red: 53,
 *           Green: 130,
 *           Blue: 33,
 *           UlcPopupText: "Trees",
 *           PopupText: "trees",
 *           Description: "Any significant clustering of tall (~15-m or higher) dense vegetation...",
 *           Examples: "Wooded vegetation,  clusters of dense tall vegetation within savannas..."
 *       }
 *   ]
 * }
 * ```
 *
 */
const getRasterAttributeTable = async () => {
    const params = new URLSearchParams({
        renderingRule: JSON.stringify(DEFAULT_RENDERING_RULE),
        f: 'json',
    });

    const requestURL =
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL +
        `/rasterAttributeTable?${params.toString()}`;

    const res = await fetch(requestURL);

    const data = (await res.json()) as RasterAttributeTableResponse;

    return data;
};

/**
 * Fetch Raster Attribute Table of Sentinel2_10m_LandCover and save the pixel data in a Map
 */
export const loadRasterAttributeTable = async () => {
    const { features } = await getRasterAttributeTable();

    if (!features || !features.length) {
        throw new Error('failed to getRasterAttributeTable');
    }

    for (const feature of features) {
        const { attributes } = feature;

        const { Value, Description, ClassName, Red, Green, Blue } = attributes;

        landcoverClassificationDataMap.set(Value, {
            Value,
            Description,
            ClassName: ClassName as Sentinel2LandCoverClassification,
            Color: [Red, Green, Blue],
            shortName: getLandCoverClassificationShortName(
                ClassName as Sentinel2LandCoverClassification
            ),
        });
    }
};

export const getSentinel2LandCoverClassifications =
    (): LandcoverClassificationData[] => {
        return [...landcoverClassificationDataMap.values()];
    };

export const getLandCoverClassificationByPixelValue = (
    pixelValue: number
): LandcoverClassificationData => {
    return landcoverClassificationDataMap.get(pixelValue) || null;
};

export const getDistinctLandCoverClassificationPixelValues = () => {
    return [...landcoverClassificationDataMap.keys()];
};

const getLandCoverClassificationShortName = (
    classification: Sentinel2LandCoverClassification
) => {
    const translationKey = LandcoverClassificationShortNames[classification]; //|| classification;

    return t(translationKey, {
        ns: APP_NAME,
        defaultValue:
            LandcoverClassificationShortNames[classification] || classification,
    });
};

/**
 * Retrieves the raster function associated with a given Sentinel-2 land cover classification name.
 *
 * @param name - The land cover classification name (optional).
 * @returns The raster function corresponding to the provided classification name,
 *          or the default 'Cartographic Renderer - Legend and Attribute Table' if not found.
 */
export const getRasterFunctionBySentinel2LandCoverClassName = (
    name?: Sentinel2LandCoverClassification
) => {
    return (
        RasterFunctionsByClassificationName[name] ||
        'Cartographic Renderer - Legend and Attribute Table'
    );
};
