import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import React from 'react';

export const LandsatDynamicModeInfo = () => {
    return (
        <DynamicModeInfo content="In the current map display, the most recent and most cloud free scenes from the Landsat archive are prioritized and dynamically fused into a single mosaicked image layer. As you explore, the map continues to dynamically fetch and render the best available scenes." />
    );
};
