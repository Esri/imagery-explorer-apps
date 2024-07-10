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

import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';
import { IdentifyTaskResponse } from './identify';

/**
 * Get pixel values from Identify Task Response
 * @param res
 * @returns
 */
export const getPixelValuesFromIdentifyTaskResponse = (
    res: IdentifyTaskResponse
): number[] => {
    let bandValues: number[] = null;

    if (res?.value && res?.value !== 'NoData') {
        // get pixel values from the value property first
        bandValues = res?.value.split(', ').map((d) => +d);
    } else if (res?.properties?.Values[0]) {
        bandValues = res?.properties?.Values[0].split(' ').map((d) => {
            if (canBeConvertedToNumber(d) === false) {
                return null;
            }

            return +d;
        });
    }

    return bandValues;
};
