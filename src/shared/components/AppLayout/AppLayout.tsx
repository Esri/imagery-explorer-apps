import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import LoadingIndicator from './LoadingIndicator';
import { About } from '../About';

const LandsatLayout = lazy(
    () =>
        import(
            /* webpackChunkName: "landsat" */
            '../../../landsat-explorer/components/Layout/Layout'
        )
);

const LandsatMap = lazy(
    () =>
        import(
            /* webpackChunkName: "landsat-map" */
            '../../../landsat-explorer/components/Map/Map'
        )
);

const Sentinel2Layout = lazy(
    () =>
        import(
            /* webpackChunkName: "sentinel2" */
            '../../../sentinel2-explorer/components/Layout/Layout'
        )
);

const Sentinel2Map = lazy(
    () =>
        import(
            /* webpackChunkName: "sentinel2-map" */
            '../../../sentinel2-explorer/components/Map/Map'
        )
);

const AppLayout = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingIndicator />}>
                {IMAGERY_SERVICE === 'landsat' && <LandsatMap />}
                {IMAGERY_SERVICE === 'landsat' && <LandsatLayout />}
                {IMAGERY_SERVICE === 'sentinel-2' && <Sentinel2Map />}
                {IMAGERY_SERVICE === 'sentinel-2' && <Sentinel2Layout />}
                <About />
            </Suspense>
        </ErrorBoundary>
    );
};

export default AppLayout;
