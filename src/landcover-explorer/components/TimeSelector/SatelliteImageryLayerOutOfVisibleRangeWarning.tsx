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
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

type SatelliteImageryLayerOutOfVisibleRangeWarningProps = {
    satelliteName: string;
};

export const SatelliteImageryLayerOutOfVisibleRangeWarning: FC<
    SatelliteImageryLayerOutOfVisibleRangeWarningProps
> = ({ satelliteName }) => {
    const mode = useAppSelector(selectMapMode);

    const { t } = useTranslation();

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    if (!isSatelliteImagertLayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="mt-6 text-center text-sm opacity-50">
            <p>
                {mode === 'swipe'
                    ? t('swipe_mode_zoom_message', { layerName: satelliteName })
                    : t('animate_mode_zoom_message')}
            </p>
        </div>
    );
};
