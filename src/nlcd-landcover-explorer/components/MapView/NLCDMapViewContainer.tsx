import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { LandcoverExplorerMapViewContainer } from '@landcover-explorer/components/MapView';
import { NLCDLandcoverLayer } from '../NLCDLandcoverLayer/NLCDLandcoverLayer';
import { SwipeWidget4Landcover } from '@landcover-explorer/components/SwipeWidget';
import { NLCD_LANDCOVER_IMAGE_SERVICE_URL } from '@shared/services/nlcd-landcover/config';
import { useNLCDLandCoverLayerRasterFunctionName } from '../NLCDLandcoverLayer/useNLCDLandCoverLayerRasterFunctionName';
import { LandsatLayer } from '../LandsatLayer/LandsatLayer';
import { SwipeWidget4LandsatLayers } from '../SwipeWidget/SwipeWidget4Landsat';
import { LANDSAT_NATIVE_SCALE } from '@shared/services/landsat-level-2/config';
// import { selectIsSatelliteImageryLayerOutOfVisibleRange } from '@shared/store/LandcoverExplorer/selectors';

export const NLCDLandcoverMapViewContainer = () => {
    const { t } = useTranslation();

    const rasterFunctionName = useNLCDLandCoverLayerRasterFunctionName();

    // const isSatelliteImageryLayerOutOfVisibleRange = useAppSelector(
    //     selectIsSatelliteImageryLayerOutOfVisibleRange
    // );

    return (
        <LandcoverExplorerMapViewContainer
            landCoverServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
            landcoverLayerRasterFunctionName={rasterFunctionName}
            attribution={t('map_attribution', { ns: APP_NAME })}
            nameOfSatelliteImageryLayer={'Landsat'}
            // isSatelliteImageryOutOfVisibleRange={
            //     isSatelliteImageryLayerOutOfVisibleRange
            // }
            nativeScale={LANDSAT_NATIVE_SCALE}
        >
            {/* 
            <Popup /> */}

            <NLCDLandcoverLayer />
            <LandsatLayer />
            <SwipeWidget4Landcover
                serviceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
                rasterFunctionName={rasterFunctionName}
            />
            <SwipeWidget4LandsatLayers />
        </LandcoverExplorerMapViewContainer>
    );
};
