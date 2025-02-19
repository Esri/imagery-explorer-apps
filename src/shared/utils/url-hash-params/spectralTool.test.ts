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

/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost:8080/"}
 */
// import { mockWindowLocation } from '../jest-helpers/helpers';
// import { mockWindowLocation } from '@shared/utils/__jest_utils__/jest-helpers';
import { getSpectralProfileToolDataFromHashParams } from './spectralTool';

describe('test getSpectralProfileToolDataFromHashParams', () => {
    it(`should return null if "spectral" is not found in URL Hash params`, () => {
        // mockWindowLocation('https://localhost:8080/');
        expect(
            getSpectralProfileToolDataFromHashParams(new URLSearchParams())
        ).toBeNull();
    });

    it(`should return SpectralProfileToolState with queryLocation if "spectral" is found in URL Hash params`, () => {
        // mockWindowLocation(
        //     'https://localhost:8080/#mapCenter=-78.993%2C51.730%2C11.000&mode=analysis&mainScene=2023-09-04%7CColor+Infrared+with+DRA%7C8976749&tool=spectral&spectral=-78%2C51'
        // );

        expect(
            getSpectralProfileToolDataFromHashParams(
                new URLSearchParams(
                    'mapCenter=-78.993%2C51.730%2C11.000&mode=analysis&mainScene=2023-09-04%7CColor+Infrared+with+DRA%7C8976749&tool=spectral&spectral=-78%2C51'
                )
            )
        ).toMatchObject({
            queryLocation: {
                x: -78,
                y: 51,
                longitude: -78,
                latitude: 51,
                spatialReference: {
                    wkid: 4326,
                },
            },
        });
    });
});
