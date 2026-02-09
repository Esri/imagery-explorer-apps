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
 * Mapillary API configuration
 * For production use, you should obtain your own API token from:
 * https://www.mapillary.com/developer
 */

// Note: This is a public client token for demonstration purposes
// In production, you should use your own token and protect it appropriately
export const MAPILLARY_CLIENT_TOKEN = 'MLY|4142433049200173|72206abe5035850d6743b23a49c41333';

export const MAPILLARY_GRAPH_API = 'https://graph.mapillary.com';
export const MAPILLARY_VIEWER_URL = 'https://www.mapillary.com/app';

/**
 * Mapillary vector tiles URL for coverage visualization
 * Uses the sequence layer to show where street-level imagery is available
 */
export const MAPILLARY_TILES_URL =
    'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=' +
    MAPILLARY_CLIENT_TOKEN;
