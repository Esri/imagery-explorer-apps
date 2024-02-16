import '@shared/styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';
import AppLayout from './components/AppLayout/AppLayout';
import { loadServiceInfo } from './services/sentinel-2-10m-landcover/loadServiceInfo';
import { ErrorPage } from './components/ErrorPage';
import { initEsriOAuth } from './utils/esriOAuth';
import { APP_ID } from './constants';

(async () => {
    const root = createRoot(document.getElementById('root'));

    try {
        await initEsriOAuth({
            appId: APP_ID,
        });

        // Load service information (Raster Attributes, Time Extent and etc) of Sentinel-2-10m-Landcover layer
        await loadServiceInfo();

        const preloadedState = getPreloadedState();

        root.render(
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppLayout />
            </ReduxProvider>
        );
    } catch (err) {
        root.render(<ErrorPage />);
    }
})();
