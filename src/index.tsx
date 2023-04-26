import React from 'react';
import { createRoot } from 'react-dom/client';
import AppLayout from './shared/components/AppLayout/AppLayout';
import { Provider as ReduxProvider } from 'react-redux';
import configureAppStore, {
    getPreloadedState,
} from './shared/store/configureStore';

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <ReduxProvider store={configureAppStore(preloadedState)}>
            <AppLayout />
        </ReduxProvider>
    );
})();
