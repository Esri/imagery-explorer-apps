import React from 'react';
import About from '@landcover-explorer/components/About/About';
import AppTitle from '@landcover-explorer/components/AppTitle/AppTitle';
import ControlPanel from '@landcover-explorer/components/ControlPanel/ControlPanel';
import DownloadPanel from '@landcover-explorer/components/DownloadPanel/DownloadPanel';
import ErrorBoundary from '@landcover-explorer/components/ErrorBoundary/ErrorBoundary';
import InfoPanel from '@landcover-explorer/components/InfoPanel/InfoPanel';
import MapView from '@landcover-explorer/components/MapView/MapViewContainer';
import { SaveWebMap } from '@landcover-explorer/components/SaveWebMap';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <MapView />
            <ControlPanel />
            <InfoPanel />
            <DownloadPanel />
            <AppTitle />
            <About />
            <SaveWebMap />
        </ErrorBoundary>
    );
};

export default AppLayout;
