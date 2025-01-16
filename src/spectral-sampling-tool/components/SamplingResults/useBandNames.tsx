import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import { SENTINEL2_BAND_NAMES } from '@shared/services/sentinel-2/config';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useBandNames = (numOfBandsToDisplay: number) => {
    const targetService = useSelector(selectTargetService);

    const bandNames = useMemo(() => {
        if (targetService === 'landsat') {
            return LANDSAT_BAND_NAMES.slice(0, numOfBandsToDisplay);
        }

        if (targetService === 'sentinel-2') {
            return SENTINEL2_BAND_NAMES.slice(0, numOfBandsToDisplay);
        }

        return [];
    }, [targetService]);

    return bandNames;
};
