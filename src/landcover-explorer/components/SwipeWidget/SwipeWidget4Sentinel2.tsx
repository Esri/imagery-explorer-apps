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

import React, { FC } from 'react';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import MapView from '@arcgis/core/views/MapView';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useAppDispatch } from '@shared/store/configureStore';
import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';

type Props = {
    mapView?: MapView;
};

export const SwipeWidget4Sentinel2: FC<Props> = ({ mapView }) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    const isSentinel2LayerOutOfVisibleRange = useAppSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const isSwipeWidgetVisible =
        mode === 'swipe' &&
        shouldShowSentinel2Layer === true &&
        isSentinel2LayerOutOfVisibleRange === false;

    const leadingLayer = useSentinel2Layer({
        year: year4LeadingLayer,
        visible: isSwipeWidgetVisible,
    });

    const trailingLayer = useSentinel2Layer({
        year: year4TrailingLayer,
        visible: isSwipeWidgetVisible,
    });

    return (
        <SwipeWidget
            visible={isSwipeWidgetVisible}
            leadingLayer={leadingLayer}
            trailingLayer={trailingLayer}
            mapView={mapView}
            positionOnChange={(position) => {
                dispatch(swipeWidgetHanlderPositionChanged(position));
            }}
            referenceInfoOnToggle={(shouldDisplay) => {
                dispatch(toggleShowSwipeWidgetYearIndicator(shouldDisplay));
            }}
        />
    );
};
