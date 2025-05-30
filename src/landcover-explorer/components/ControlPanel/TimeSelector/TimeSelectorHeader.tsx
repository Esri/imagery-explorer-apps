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
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import HeaderText from '../HeaderText/HeaderText';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const TimeSelectorHeader = () => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectMapMode);

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    return (
        <HeaderText
            title={`${
                shouldShowSentinel2Layer
                    ? t('sentinel_layer_title', { ns: APP_NAME })
                    : t('land_cover_layer_title', { ns: APP_NAME })
            }`}
            subTitle={
                mode === 'swipe'
                    ? t('swipe_mode_subtitle', { ns: APP_NAME })
                    : t('animate_mode_subtitle', { ns: APP_NAME })
            }
        />
    );
};
