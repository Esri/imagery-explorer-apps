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

import { isMobileDevice } from 'helper-toolkit-ts';

/**
 * default format that will be used to format datetime info in the app.
 *
 * Here is an example of a formatted datetime using this format
 * @example
 * `Feb 03, 2023`
 */
export const DATE_FORMAT = `MMM dd, yyyy`;

/**
 * if true, user is using this app via a mobile device
 */
export const IS_MOBILE_DEVICE = isMobileDevice();

/**
 * size of Map Anchor Icon Image used by Pop Up and Map Center indicator
 */
export const SizeOfMapAnchorImage = 44;
