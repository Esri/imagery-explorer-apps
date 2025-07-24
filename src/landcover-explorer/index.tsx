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

import '@shared/styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { getLandcoverExplorerStore } from './store';
import AppLayout from './components/AppLayout/AppLayout';
// import { loadServiceInfo } from '@shared/services/sentinel-2-10m-landcover/loadServiceInfo';
import { initEsriOAuth } from '../shared/utils/esri-oauth';
// import { APP_ID } from './constants';
import { ErrorPage } from '@shared/components/ErrorPage';
import { initI18next } from '@shared/i18n/initI18next';
import { APP_LANGUAGE } from '@shared/constants/UI';
import '@shared/components/calcite-components';
import { AGOL_PORTAL_ROOT, LANDCOVER_EXPLORER_APP_ID } from '@shared/config';
import { loadSentinel2LandcoverRasterAttributeTable } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { loadTimeInfo } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initI18next(APP_LANGUAGE);

        await initEsriOAuth({
            appId: LANDCOVER_EXPLORER_APP_ID,
            portalUrl: AGOL_PORTAL_ROOT,
        });

        // Load service information (Raster Attributes, Time Extent and etc) of Sentinel-2-10m-Landcover layer
        await loadSentinel2LandcoverRasterAttributeTable();
        const timeInfo = await loadTimeInfo(
            SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL
        );

        const store = getLandcoverExplorerStore(timeInfo);

        root.render(
            <ReduxProvider store={store}>
                <AppLayout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
