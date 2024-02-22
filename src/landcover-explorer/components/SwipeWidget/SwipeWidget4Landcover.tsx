import React, { FC } from 'react';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import { useSelector } from 'react-redux';
import {
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import MapView from '@arcgis/core/views/MapView';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useDispatch } from 'react-redux';
import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';

type Props = {
    mapView?: MapView;
};

export const SwipeWidget4Landcover: FC<Props> = ({ mapView }) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    /**
     * Show Swipe Widget when in swipe mode
     * if viewing sentinel 2 layer, swipe widget can only be used if sentinel-2 layer is within visisble zoom levels,
     * which requires map zoom to be 11 or bigger
     */
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
