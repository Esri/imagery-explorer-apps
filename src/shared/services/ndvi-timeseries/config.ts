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

const isLocalDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

/**
 * When running locally the request goes to the local server on 127.0.0.1.
 * In production it hits the Cloud Function.
 */
export const NDVI_TIMESERIES_ENDPOINT = isLocalDev
    ? 'http://127.0.0.1:8000'
    : 'https://europe-west6-restor-gis.cloudfunctions.net/ndvi-timeseries';
