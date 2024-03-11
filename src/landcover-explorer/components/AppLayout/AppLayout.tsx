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

import React from 'react';
import About from '@landcover-explorer/components/About/About';
// import AppTitle from '@landcover-explorer/components/AppTitle/AppTitle';
import ControlPanel from '@landcover-explorer/components/ControlPanel/ControlPanel';
import DownloadPanel from '@landcover-explorer/components/DownloadPanel/DownloadPanel';
import ErrorBoundary from '@landcover-explorer/components/ErrorBoundary/ErrorBoundary';
import InfoPanel from '@landcover-explorer/components/InfoPanel/InfoPanel';
import MapView from '@landcover-explorer/components/MapView/MapViewContainer';
import { SaveWebMap } from '@landcover-explorer/components/SaveWebMap';
import { AppHeader } from '@shared/components/AppHeader';
import { appConfig } from '@shared/config';
import { useSaveAppState2HashParams } from '@landcover-explorer/hooks/useSaveAppState2HashParams';

const AppLayout = () => {
    useSaveAppState2HashParams();

    return (
        <ErrorBoundary>
            <MapView />
            <ControlPanel />
            <InfoPanel />
            <DownloadPanel />
            {/* <AppTitle /> */}
            <About />
            <SaveWebMap />
            <AppHeader title={appConfig.title} />
        </ErrorBoundary>
    );
};

export default AppLayout;
