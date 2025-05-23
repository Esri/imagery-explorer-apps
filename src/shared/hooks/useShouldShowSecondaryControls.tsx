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

import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * This custom hook returns a boolean value indicates if the secondary controls should be shown
 * @returns {boolean} If true, show secondary controls next to mode selectors
 */
export const useShouldShowSecondaryControls = () => {
    const mode = useAppSelector(selectAppMode);

    const shouldShowSecondaryControls =
        mode === 'swipe' || mode === 'animate' || mode === 'analysis';

    return shouldShowSecondaryControls;
};
