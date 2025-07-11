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
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import {
    getPixelValues,
    GetPixelValuesParams,
} from '../helpers/getPixelValues';

type Params = Omit<GetPixelValuesParams, 'serviceURL'>;
/**
 * Run identify task to get values of the pixel that intersects with the input point from the scene with input object id.
 * @param param0
 * @returns
 */
export const getLandsatPixelValues = async ({
    point,
    objectIds,
    abortController,
}: Params): Promise<number[]> => {
    // const res = await identify({
    //     serviceURL: LANDSAT_LEVEL_2_SERVICE_URL,
    //     point,
    //     objectIds,
    //     abortController,
    // });

    // if (
    //     res?.catalogItems?.features &&
    //     res?.catalogItems?.features.length === 0
    // ) {
    //     throw new Error(
    //         'Failed to fetch pixel values. Please select a location inside of the selected landsat scene.'
    //     );
    // }

    // const bandValues = getPixelValuesFromIdentifyTaskResponse(res);

    // if (!bandValues) {
    //     throw new Error('Identify task does not return band values');
    // }

    // return bandValues;

    const res = await getPixelValues({
        serviceURL: LANDSAT_LEVEL_2_SERVICE_URL,
        point,
        objectIds,
        abortController,
    });
    // console.log(res)

    if (!res.length) {
        throw new Error(
            'Failed to fetch pixel values. Please select a location inside of the selected landsat scene.'
        );
    }

    if (!res[0]?.values) {
        throw new Error('Identify task does not return band values');
    }

    return res[0].values;
};
