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

import { checkClearFlagInQABand, parseLandsatInfo } from './helpers';

describe('test helper functions for landsat-level-2 service', () => {
    describe('test parseLandsatInfo', () => {
        it('should return parsed info about a Landsat scene', () => {
            const {
                sensor,
                collectionCategory,
                collectionNumber,
                correctionLevel,
                processingDate,
            } = parseLandsatInfo('LC08_L1GT_029030_20151209_20160131_01_RT');

            expect(sensor).toBe('OLI/TIRS combined');
            expect(collectionCategory).toBe('Real-Time');
            expect(collectionNumber).toBe('01');
            expect(correctionLevel).toBe('L1GT');

            expect(new Date(processingDate).getFullYear()).toBe(2016);
            expect(new Date(processingDate).getMonth()).toBe(0);
            expect(new Date(processingDate).getDate()).toBe(31);
        });
    });

    describe('test checkClearFlagInQABand', () => {
        it('should return false if pixel is with cloud', () => {
            expect(
                checkClearFlagInQABand(
                    '0.773885, 0.77163, 0.723643, 0.70959, 0.705135, 0.480103, 0.338505, 22280, 217.767, 1493'
                        .split(', ')
                        .map((d) => +d)
                )
            ).toBeFalsy();
        });

        it('should return true if pixel is clear without cloud', () => {
            expect(
                checkClearFlagInQABand(
                    '0.149745, 0.173615, 0.231805, 0.270195, 0.308915, 0.367408, 0.33592, 21824, 315.871, 267'
                        .split(', ')
                        .map((d) => +d)
                )
            ).toBeTruthy();
        });
    });
});
