import React from 'react';

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-xl mx-auto lg:mx-20">
            <div className="text-center mb-12">
                <span className="uppercase text-sm">Dynamic View</span>
            </div>

            <p className="text-sm italic opacity-50">
                In the current map display, the most recent and most cloud free
                scenes from the Landsat archive are prioritized and dynamically
                fused into a single mosaicked image layer. As you explore, the
                map continues to dynamically fetch and render the best available
                scenes.
            </p>
        </div>
    );
};
