import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import SwipeWidget from '../../../shared/components/SwipeWidget/SwipeWidget';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4SceneOnLeftSideOfSwipeMode,
    selectQueryParams4SceneOnRightSideOfSwipeMode,
} from '../../../shared/store/Landsat/selectors';
import { useLandsatLayer } from '../LandsatLayer';

type Props = {
    mapView?: MapView;
};

export const SwipeWidgetContainer: FC<Props> = ({ mapView }: Props) => {
    const appMode = useSelector(selectAppMode);

    const queryParams4LeftSide = useSelector(
        selectQueryParams4SceneOnLeftSideOfSwipeMode
    );

    const queryParams4RightSide = useSelector(
        selectQueryParams4SceneOnRightSideOfSwipeMode
    );

    const isSwipeWidgetVisible = appMode === 'swipe';

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
            }}
            referenceInfoOnToggle={() => {
                //
            }}
        />
    );
};
