import React from 'react';
import { LandcoverExplorerMapViewContainer } from '.';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { SwipeWidget4Landcover, SwipeWidget4Sentinel2 } from '../SwipeWidget';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
import Popup from '../Popup/Popup';
import { useSentinel2LandCoverLayerRasterFunctionName } from '../LandcoverLayer/useSentinel2LandCoverLayerRasterFunctionName';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';
import { SENTINEL2_NATIVE_SCALE } from '@shared/services/sentinel-2/config';

export const Sentinel2LandcoverMapView = () => {
    const { t } = useTranslation();

    const rasterFunctionName = useSentinel2LandCoverLayerRasterFunctionName();

    return (
        <LandcoverExplorerMapViewContainer
            landCoverServiceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
            landcoverLayerRasterFunctionName={rasterFunctionName}
            attribution={t('map_attribution', { ns: APP_NAME })}
            nameOfSatelliteImageryLayer={'Sentinel-2'}
            // isSatelliteImageryOutOfVisibleRange={
            //     isSatelliteImagertLayerOutOfVisibleRange
            // } // This should be derived from state or props
            nativeScale={SENTINEL2_NATIVE_SCALE} // Sentinel-2 10m resolution
        >
            <SwipeWidget4Landcover
                serviceUrl={SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}
                rasterFunctionName={rasterFunctionName}
                // mapView={undefined} // Assuming mapView is not needed here
            />
            <SwipeWidget4Sentinel2 />
            <Sentinel2Layer />
            <LandcoverLayer />
            <Popup />
        </LandcoverExplorerMapViewContainer>
    );
};
