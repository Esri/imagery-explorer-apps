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

/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost:8080/"}
 */
import { mockWindowLocation } from '../__jest_utils__/jest-helpers';
import { getQueryParams4MainSceneFromHashParams } from './queryParams4ImageryScene';

// use Friday, January 5, 2024 12:00:00 AM GMT as system time
const FAKE_SYSTEM_TIME = 1704412800000;
jest.useFakeTimers().setSystemTime(FAKE_SYSTEM_TIME);

describe('test getQueryParams4MainSceneFromHashParams', () => {
    it(`should return null if "mainScene" is not found in URL Hash params`, () => {
        mockWindowLocation('https://localhost:8080/');
        expect(getQueryParams4MainSceneFromHashParams()).toBeNull();
    });

    it(`should return QueryParams object if "mainScene" is found in URL Hash params`, () => {
        mockWindowLocation(
            'https://localhost:8080/#mainScene=2022-05-01%7CAgriculture+with+DRA%7C12345'
        );

        expect(getQueryParams4MainSceneFromHashParams()).toMatchObject({
            acquisitionDate: '2022-05-01',
            acquisitionDateRange: {
                startDate: '2022-01-01',
                endDate: '2022-12-31',
            },
            objectIdOfSelectedScene: 12345,
            rasterFunctionName: 'Agriculture with DRA',
            uniqueId: null,
        });
    });

    it(`should return QueryParams object with default acquisitionDateRange (Past 12 months) if "mainScene" does not have acquisitionDate in it`, () => {
        mockWindowLocation(
            'https://localhost:8080/#mainScene=%7CColor+Infrared+with+DRA%7C'
        );

        expect(getQueryParams4MainSceneFromHashParams()).toMatchObject({
            acquisitionDate: '',
            acquisitionDateRange: {
                startDate: '2023-02-01',
                endDate: '2024-01-31',
            },
            objectIdOfSelectedScene: null,
            rasterFunctionName: 'Color Infrared with DRA',
            uniqueId: null,
        });
    });
});
