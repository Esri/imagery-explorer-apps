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

import React from 'react';
import About from '@landcover-explorer/components/About/About';
// import AppTitle from '@landcover-explorer/components/AppTitle/AppTitle';
import ControlPanel from '@landcover-explorer/components/ControlPanel/ControlPanel';
import DownloadPanel from '@landcover-explorer/components/DownloadPanel/DownloadPanel';
import ErrorBoundary from '@landcover-explorer/components/ErrorBoundary/ErrorBoundary';
import InfoPanel from '@landcover-explorer/components/InfoPanel/InfoPanel';
// import MapView from '@landcover-explorer/components/MapView/MapViewContainer';
import { Sentinel2LandCoverSaveWebMap } from '@landcover-explorer/components/SaveWebMap';
import { AppHeader } from '@shared/components/AppHeader';
import { APP_NAME, appConfig } from '@shared/config';
import { useSaveAppState2HashParams } from '@landcover-explorer/hooks/useSaveAppState2HashParams';
import { useRevalidateToken } from '@shared/hooks/useRevalidateToken';
import { useTranslation } from 'react-i18next';
import { Sentinel2LandcoverMapView } from '../MapView/Sentinel2LandcoverMapView';

const AppLayout = () => {
    const { t } = useTranslation();
    useSaveAppState2HashParams();
    useRevalidateToken();

    return (
        <ErrorBoundary>
            <Sentinel2LandcoverMapView />
            <ControlPanel />
            <InfoPanel />
            <DownloadPanel />
            {/* <AppTitle /> */}
            <About />
            <Sentinel2LandCoverSaveWebMap />
            <AppHeader
                title={t('esri_land_cover_explorer_title', {
                    ns: APP_NAME,
                })}
            />
        </ErrorBoundary>
    );
};

export default AppLayout;
