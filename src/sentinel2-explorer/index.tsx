// import '@arcgis/core/assets/esri/themes/dark/main.css';
import '@shared/styles/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import ErrorBoundary from '@shared/components/ErrorBoundary/ErrorBoundary';
import { About } from '@shared/components/About';
import Map from './components/Map/Map';
import Layout from './components/Layout/Layout';
import { getSentinel2ExplorerStore } from './store';

(async () => {
    const store = await getSentinel2ExplorerStore();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={store}>
            <ErrorBoundary>
                <Map />
                <Layout />
                <About />
            </ErrorBoundary>
        </ReduxProvider>
    );
})();
