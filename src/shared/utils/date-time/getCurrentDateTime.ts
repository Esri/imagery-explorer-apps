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
 * Get current year based on UTC time
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentYear = () => {
    return new Date().getUTCFullYear();
};

/**
 * Get current month based on UTC time
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentMonth = () => {
    return new Date().getUTCMonth() + 1;
};
