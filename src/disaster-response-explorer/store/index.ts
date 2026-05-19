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

import configureAppStore from '@shared/store/configureStore';
import { getPreloadedState4DRX } from './getPreloadedState4DRX';
import { DisasterResponseEvent } from '@shared/store/DisasterResponse/reducer';

/**
 * Get the redux store for Disaster Response Explorer
 *
 * @param events list of disaster response events to be displayed in the dropdown for selection
 * @returns
 */
export const getDRXStore = ({
    events,
}: {
    events: DisasterResponseEvent[];
}) => {
    const preloadedState = getPreloadedState4DRX({
        events,
    });
    return configureAppStore(preloadedState);
};
