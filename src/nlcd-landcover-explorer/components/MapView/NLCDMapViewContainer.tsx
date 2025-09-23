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
import {
    LANDSAT_LEVEL_2_SERVICE_URL,
    LANDSAT_NATIVE_SCALE,
} from '@shared/services/landsat-level-2/config';
import { NLCDLandCoverPopup } from '../NLCDPopup/NLCDPopup';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { selectShouldShowSatelliteImageryLayer } from '@shared/store/LandcoverExplorer/selectors';
import { LandCoverLayerBlendMode } from '@landcover-explorer/components/LandcoverLayer/useLandCoverLayer';
import AnimationPanel from '@landcover-explorer/components/AnimationPanel/AnimationPanel';
// import { selectIsSatelliteImageryLayerOutOfVisibleRange } from '@shared/store/LandcoverExplorer/selectors';

export const NLCDLandcoverMapViewContainer = () => {
    const { t } = useTranslation();

    const rasterFunctionName = useNLCDLandCoverLayerRasterFunctionName();

    const shouldShowSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    return (
        <LandcoverExplorerMapViewContainer
            // landCoverServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
            // landcoverLayerRasterFunctionName={rasterFunctionName}
            attribution={t('map_attribution', { ns: APP_NAME })}
            // satellteImageryServiceUrl={LANDSAT_LEVEL_2_SERVICE_URL}
            nameOfSatelliteImageryLayer={'Landsat'}
            // isSatelliteImageryOutOfVisibleRange={
            //     isSatelliteImageryLayerOutOfVisibleRange
            // }
            nativeScale={LANDSAT_NATIVE_SCALE}
        >
            {/* 
            <Popup /> */}
            <GroupLayer
                index={1}
                // no need to apply blend mode if the satellite imagery layer is shown
                // as the satellite imagery layer hould not be blended with the world imagery basemap beneath it
                blendMode={
                    shouldShowSatelliteImageryLayer === false
                        ? LandCoverLayerBlendMode
                        : null
                }
            >
                <NLCDLandcoverLayer />
                <LandsatLayer />

                <SwipeWidget4LandsatLayers />

                <SwipeWidget4Landcover
                    serviceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
                    rasterFunctionName={rasterFunctionName}
                />

                <AnimationPanel
                    landCoverServiceUrl={NLCD_LANDCOVER_IMAGE_SERVICE_URL}
                    satellteImageryServiceUrl={LANDSAT_LEVEL_2_SERVICE_URL}
                    landcoverLayerRasterFunctionName={rasterFunctionName}
                    animationMetadataSources={t('animation_metadata', {
                        ns: APP_NAME,
                    })}
                />
            </GroupLayer>

            <HillshadeLayer />
            <NLCDLandCoverPopup />
        </LandcoverExplorerMapViewContainer>
    );
};
