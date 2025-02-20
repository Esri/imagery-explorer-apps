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

// import '@arcgis/core/assets/esri/themes/dark/main.css';
import '@shared/styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';
import { About } from '@shared/components/About';
import Map from './components/Map/Map';
import Layout from './components/Layout/Layout';
import { getSpectralSampingToolStore } from './store';
import AppContextProvider from '@shared/contexts/AppContextProvider';
import {
    getTargetService,
    getTimeExtentByTargetService,
    getRasterFunctionInfoByTargetService,
} from './utils/getTargetService';
import { initEsriOAuth } from '@shared/utils/esri-oauth';
import { AGOL_PORTAL_ROOT, appConfig } from '@shared/config';

(async () => {
    await initEsriOAuth({
        appId: appConfig.appId,
        portalUrl: AGOL_PORTAL_ROOT,
    });

    const root = createRoot(document.getElementById('root'));

    const targetService = getTargetService();

    const store = getSpectralSampingToolStore(targetService);

    const timeExtent = await getTimeExtentByTargetService(targetService);
    console.log('timeExtent', timeExtent);

    const rasterFunctionInfo =
        getRasterFunctionInfoByTargetService(targetService);

    root.render(
        <ReduxProvider store={store}>
            <AppContextProvider
                timeExtent={timeExtent}
                rasterFunctionInfo={rasterFunctionInfo}
            >
                <ErrorBoundary>
                    <Map />
                    <Layout />
                    <About />
                </ErrorBoundary>
            </AppContextProvider>
        </ReduxProvider>
    );
})();
