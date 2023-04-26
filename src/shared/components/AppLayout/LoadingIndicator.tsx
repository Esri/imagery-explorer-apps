import React from 'react';

const LoadingIndicator = () => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen z-10">
            <calcite-loader></calcite-loader>
        </div>
    );
};

export default LoadingIndicator;
