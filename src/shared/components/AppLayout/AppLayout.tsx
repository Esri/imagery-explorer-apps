import '../../styles/index.css';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import MapView from '../MapView/MapViewContainer';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <MapView></MapView>
        </ErrorBoundary>
    );
};

export default AppLayout;
