import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useNumOfBandsToDisplay = () => {
    const targetService = useAppSelector(selectTargetService);

    const numOfBandsToDisplay = useMemo(() => {
        if (targetService === 'landsat') {
            return 7;
        } else if (targetService === 'sentinel-2') {
            return 12;
        } else {
            return 0;
        }
    }, [targetService]);

    return numOfBandsToDisplay;
};
