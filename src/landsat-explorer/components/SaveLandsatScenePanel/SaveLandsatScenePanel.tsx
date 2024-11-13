import { SavePanel } from '@shared/components/SavePanel';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import React from 'react';

export const LandsatSceneSavePanel = () => {
    return (
        <SavePanel imageryServiceURL={LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL} />
    );
};
