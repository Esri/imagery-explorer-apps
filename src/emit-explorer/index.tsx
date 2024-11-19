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
//import { getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
import { getTimeExtentOfEmitService } from '@shared/services/emit-level-2a/getTimeExtent';
import AppContextProvider from '@shared/contexts/AppContextProvider';
//import { LANDSAT_RASTER_FUNCTION_INFOS } from '@shared/services/landsat-level-2/config';
import { EMIT_RASTER_FUNCTION_INFOS } from '@shared/services/emit-level-2a/config';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        const store = await getLandsatExplorerStore();

        const timeExtent = await getTimeExtentOfEmitService();
        console.log(timeExtent);

        root.render(
            <ReduxProvider store={store}>
                <AppContextProvider
                    timeExtent={timeExtent}
                    rasterFunctionInfo={EMIT_RASTER_FUNCTION_INFOS}
                >
                    <ErrorBoundary>
                        <Map />
                        <Layout />
                        <AboutLandsatExplorer />
                    </ErrorBoundary>
                </AppContextProvider>
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
