import React from 'react';
import { ScreenshotSaver } from './ScreenshotSaver';

export const ExpandedSpectralProfileChartHeader = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex items-center">
                <div className="bg-white w-[16px] h-[2px]"></div>
                <h4 className="ml-3">Spectral Profile of Selected Location</h4>
            </div>

            <ScreenshotSaver />

            <calcite-icon
                class="cursor-pointer"
                title="Save profiles as a table"
                icon="table"
                scale="s"
            />
        </div>
    );
};
