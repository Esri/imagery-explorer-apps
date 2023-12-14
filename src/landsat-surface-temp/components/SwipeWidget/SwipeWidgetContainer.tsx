import React, { FC, useEffect } from 'react';
import SwipeWidget from '@shared/components/SwipeWidget/SwipeWidget';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { swipeWidgetHanlderPositionChanged } from '@shared/store/Map/reducer';
import { useLandsatLayer } from '@landsat-explorer/components/LandsatLayer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import MapView from '@arcgis/core/views/MapView';

type Props = {
    mapView?: MapView;
};

export const SwipeWidgetContainer: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const activeAnalysisTool = useSelector(selectActiveAnalysisTool);

    const isSwipeWidgetVisible =
        mode === 'analysis' && activeAnalysisTool === 'trend';

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const leadingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4MainScene?.objectIdOfSelectedScene !== null,
        rasterFunction: queryParams4MainScene?.rasterFunctionName || '',
        objectId: queryParams4MainScene?.objectIdOfSelectedScene,
    });

    const trailingLayer = useLandsatLayer({
        visible:
            isSwipeWidgetVisible &&
            queryParams4MainScene?.objectIdOfSelectedScene !== null,
        rasterFunction: 'Natural Color with DRA',
        objectId: queryParams4MainScene?.objectIdOfSelectedScene,
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
