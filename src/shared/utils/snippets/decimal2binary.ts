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

export const decimal2binary = (decimal: number): string => {
    if (!decimal) {
        return '0';
    }

    let binary = '';

    while (decimal > 0) {
        binary = (decimal % 2).toString() + binary;
        decimal = Math.floor(decimal / 2);
    }

    return binary;
};
