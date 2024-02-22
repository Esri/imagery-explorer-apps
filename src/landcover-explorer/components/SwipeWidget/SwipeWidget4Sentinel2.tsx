import React, { FC } from 'react';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import { useSelector } from 'react-redux';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import MapView from '@arcgis/core/views/MapView';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useDispatch } from 'react-redux';
import { toggleShowSwipeWidgetYearIndicator } from '@shared/store/LandcoverExplorer/thunks';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';

type Props = {
    mapView?: MapView;
};

export const SwipeWidget4Sentinel2: FC<Props> = ({ mapView }) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const isSentinel2LayerOutOfVisibleRange = useSelector(
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
