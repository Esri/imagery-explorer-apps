import React from 'react';

export const ExpandedSpectralProfileChartHeader = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex items-center">
                <div className="bg-white w-[16px] h-[2px]"></div>
                <h4 className="ml-3">Spectral Profile of Selected Location</h4>
            </div>

            <calcite-icon
                class="cursor-pointer mx-4"
                title="Save the chart as an image"
                icon="camera"
                scale="s"
            />

            <calcite-icon
                class="cursor-pointer"
                title="Save profiles as a table"
                icon="table"
                scale="s"
            />
        </div>
    );
};
