import React, { Suspense, lazy } from 'react';

const LandsatInfo = lazy(
    () =>
        import(
            /* webpackChunkName: "landsat-dynamic-mode" */
            './LandsatInfo'
        )
);

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-sm ml-4 xl:ml-10">
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            <Suspense fallback={<calcite-loader></calcite-loader>}>
                {APP_NAME === 'landsat' && <LandsatInfo />}
            </Suspense>
        </div>
    );
};
