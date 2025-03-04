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
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import MapView from '@arcgis/core/views/MapView';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useAppDispatch } from '@shared/store/configureStore';
import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';

type Props = {
    mapView?: MapView;
};

export const SwipeWidget4Landcover: FC<Props> = ({ mapView }) => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSentinel2Layer
    );

    const isSwipeWidgetVisible =
        mode === 'swipe' && shouldShowSentinel2Layer === false;

    const leadingLayer = useLandCoverLayer({
        year: year4LeadingLayer,
        visible: isSwipeWidgetVisible && shouldShowSentinel2Layer === false,
    });

    const trailingLayer = useLandCoverLayer({
        year: year4TrailingLayer,
        visible: isSwipeWidgetVisible && shouldShowSentinel2Layer === false,
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
