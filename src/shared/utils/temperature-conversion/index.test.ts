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

import { celsius2fahrenheit, kelvin2celsius, kelvin2fahrenheit } from '.';

describe('test temperature conversion', () => {
    test('kelvin 2 celsius', () => {
        expect(kelvin2celsius(0)).toBe(-273.15);
        expect(kelvin2celsius(1000)).toBe(726.85);
    });

    test('kelvin 2 fahrenheit', () => {
        expect(Math.trunc(kelvin2fahrenheit(100))).toBe(-279);
        expect(Math.trunc(kelvin2fahrenheit(1000))).toBe(1340);
    });

    test('celsius 2 fahrenheit', () => {
        expect(celsius2fahrenheit(0)).toBe(32);
        expect(celsius2fahrenheit(100)).toBe(212);
    });
});
