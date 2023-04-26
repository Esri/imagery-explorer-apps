import '../../styles/index.css';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <div>{IMAGERY_SERVICE}</div>
        </ErrorBoundary>
    );
};

export default AppLayout;
