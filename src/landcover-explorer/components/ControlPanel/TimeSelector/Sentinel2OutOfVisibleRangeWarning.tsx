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

import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const Sentinel2OutOfVisibleRangeWarning = () => {
    const mode = useAppSelector(selectMapMode);

    const { t } = useTranslation();

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    if (!isSentinel2LayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="mt-6 text-center text-sm opacity-50">
            <p>
                {mode === 'swipe'
                    ? t('swipe_mode_zoom_message', { ns: APP_NAME })
                    : t('animate_mode_zoom_message', { ns: APP_NAME })}
            </p>
        </div>
    );
};
