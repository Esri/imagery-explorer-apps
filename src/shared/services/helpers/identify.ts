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

import Point from '@arcgis/core/geometry/Point';
import Geometry from '@arcgis/core/geometry/Geometry';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getLockRasterMosaicRule } from './getMosaicRules';
import RasterFunction from '@arcgis/core/layers/support/RasterFunction';

/**
 * Parameters for the Identify Task
 */
export type IdentifyTaskParams = {
    /**
     * URL of the imagery service
     */
    serviceURL: string;
    /**
     * Point geometry to be used in the identify task
     */
    point: Point;
    /**
     * Object IDs of the imagery scenes that will be used to create a Lock Raster mosaic rule
     */
    objectIds?: number[];
    /**
     * A custom mosaic rule to be used when object Ids are not provided
     */
    customMosaicRule?: any;
    /**
     * Raster Function that will be used as rendering rule
     */
    rasterFunction?: RasterFunction;
    /**
     * the resoultion of the map view, it is the size of one pixel in map units.
     * The value of resolution can be found by dividing the extent width by the view's width.
     */
    resolution?: number;
    /**
     * specify the number of catalog items that will be returned
     */
    maxItemCount?: number;
    /**
     * Abort controller to be used to cancel the identify task
     */
    abortController: AbortController;
};

/**
 * Run identify task on an imagery service to fetch pixel values for the input point location
 * @param param0 - IdentifyTaskParams object containing parameters for the identify task
 * @returns Promise of IdentifyTaskResponse containing the result of the identify task
 */
export type IdentifyTaskResponse = {
    catalogItems: {
        features: IFeature[];
        geometryType: string;
        objectIdFieldName: string;
    };
    location: Geometry;
    value: string;
    name: string;
    properties: {
        Values: string[];
    };
};

/**
 * Run identify task on an imagery service to fetch pixel values for the input point location
 * @param param0
 * @returns
 */
export const identify = async ({
    serviceURL,
    point,
    objectIds,
    customMosaicRule,
    rasterFunction,
    resolution,
    maxItemCount,
    abortController,
}: IdentifyTaskParams): Promise<IdentifyTaskResponse> => {
    const mosaicRule =
        objectIds && objectIds.length
            ? getLockRasterMosaicRule(objectIds)
            : customMosaicRule;

    const params = new URLSearchParams({
        f: 'json',
        // maxItemCount: '1',
        returnGeometry: 'false',
        returnCatalogItems: 'true',
        geometryType: 'esriGeometryPoint',
        geometry: JSON.stringify({
            spatialReference: {
                wkid: 4326,
            },
            x: point.longitude,
            y: point.latitude,
        }),
        // mosaicRule: JSON.stringify(mosaicRule),
    });

    if (rasterFunction) {
        const renderingRule = rasterFunction.toJSON();

        params.append('renderingRules', JSON.stringify(renderingRule));
    }

    if (resolution) {
        const pixelSize = JSON.stringify({
            x: resolution,
            y: resolution,
            spatialReference: {
                wkid: 102100,
                latestWkid: 3857,
            },
        });

        params.append('pixelSize', JSON.stringify(pixelSize));
    }

    if (maxItemCount) {
        params.append('maxItemCount', maxItemCount.toString());
    }

    if (mosaicRule) {
        params.append('mosaicRule', JSON.stringify(mosaicRule));
    }

    const requestURL = `${serviceURL}/identify?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data as IdentifyTaskResponse;
};
