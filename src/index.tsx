import React from 'react';
import { createRoot } from 'react-dom/client';
import AppLayout from './shared/components/AppLayout/AppLayout';
import { Provider as ReduxProvider } from 'react-redux';
import configureAppStore from '@shared/store/configureStore';
import { getPreloadedState } from '@shared/store/getPreloadedState';
import { setDefaultOptions } from 'esri-loader';

(async () => {
    setDefaultOptions({
        version: '4.26',
    });

    const preloadedState = await getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppLayout />
        </ReduxProvider>
    );
})();
