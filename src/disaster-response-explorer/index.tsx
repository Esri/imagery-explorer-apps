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

import { getDRXStore } from './store';
import { AppLayout } from './components/AppLayout/AppLayout';
import { ErrorPage } from '@shared/components/ErrorPage';
import '@shared/components/calcite-components';
import { initializeApp } from '@shared/utils/initialize-app/initializeApp';
import { DISASTER_RESPONSE_EXPLORER_APP_ID } from '@shared/config';
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';
import { Map } from './components/Map/Map';
import { getDistinctListOfEvents } from '@shared/services/disaster-response/getListOfEvents';
import { AboutDisasterResponseExplorer } from './components/About';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initializeApp({
            appId: DISASTER_RESPONSE_EXPLORER_APP_ID,
        });

        const events = await getDistinctListOfEvents();
        // console.log('fetched events: ', events);

        const store = getDRXStore({
            events,
        });

        root.render(
            <ReduxProvider store={store}>
                <ErrorBoundary>
                    <Map />
                    <AppLayout />
                    <AboutDisasterResponseExplorer />
                </ErrorBoundary>
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage error={err} />);
    }
})();
