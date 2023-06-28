import React from 'react';

export const DynamicModeInfo = () => {
    return (
        <div className="max-w-2xl mx-auto lg:mx-20 mt-8">
            <p className="text-sm">
                One of the many capabilities offered by ArcGIS dynamic image
                services is the ability to dynamically fuse together multiple
                Landsat scenes into a single continuous mosaicked image. In the
                current display, all scenes in the Landsat archive are sorted to
                prioritize and display the most recent and most cloud free
                scenes for the current region of interest. As you explore, the
                map dynamically fetches and renders the best available scenes
                for the current map extent. As you explore, a variety of dynamic
                processing templates can also be applied to the imagery
                displayed.
            </p>
        </div>
    );
};
