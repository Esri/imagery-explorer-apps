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
import { getLandsatExplorerStore } from './store';
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';
import Map from './components/Map/Map';
import Layout from './components/Layout/Layout';
import { AboutLandsatExplorer } from './components/About';
import { ErrorPage } from '@shared/components/ErrorPage';
// import { getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
// import AppContextProvider from '@shared/contexts/AppContextProvider';
// import { LANDSAT_RASTER_FUNCTION_INFOS } from '@shared/services/landsat-level-2/config';
import { AGOL_PORTAL_ROOT, LANDSAT_EXPLORER_APP_ID } from '@shared/config';
// import { initEsriOAuth } from '@shared/utils/esri-oauth';
// import { initI18next } from '@shared/i18n/initI18next';
// import { APP_LANGUAGE } from '@shared/constants/UI';
import '@shared/components/calcite-components';
import { initializeApp } from '@shared/utils/initialize-app/initializeApp';
// import { getTranslatedLandsatRasterFunctionInfo } from './utils/getTranslatedLandsatRasterFunctionInfo';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        // await initI18next(APP_LANGUAGE);

        // await initEsriOAuth({
        //     appId: LANDSAT_EXPLORER_APP_ID,
        //     portalUrl: AGOL_PORTAL_ROOT,
        // });

        await initializeApp({
            appId: LANDSAT_EXPLORER_APP_ID,
        });

        const store = await getLandsatExplorerStore();

        root.render(
            <ReduxProvider store={store}>
                <ErrorBoundary>
                    <Map />
                    <Layout />
                    <AboutLandsatExplorer />
                </ErrorBoundary>
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
