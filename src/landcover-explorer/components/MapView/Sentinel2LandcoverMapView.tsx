import React from 'react';
import { LandcoverExplorerMapViewContainer } from '.';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { SwipeWidget4Landcover, SwipeWidget4Sentinel2 } from '../SwipeWidget';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
// import Popup from '../Popup/Popup';
import { useSentinel2LandCoverLayerRasterFunctionName } from '../LandcoverLayer/useSentinel2LandCoverLayerRasterFunctionName';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';
import {
    SENTINEL2_NATIVE_SCALE,
    SENTINEL_2_SERVICE_URL,
} from '@shared/services/sentinel-2/config';
import { Sentinel2LandCoverPopup } from '../Popup/Sentinel2LandCoverPopup';
import { HillshadeLayer } from '@shared/components/HillshadeLayer/HillshadeLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { LandCoverLayerBlendMode } from '../LandcoverLayer/useLandCoverLayer';
import { useAppSelector } from '@shared/store/configureStore';
import { selectShouldShowSatelliteImageryLayer } from '@shared/store/LandcoverExplorer/selectors';

export const Sentinel2LandcoverMapView = () => {
    const { t } = useTranslation();

    const rasterFunctionName = useSentinel2LandCoverLayerRasterFunctionName();

    const shouldShowSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    return (
        <LandcoverExplorerMapViewContainer
            landCoverServiceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
            landcoverLayerRasterFunctionName={rasterFunctionName}
            attribution={t('map_attribution', { ns: APP_NAME })}
            nameOfSatelliteImageryLayer={'Sentinel-2'}
            satellteImageryServiceUrl={SENTINEL_2_SERVICE_URL}
            // isSatelliteImageryOutOfVisibleRange={
            //     isSatelliteImagertLayerOutOfVisibleRange
            // } // This should be derived from state or props
            nativeScale={SENTINEL2_NATIVE_SCALE} // Sentinel-2 10m resolution
        >
            {/**
             * Add Sentinel-2 layer and Landcover layer inside a GroupLayer so that they can be placed under the hillshade layer
             */}
            <GroupLayer
                index={1}
                blendMode={
                    // no need to apply blend mode if the satellite imagery layer is shown
                    // as the satellite imagery layer hould not be blended with the world imagery basemap beneath it
                    shouldShowSatelliteImageryLayer === false
                        ? LandCoverLayerBlendMode
                        : null
                }
            >
                <Sentinel2Layer />
                <LandcoverLayer />
                <SwipeWidget4Landcover
                    serviceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
                    rasterFunctionName={rasterFunctionName}
                    // mapView={undefined} // Assuming mapView is not needed here
                />
                <SwipeWidget4Sentinel2 />
            </GroupLayer>

            <HillshadeLayer />
            {/* <Popup /> */}
            <Sentinel2LandCoverPopup />
        </LandcoverExplorerMapViewContainer>
    );
};
