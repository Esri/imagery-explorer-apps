import { LandCoverSummaryGraphContainer } from '@landcover-explorer/components/LandCoverSummaryGraph';
import { useAppSelector } from '@shared/store/configureStore';
import { selectMapMode } from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React, { useMemo } from 'react';

export const NLCDLandCoverSummaryGraph = () => {
    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const shouldShowChart = useMemo(() => {
        if (animationMode) {
            return false;
        }

        return true;
    }, [animationMode]);

    return (
        <LandCoverSummaryGraphContainer
            showChart={shouldShowChart}
            shouldShowExpandButton={false}
        >
            {/* {mode === 'swipe' ? <ChangeCompareGraph /> : <TotalAreaGraph />} */}
            <p>chart goes to here</p>
        </LandCoverSummaryGraphContainer>
    );
};
