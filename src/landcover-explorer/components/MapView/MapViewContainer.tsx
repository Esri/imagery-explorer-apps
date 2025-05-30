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

import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { WEB_MAP_ID } from '@landcover-explorer/constants/map';
import {
    // selectMapCenterAndZoom,
    selectIsSentinel2LayerOutOfVisibleRange,
    // selectShouldShowSentinel2Layer,
    // selectYearsForSwipeWidgetLayers,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
// import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapViewEventHandlers from './MapViewEventHandler';
import Popup from '../Popup/Popup';

import {
    selectAnimationStatus,
    // selectShouldHideControlPanel,
} from '@shared/store/UI/selectors';
import { selectHideBottomPanel } from '@shared/store/UI/selectors';
import classNames from 'classnames';
// import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';
import ReferenceLayersToggleControl from '../ReferenceLayersToggleControl/ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import { saveMapCenterToHashParams } from '@landcover-explorer/utils/URLHashParams';
import CustomMapArrtribution from '@shared/components/CustomMapArrtribution/CustomMapArrtribution';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
import AnimationPanel from '../AnimationPanel/AnimationPanel';
import MapInfoIndicators from './MapReferenceInfo';
// import MapView from './MapView';
import { selectMapCenter, selectMapZoom } from '@shared/store/Map/selectors';
import {
    centerChanged,
    extentUpdated,
    resolutionUpdated,
    // swipeWidgetHanlderPositionChanged,
    zoomChanged,
} from '@shared/store/Map/reducer';
import MapView from '@shared/components/MapView/MapView';
import { SwipeWidget4Landcover, SwipeWidget4Sentinel2 } from '../SwipeWidget';
import { MapActionButtonGroup4LandcoverExplorer } from './MapActionButtonGroup4LandcoverExplorer';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
// import SearchWidget from '@shared/components/SearchWidget/SearchWidget';

const MapViewContainer = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const hideControlPanel = useAppSelector(selectHideBottomPanel);

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    // const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
    //     selectYearsForSwipeWidgetLayers
    // );

    // const shouldShowSentinel2Layer = useAppSelector(
    //     selectShouldShowSentinel2Layer
    // );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    // const { center, zoom } = useAppSelector(selectMapCenterAndZoom);

    const center = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    /**
     * Show Swipe Widget when in swipe mode
     * if viewing sentinel 2 layer, swipe widget can only be used if sentinel-2 layer is within visisble zoom levels,
     * which requires map zoom to be 11 or bigger
     */
    const isSwipeWidgetVisible =
        mode === 'swipe' && isSentinel2LayerOutOfVisibleRange === false;

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
                'absolute top-app-header-size md:top-0 left-0 w-full',
                {
                    'bottom-bottom-panel-height': hideControlPanel === false,
                    'bottom-0': hideControlPanel,
                }
            )}
        >
            <MapView webmapId={WEB_MAP_ID} center={center} zoom={zoom}>
                {/* <SwipeWidget
                    shouldShowSentinel2Layer={shouldShowSentinel2Layer}
                    yearForLeadingLayer={year4LeadingLayer}
                    yearForTailingLayer={year4TrailingLayer}
                    visible={isSwipeWidgetVisible}
                    positionOnChange={(position) => {
                        dispatch(swipeWidgetHanlderPositionChanged(position));
                    }}
                    referenceInfoOnToggle={(shouldDisplay) => {
                        dispatch(
                            toggleShowSwipeWidgetYearIndicator(shouldDisplay)
                        );
                    }}
                /> */}
                <SwipeWidget4Landcover />
                <SwipeWidget4Sentinel2 />
                <MapViewEventHandlers
                    extentOnChange={(extent, resolution, center, zoom) => {
                        dispatch(resolutionUpdated(resolution));
                        dispatch(extentUpdated(extent));
                        // dispatch(mapCenterUpdated(center));
                        // dispatch(zoomUpdated(zoom));
                        dispatch(centerChanged(center));
                        dispatch(zoomChanged(zoom));
                    }}
                    // mapViewOnClick={fetchLandCoverData}
                    mapViewUpdatingOnChange={(val: boolean) => {
                        setIsUpdating(val);
                    }}
                />

                {/* sentinel 2 layer that will be displayed in step mode, or when swipe widget is disabled */}
                <Sentinel2Layer />

                {/* land cover 2 layer that will be displayed in step mode */}
                <LandcoverLayer />

                <Popup />

                {/* <SearchWidget hide={animationMode !== null} /> */}

                <ReferenceLayers />

                <CustomMapArrtribution atrribution="Sentinel-2 10m Land Use/Land Cover data by Esri and Impact Observatory" />

                <AnimationPanel
                    animationMetadataSources={t('animation_metadata', {
                        ns: APP_NAME,
                    })}
                />

                <MapActionButtonGroup4LandcoverExplorer />
            </MapView>

            <ReferenceLayersToggleControl />

            <MapInfoIndicators
                isUpdating={isUpdating}
                isSwipeWidgetVisible={isSwipeWidgetVisible}
            />

            {/* <ToggleAttribution /> */}
        </div>
    );
};

export default MapViewContainer;
