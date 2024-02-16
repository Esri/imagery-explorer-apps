/* Copyright 2024 Esri
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
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { WEB_MAP_ID } from '@landcover-explorer/constants/map';
import {
    extentUpdated,
    mapCenterUpdated,
    // MapExtent,
    resolutionUpdated,
    swipePositionChanged,
    zoomUpdated,
} from '@shared/store/LandcoverExplorer/reducer';
import {
    selectMapCenterAndZoom,
    selectIsSentinel2LayerOutOfVisibleRange,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
    selectMapMode,
} from '@shared/store/LandcoverExplorer/selectors';
import SwipeWidget from '../SwipeWidget/SwipeWidget';
// import LandcoverLayer from '../LandcoverLayer/LandcoverLayerContainer';
import MapViewEventHandlers from './MapViewEventHandler';
import Popup from '../Popup/Popup';

import {
    selectAnimationMode,
    // selectShouldHideControlPanel,
} from '@shared/store/LandcoverUI/selectors';
import { selectHideBottomPanel } from '@shared/store/UI/selectors';
import classNames from 'classnames';
// import ToggleAttribution from './ToggleAttribution';
import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverUI/thunks';
import SearchWidget from './SearchWidget';
import ReferenceLayersToggleControl from '../ReferenceLayersToggleControl/ReferenceLayersToggleControl';
import ReferenceLayers from './ReferenceLayers';
import { saveMapCenterToHashParams } from '@landcover-explorer/utils/URLHashParams';
import CustomMapArrtribution from '../CustomMapArrtribution/CustomMapArrtribution';
import Sentinel2Layer from '../Sentinel2Layer/Sentinel2Layer';
import LandcoverLayer from '../LandcoverLayer/LandCoverLayer';
import AnimationPanel from '../AnimationPanel/AnimationPanel';
import MapInfoIndicators from './MapReferenceInfo';
import MapView from './MapView';

const MapViewContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const animationMode = useSelector(selectAnimationMode);

    const hideControlPanel = useSelector(selectHideBottomPanel);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const [isUpdating, setIsUpdating] = useState<boolean>(true);

    const { center, zoom } = useSelector(selectMapCenterAndZoom);

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
            className={classNames('absolute top-0 left-0 w-full', {
                'bottom-bottom-panel-height': hideControlPanel === false,
                'bottom-0': hideControlPanel,
            })}
        >
            <MapView
                webmapId={WEB_MAP_ID}
                center={[center.lon, center.lat]}
                zoom={zoom}
            >
                <SwipeWidget
                    shouldShowSentinel2Layer={shouldShowSentinel2Layer}
                    yearForLeadingLayer={year4LeadingLayer}
                    yearForTailingLayer={year4TrailingLayer}
                    visible={isSwipeWidgetVisible}
                    positionOnChange={(position) => {
                        dispatch(swipePositionChanged(position));
                    }}
                    referenceInfoOnToggle={(shouldDisplay) => {
                        dispatch(
                            toggleShowSwipeWidgetYearIndicator(shouldDisplay)
                        );
                    }}
                />
                <MapViewEventHandlers
                    extentOnChange={(extent, resolution, center, zoom) => {
                        batch(() => {
                            dispatch(resolutionUpdated(resolution));
                            dispatch(extentUpdated(extent));
                            dispatch(mapCenterUpdated(center));
                            dispatch(zoomUpdated(zoom));
                        });
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

                <SearchWidget hide={animationMode !== null} />

                <ReferenceLayers />

                <CustomMapArrtribution />

                <AnimationPanel />
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
