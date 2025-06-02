import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React, { useMemo } from 'react';
import LandCoverGraphContainer from '../../LandCoverSummaryGraph/LandCoverSummaryGraphContainer';
import { TotalAreaGraph } from '../../LandCoverSummaryGraph/TotalAreaGraph';
import { ChangeCompareGraph } from '../../LandCoverSummaryGraph/ChangeCompareGraph';
import {
    SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION,
    SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL,
} from '@shared/services/sentinel-2-10m-landcover/config';
import { sentinel2LandcoverClassificationDataMap } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';

export const Sentinel2LandCoverGraph = () => {
    const mode = useAppSelector(selectMapMode);

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const animationMode = useAppSelector(selectAnimationStatus);

    const shouldShowChart = useMemo(() => {
        if (animationMode) {
            return false;
        }

        if (shouldShowSentinel2Layer) {
            return isSentinel2LayerOutOfVisibleRange === false;
        }

        return true;
    }, [
        animationMode,
        shouldShowSentinel2Layer,
        isSentinel2LayerOutOfVisibleRange,
    ]);

    const mapOfLandCoverClassificationPixelValues = useMemo(() => {
        return sentinel2LandcoverClassificationDataMap;
    }, []);

    return (
        <LandCoverGraphContainer
            showChart={shouldShowChart}
            shouldShowExpandButton={true}
        >
            {mode === 'swipe' ? (
                <ChangeCompareGraph
                    serviceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
                    rasterFunction={SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION}
                    mapOfLandCoverClassificationPixelValues={
                        mapOfLandCoverClassificationPixelValues
                    }
                />
            ) : (
                <TotalAreaGraph
                    serviceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
                    rasterFunction={SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION}
                    mapOfLandCoverClassificationPixelValues={
                        mapOfLandCoverClassificationPixelValues
                    }
                />
            )}
        </LandCoverGraphContainer>
    );
};
