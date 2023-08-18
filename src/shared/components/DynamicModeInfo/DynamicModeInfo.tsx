import React from 'react';

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-sm ml-4 xl:ml-10">
            <div className="text-center mb-3">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            <p className="text-sm opacity-80">
                In the current map display, the most recent and most cloud free
                scenes from the Landsat archive are prioritized and dynamically
                fused into a single mosaicked image layer. As you explore, the
                map continues to dynamically fetch and render the best available
                scenes.
            </p>
        </div>
    );
};
