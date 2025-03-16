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

import { getAppLanguage } from '@shared/i18n/getAppLanguage';
import { isMobileDevice } from 'helper-toolkit-ts';

/**
 * The language to use for the app. This is set by the `lang` query parameter in the URL.
 */
export const APP_LANGUAGE = getAppLanguage();

/**
 * default format that will be used to format datetime info in the app.
 *
 * Here is an example of a formatted datetime using this format
 * @example
 * `Feb 03, 2023`
 */
export const DATE_FORMAT =
    APP_LANGUAGE === 'en' ? `MMM dd, yyyy` : 'yyyy-MM-dd';

export const DATE_FORMAT_TEMPORAL_PROFILE =
    APP_LANGUAGE === 'en' ? `LLL yyyy` : 'yyyy-MM-dd';

/**
 * if true, user is using this app via a mobile device
 */
export const IS_MOBILE_DEVICE = isMobileDevice();

/**
 * size of Map Anchor Icon Image used by Pop Up and Map Center indicator
 */
export const SizeOfMapAnchorImage = 44;

/**
 * milliseconds to wait before turn off the copy link message
 */
export const COPIED_LINK_MESSAGE_TIME_TO_STAY_OPEN_IN_MILLISECONDS = 3000;

/**
 * content of copy link message
 */
// export const COPIED_LINK_MESSAGE_STRING = 'link copied to clipboard';

// /**
//  * tooltip content for the renderer tooltip
//  */
// export const RENDERER_TOOLTIP = `{{satellite}} sensors collect imagery at distinct ranges along the electromagnetic spectrum. These “bands” of imagery can be combined to create renderings of the Earth for a variety of applications.`;
