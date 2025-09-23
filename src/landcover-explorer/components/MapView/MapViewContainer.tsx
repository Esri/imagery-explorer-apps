/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { WEB_MAP_ID } from '@landcover-explorer/constants/map';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
// import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapViewEventHandlers from './MapViewEventHandler';

import {
    selectAnimationStatus,
    // selectShouldHideControlPanel,
} from '@shared/store/UI/selectors';
import { selectHideBottomPanel } from '@shared/store/UI/selectors';
import classNames from 'classnames';
// import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';
// import ReferenceLayersToggleControl from '../ReferenceLayersToggleControl/ReferenceLayersToggleControl';
// import ReferenceLayers from './ReferenceLayers';
import { saveMapCenterToHashParams } from '@landcover-explorer/utils/URLHashParams';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
// import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
// import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
// import AnimationPanel from '../AnimationPanel/AnimationPanel';
import MapInfoIndicators from './MapReferenceInfo';
// import MapView from './MapView';
import { selectMapCenter, selectMapZoom } from '@shared/store/Map/selectors';
import {
    centerChanged,
    extentUpdated,
    resolutionUpdated,
    scaleUpdated,
    // swipeWidgetHanlderPositionChanged,
    zoomChanged,
} from '@shared/store/Map/reducer';
import MapView from '@shared/components/MapView/MapView';
// import { SwipeWidget4Landcover, SwipeWidget4Sentinel2 } from '../SwipeWidget';
import { MapActionButtonGroup4LandcoverExplorer } from './MapActionButtonGroup4LandcoverExplorer';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
import { ReferenceLayersToggleControl } from '@shared/components/ReferenceLayersToggleControl';
import { WEB_MAP_ID } from '@shared/constants/map';
import ReferenceLayers from '@shared/components/MapView/ReferenceLayers';

type MapViewContainerProps = {
    attribution: string;
    /**
     * URL for the Land Cover Image Service
     */
    // landCoverServiceUrl: string;
    /**
     * name of the raster function that will be used for rendering the land cover layer.
     */
    // landcoverLayerRasterFunctionName: string;
    /**
     * URL for the Satellite Imagery Service
     */
    // satellteImageryServiceUrl: string;
    /**
     * name of the satellite imagery layer that will be displayed as a reference layer. (e.g. "Sentinel-2")
     */
    nameOfSatelliteImageryLayer: string;
    children?: React.ReactNode;
    nativeScale: number;
};

export const MapViewContainer: FC<MapViewContainerProps> = ({
    attribution,
    // landCoverServiceUrl,
    // landcoverLayerRasterFunctionName,
    // satellteImageryServiceUrl,
    nameOfSatelliteImageryLayer,
    // isSatelliteImageryOutOfVisibleRange,
    nativeScale,
    children,
}) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const hideControlPanel = useAppSelector(selectHideBottomPanel);

    const isSatelliteImageryOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    // const { center, zoom } = useAppSelector(selectMapCenterAndZoom);

    const center = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    /**
     * Display the Swipe Widget only in swipe mode.
     * For the Sentinel-2 layer, the Swipe Widget is available only when the layer is within visible zoom levels (zoom 11 or higher).
     */
    const isSwipeWidgetVisible =
        mode === 'swipe' && isSatelliteImageryOutOfVisibleRange === false;

    useEffect(() => {
        saveMapCenterToHashParams(center, zoom);
    }, [center, zoom]);

    useEffect(() => {
        // adding this class will hide map zoom widget when animation mode is on
        document.body.classList.toggle(
            'hide-map-control',
            animationMode !== null
        );
    }, [animationMode]);

    return (
        <div
            className={classNames(
                'absolute top-app-header-size md:top-0 left-0 w-full wide-popup',
                {
                    'bottom-bottom-panel-height': hideControlPanel === false,
                    'bottom-0': hideControlPanel,
                }
            )}
        >
            <MapView webmapId={WEB_MAP_ID} center={center} zoom={zoom}>
                <MapViewEventHandlers
                    extentOnChange={(
                        extent,
                        resolution,
                        center,
                        zoom,
                        scale
                    ) => {
                        dispatch(resolutionUpdated(resolution));
                        dispatch(extentUpdated(extent));
                        dispatch(centerChanged(center));
                        dispatch(zoomChanged(zoom));
                        dispatch(scaleUpdated(scale));
                    }}
                    mapViewUpdatingOnChange={(val: boolean) => {
                        setIsUpdating(val);
                    }}
                />

                <ReferenceLayers />

                <CustomMapArrtribution atrribution={attribution} />

                {/* <AnimationPanel
                    landCoverServiceUrl={landCoverServiceUrl}
                    satellteImageryServiceUrl={satellteImageryServiceUrl}
                    landcoverLayerRasterFunctionName={
                        landcoverLayerRasterFunctionName
                    }
                    animationMetadataSources={t('animation_metadata', {
                        ns: APP_NAME,
                    })}
                /> */}

                <MapActionButtonGroup4LandcoverExplorer
                    nativeScale={nativeScale}
                />

                {/* <SwipeWidget4Landcover />
                <SwipeWidget4Sentinel2 />
                <Sentinel2Layer />
                <LandcoverLayer />
                <Popup /> */}

                {/* <SearchWidget hide={animationMode !== null} /> */}
                {children}
            </MapView>

            <ReferenceLayersToggleControl shoudHide={animationMode !== null} />

            <MapInfoIndicators
                isUpdating={isUpdating}
                nameOfSatelliteImageryLayer={nameOfSatelliteImageryLayer}
                isSwipeWidgetVisible={isSwipeWidgetVisible}
            />
        </div>
    );
};

export default MapViewContainer;
