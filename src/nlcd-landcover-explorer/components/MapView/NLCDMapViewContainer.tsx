import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { LandcoverExplorerMapViewContainer } from '@landcover-explorer/components/MapView';

export const NLCDLandcoverMapViewContainer = () => {
    const { t } = useTranslation();

    return (
        <LandcoverExplorerMapViewContainer
            attribution={t('map_attribution', { ns: APP_NAME })}
            nameOfSatelliteImageryLayer={'Sentinel-2'}
            isSatelliteImageryOutOfVisibleRange={false} // This should be derived from state or props
        >
            {/* <SwipeWidget4Landcover />
            <SwipeWidget4Sentinel2 />
            <Sentinel2Layer />
            <LandcoverLayer />
            <Popup /> */}
        </LandcoverExplorerMapViewContainer>
    );
};
