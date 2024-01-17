import { APP_NAME } from '@shared/config';
import React from 'react';
import LandsatInfo from './LandsatInfo';

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-sm ml-4 2xl:ml-10">
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            {APP_NAME === 'landsat' && <LandsatInfo />}
        </div>
    );
};
