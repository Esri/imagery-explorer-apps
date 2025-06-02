import React from 'react';
import { LandcoverExplorerMapViewContainer } from '.';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectIsSentinel2LayerOutOfVisibleRange } from '@shared/store/LandcoverExplorer/selectors';
import { SwipeWidget4Landcover, SwipeWidget4Sentinel2 } from '../SwipeWidget';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
import Popup from '../Popup/Popup';
import { useSentinel2LandCoverLayerRasterFunctionName } from '../LandcoverLayer/useSentinel2LandCoverLayerRasterFunctionName';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';

export const Sentinel2LandcoverMapView = () => {
    const { t } = useTranslation();

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const rasterFunctionName = useSentinel2LandCoverLayerRasterFunctionName();

    return (
        <LandcoverExplorerMapViewContainer
            attribution={t('map_attribution', { ns: APP_NAME })}
            nameOfSatelliteImageryLayer={'Sentinel-2'}
            isSatelliteImageryOutOfVisibleRange={
                isSentinel2LayerOutOfVisibleRange
            } // This should be derived from state or props
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
