import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import React from 'react';

export const Sentinel1DynamicModeInfo = () => {
    return (
        <DynamicModeInfo content="In the current map display, the most recent scenes from the Sentinel-1 archive are prioritized and dynamically fused into a single mosaicked image layer. As you explore, the map continues to dynamically fetch and display the best available scenes at each location." />
    );
};
