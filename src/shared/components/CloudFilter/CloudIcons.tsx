import React from 'react';

export const CloudIcons = () => {
    return (
        <div className="relative h-cloud-slider-height ml-1">
            <div className="absolute top-[-6px]">
                {/* use online icon to indicate with cloud */}
                <calcite-icon scale="s" icon="online" />
            </div>

            <div className="absolute bottom-[-12px]">
                {/* use offline icon to indicate non-cloud */}
                <calcite-icon scale="s" icon="offline" />
            </div>
        </div>
    );
};
