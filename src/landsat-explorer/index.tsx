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

(async () => {
    const store = await getLandsatExplorerStore();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={store}>
            <ErrorBoundary>
                <Map />
                <Layout />
                <AboutLandsatExplorer />
            </ErrorBoundary>
        </ReduxProvider>
    );
})();
