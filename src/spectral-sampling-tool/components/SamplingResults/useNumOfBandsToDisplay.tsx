import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useNumOfBandsToDisplay = () => {
    const targetService = useSelector(selectTargetService);

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
