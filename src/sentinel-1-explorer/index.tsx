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
import { getSentinel1ExplorerStore } from './store';
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';
import { Map } from './components/Map/Map';
import { Layout } from './components/Layout/Layout';
import { AboutSentinel1Explorer } from './components/About';
import { ErrorPage } from '@shared/components/ErrorPage';
import { getTimeExtentOfSentinel1Service } from '@shared/services/sentinel-1/getTimeExtent';
import AppContextProvider from '@shared/contexts/AppContextProvider';
import { SENTINEL1_RASTER_FUNCTION_INFOS } from '@shared/services/sentinel-1/config';
import { Sentinel1DocPanel } from './components/DocPanel';
import { initEsriOAuth } from '@shared/utils/esri-oauth';
import { AGOL_PORTAL_ROOT, APP_ID } from '@shared/config';
import { initI18next } from '@shared/i18n/initI18next';
import { getTranslatedSentinel1RasterFunctionInfo } from './utils/getTranslatedSentinel1RasterFunctionInfo';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initEsriOAuth({
            appId: APP_ID,
            portalUrl: AGOL_PORTAL_ROOT,
        });

        await initI18next();

        const store = await getSentinel1ExplorerStore();

        const timeExtent = await getTimeExtentOfSentinel1Service();
        // console.log(timeExtent);

        root.render(
            <ReduxProvider store={store}>
                <AppContextProvider
                    timeExtent={timeExtent}
                    rasterFunctionInfo={getTranslatedSentinel1RasterFunctionInfo(
                        SENTINEL1_RASTER_FUNCTION_INFOS
                    )}
                >
                    <ErrorBoundary>
                        <Map />
                        <Layout />
                        <AboutSentinel1Explorer />
                        <Sentinel1DocPanel />
                    </ErrorBoundary>
                </AppContextProvider>
            </ReduxProvider>
        );
    } catch (err) {
        console.log(err);
        root.render(<ErrorPage error={err} />);
    }
})();
