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
import {
    NLCD_LANDCOVER_EXPLORER_APP_ID,
    AGOL_PORTAL_ROOT,
} from '@shared/config';
// import { loadNLCDLandcoverServiceInfo } from '@shared/services/nlcd-landcover/loadServiceInfo';
import { setImageryServiceFieldNames } from '@landcover-explorer/components/SatelliteImageryLayer/exportSatelliteImage';
import { FIELD_NAMES } from '@shared/services/landsat-level-2/config';
import { getNLCDLandCoverRasterAttributeTable } from '@shared/services/nlcd-landcover/classifications';
import { loadTimeInfo } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { NLCD_LANDCOVER_IMAGE_SERVICE_URL } from '@shared/services/nlcd-landcover/config';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initI18next(APP_LANGUAGE);

        await initEsriOAuth({
            appId: NLCD_LANDCOVER_EXPLORER_APP_ID,
            portalUrl: AGOL_PORTAL_ROOT,
        });

        // // Load service information (Raster Attributes, Time Extent and etc) of NLCD Landcover layer
        // await loadNLCDLandcoverServiceInfo();
        await getNLCDLandCoverRasterAttributeTable();
        const timeInfo = await loadTimeInfo(NLCD_LANDCOVER_IMAGE_SERVICE_URL);

        // set the field names for the lansat imagery service,
        // these field names are used for the export satellite image functionality
        // in the AnimationPanel component
        setImageryServiceFieldNames({
            AcquisitionDate: FIELD_NAMES.ACQUISITION_DATE,
            CloudCover: FIELD_NAMES.CLOUD_COVER,
        });

        const store = getNLCDLandcoverExplorerStore(timeInfo);

        root.render(
            <ReduxProvider store={store}>
                <AppLayout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
