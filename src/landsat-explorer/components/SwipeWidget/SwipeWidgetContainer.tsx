import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectIsSwipeModeOn,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';
import { useLandsatLayer } from '../LandsatLayer';
import { useDispatch } from 'react-redux';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';

type Props = {
    mapView?: MapView;
};

export const SwipeWidgetContainer: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const isSwipeWidgetVisible = useSelector(selectIsSwipeModeOn);

    const queryParams4LeftSide = useSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useSelector(selectQueryParams4SecondaryScene);

    // const isSwipeWidgetVisible = appMode === 'swipe';

    const leadingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4LeftSide?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4LeftSide?.rasterFunctionName || '',
        objectId: queryParams4LeftSide?.objectIdOfSelectedScene,
    });

    const trailingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4RightSide?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4RightSide?.rasterFunctionName || '',
        objectId: queryParams4RightSide?.objectIdOfSelectedScene,
    });

    return (
        <SwipeWidget
            visible={isSwipeWidgetVisible}
            leadingLayer={leadingLayer}
            trailingLayer={trailingLayer}
            mapView={mapView}
            positionOnChange={(pos) => {
                // console.log(pos)
                dispatch(swipeWidgetHanlderPositionChanged(Math.trunc(pos)));
            }}
            referenceInfoOnToggle={() => {
                //
            }}
        />
    );
};
