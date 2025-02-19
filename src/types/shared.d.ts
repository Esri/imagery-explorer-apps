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

export type InterestingPlaceData = {
    /**
     * name of this interesting place
     */
    name: string;
    /**
     * location info of this interesting place
     */
    location: {
        center: number[];
        zoom: number;
    };
    /**
     * name of the raster function associated with this Interesting place
     */
    renderer: string;
    /**
     * url of thumbnail image
     */
    thumbnail: string;
    /**
     * longer name that can be used in tooltip title
     */
    label?: string;
    /**
     * description of this place
     */
    description?: string;
};

/**
 * Date range object
 *
 * @example
 * ```
 * {
 *   startDate: '2024-01-01',
 *   endDate: '2024-12-31'
 * }
 * ```
 */
export type DateRange = {
    /**
     * start date in format of `YYYY-MM-DD`.
     */
    startDate: string;
    /**
     * end date in format of `YYYY-MM-DD`.
     */
    endDate: string;
};
