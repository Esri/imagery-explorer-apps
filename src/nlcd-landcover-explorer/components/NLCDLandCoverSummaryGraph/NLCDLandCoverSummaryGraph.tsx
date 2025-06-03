import { LandCoverSummaryGraphContainer } from '@landcover-explorer/components/LandCoverSummaryGraph';
import { ChangeCompareGraph } from '@landcover-explorer/components/LandCoverSummaryGraph/ChangeCompareGraph';
import { TotalAreaGraph } from '@landcover-explorer/components/LandCoverSummaryGraph/TotalAreaGraph';
import { nlcdLandcoverClassificationDataMap } from '@shared/services/nlcd-landcover/classifications';
import {
    NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME,
    NLCD_LANDCOVER_IMAGE_SERVICE_URL,
} from '@shared/services/nlcd-landcover/config';
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

    const mapOfLandCoverClassificationPixelValues = useMemo(() => {
        return nlcdLandcoverClassificationDataMap;
    }, []);

    return (
        <LandCoverSummaryGraphContainer
            showChart={shouldShowChart}
            shouldShowExpandButton={false}
            width={500}
        >
            {mode === 'swipe' ? (
                <ChangeCompareGraph
                    serviceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
                    rasterFunction={
                        NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME
                    }
                    mapOfLandCoverClassificationPixelValues={
                        mapOfLandCoverClassificationPixelValues
                    }
                    scale="s"
                />
            ) : (
                <TotalAreaGraph
                    serviceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
                    rasterFunction={
                        NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME
                    }
                    mapOfLandCoverClassificationPixelValues={
                        mapOfLandCoverClassificationPixelValues
                    }
                    scale="s"
                />
            )}
        </LandCoverSummaryGraphContainer>
    );
};
