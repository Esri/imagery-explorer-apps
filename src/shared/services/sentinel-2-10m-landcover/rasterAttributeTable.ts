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
import {
    SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from './config';
// import { DEFAULT_RENDERING_RULE } from './config';
import { APP_NAME } from '@shared/config';
import {
    // LandCoverClassification,
    Sentinel2LandCoverClassification,
} from '@typing/landcover';
import { LandcoverClassificationData } from '@typing/landcover';
import { getRasterAttributeTable } from '../helpers/getRasterAttributeTable';

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

/**
 * Map stores pixel data from Raster attribute table using Value as the key
 */
export const sentinel2LandcoverClassificationDataMap: Map<
    number,
    LandcoverClassificationData
> = new Map();

/**
 * Fetch Raster Attribute Table of Sentinel2_10m_LandCover and save the pixel data in a Map
 */
export const loadSentinel2LandcoverRasterAttributeTable = async () => {
    const { features } = await getRasterAttributeTable(
        SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
        SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION
    );

    if (!features || !features.length) {
        throw new Error('failed to getRasterAttributeTable');
    }

    for (const feature of features) {
        const { attributes } = feature;

        const { Value, Description, ClassName, Red, Green, Blue } = attributes;

        sentinel2LandcoverClassificationDataMap.set(Value, {
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
        return [...sentinel2LandcoverClassificationDataMap.values()];
    };

export const getSentinel2LandCoverClassificationByPixelValue = (
    pixelValue: number
): LandcoverClassificationData => {
    return sentinel2LandcoverClassificationDataMap.get(pixelValue) || null;
};

export const getDistinctLandCoverClassificationPixelValues = () => {
    return [...sentinel2LandcoverClassificationDataMap.keys()];
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
