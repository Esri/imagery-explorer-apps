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
 * Verifies that a range is a [min, max] pair of finite numbers with min <= max.
 */
const isValidRange = (range: number[]): boolean =>
    Array.isArray(range) &&
    range.length === 2 &&
    range.every((val) => Number.isFinite(val)) &&
    range[0] <= range[1];

/**
 * Validates the selected ranges used by the Change Compare Tool in DIEX.
 *
 * selectedRange and selectedRange2 should each be a [min, max] pair, and the max of
 * selectedRange should not exceed the min of selectedRange2. If either range is malformed
 * or that ordering is violated, both ranges fall back to the provided defaults.
 */
export const getValidatedSelectedRanges = (
    selectedRange: number[],
    selectedRange2: number[],
    defaultSelectedRange: number[],
    defaultSelectedRange2: number[]
): {
    selectedRange: number[];
    selectedRange2: number[];
} => {
    if (
        !isValidRange(selectedRange) ||
        !isValidRange(selectedRange2) ||
        selectedRange[1] > selectedRange2[0]
    ) {
        return {
            selectedRange: defaultSelectedRange,
            selectedRange2: defaultSelectedRange2,
        };
    }

    return { selectedRange, selectedRange2 };
};
