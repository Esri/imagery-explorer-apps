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

import { decimal2binary } from './decimal2binary';

test('test decimal2binary', () => {
    expect(decimal2binary(0)).toBe('0');
    expect(decimal2binary(1)).toBe('1');
    expect(decimal2binary(10)).toBe('1010');
    expect(decimal2binary(100)).toBe('1100100');
    expect(decimal2binary(521)).toBe('1000001001');
    expect(decimal2binary(5000)).toBe('1001110001000');
    expect(decimal2binary(55052)).toBe('1101011100001100');
});
