import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import SwipeWidget from '../../../shared/components/SwipeWidget/SwipeWidget';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../../../shared/store/Landsat/selectors';

type Props = {
    mapView?: MapView;
};

export const SwipeWidgetContainer: FC<Props> = ({ mapView }: Props) => {
    const appMode = useSelector(selectAppMode);

    return (
        <SwipeWidget
            visible={appMode === 'swipe'}
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
