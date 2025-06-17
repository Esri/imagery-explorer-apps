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
import '@shared/components/calcite-components';

import { getNLCDLandcoverExplorerStore } from './store';
import { AppLayout } from './components/AppLayout/AppLayout';
import { initEsriOAuth } from '../shared/utils/esri-oauth';
import { ErrorPage } from '@shared/components/ErrorPage';
import { initI18next } from '@shared/i18n/initI18next';
import { APP_LANGUAGE } from '@shared/constants/UI';
import { APP_ID } from '@shared/config';
import { loadNLCDLandcoverServiceInfo } from '@shared/services/nlcd-landcover/loadServiceInfo';
import { setImageryServiceFieldNames } from '@landcover-explorer/components/SatelliteImageryLayer/exportSatelliteImage';
import { FIELD_NAMES } from '@shared/services/landsat-level-2/config';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initEsriOAuth({
            appId: APP_ID,
        });

        await initI18next(APP_LANGUAGE);

        // Load service information (Raster Attributes, Time Extent and etc) of NLCD Landcover layer
        await loadNLCDLandcoverServiceInfo();

        // set the field names for the lansat imagery service,
        // these field names are used for the export satellite image functionality
        // in the AnimationPanel component
        setImageryServiceFieldNames({
            AcquisitionDate: FIELD_NAMES.ACQUISITION_DATE,
            CloudCover: FIELD_NAMES.CLOUD_COVER,
        });

        const store = getNLCDLandcoverExplorerStore();

        root.render(
            <ReduxProvider store={store}>
                <AppLayout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
