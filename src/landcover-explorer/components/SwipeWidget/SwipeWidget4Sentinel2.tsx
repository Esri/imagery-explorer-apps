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

import React, { FC, useEffect } from 'react';
// import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
// import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import MapView from '@arcgis/core/views/MapView';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useAppDispatch } from '@shared/store/configureStore';
// import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { SwipeComponent } from '@shared/components/SwipeWidget/SwipeComponent';

type Props = {
    mapView?: MapView;
    /**
     * If provided, the swipe widget layers will be added to this group layer
     * instead of directly to the map in the map view.
     */
    groupLayer?: GroupLayer;
};

export const SwipeWidget4Sentinel2: FC<Props> = ({ mapView, groupLayer }) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const isSwipeWidgetVisible =
        mode === 'swipe' &&
        shouldShowSentinel2Layer === true &&
        isSatelliteImagertLayerOutOfVisibleRange === false;

    const leadingLayer = useSentinel2Layer({
        year: year4LeadingLayer,
        visible: isSwipeWidgetVisible,
    });

    const trailingLayer = useSentinel2Layer({
        year: year4TrailingLayer,
        visible: isSwipeWidgetVisible,
    });

    useEffect(() => {
        if (!leadingLayer || !trailingLayer) {
            return;
        }

        // if the group layer is provided, add the swipe widget layers to it
        // otherwise add the layers to the map in the map view
        if (groupLayer) {
            groupLayer.addMany([leadingLayer, trailingLayer]);
        } else {
            mapView?.map.addMany([leadingLayer, trailingLayer]);
        }
    }, [leadingLayer, trailingLayer, mapView, groupLayer]);

    return (
        // <SwipeWidget
        //     visible={isSwipeWidgetVisible}
        //     leadingLayer={leadingLayer}
        //     trailingLayer={trailingLayer}
        //     mapView={mapView}
        //     groupLayer={groupLayer}
        //     positionOnChange={(position) => {
        //         dispatch(swipeWidgetHanlderPositionChanged(position));
        //     }}
        //     referenceInfoOnToggle={(shouldDisplay) => {
        //         dispatch(toggleShowSwipeWidgetYearIndicator(shouldDisplay));
        //     }}
        // />
        <SwipeComponent
            visible={isSwipeWidgetVisible}
            leadingLayer={leadingLayer}
            trailingLayer={trailingLayer}
            mapView={mapView}
            // groupLayer={groupLayer}
            positionOnChange={(position) => {
                dispatch(swipeWidgetHanlderPositionChanged(position));
            }}
            // referenceInfoOnToggle={(shouldDisplay) => {
            //     dispatch(toggleShowSwipeWidgetYearIndicator(shouldDisplay));
            // }}
        />
    );
};
