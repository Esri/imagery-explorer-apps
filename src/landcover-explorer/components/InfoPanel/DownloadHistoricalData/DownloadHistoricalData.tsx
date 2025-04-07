import React from 'react';

export const DownloadHistoricalData = () => {
    return (
        <div
            style={
                {
                    '--calcite-button-border-color': 'var(--custom-light-blue)',
                } as React.CSSProperties
            }
        >
            <div className="mb-2">Download</div>
            <calcite-button
                icon-start="download"
                appearance="outline"
                Kind="neutral"
            >
                Download Historical Data
            </calcite-button>
        </div>
    );
};
