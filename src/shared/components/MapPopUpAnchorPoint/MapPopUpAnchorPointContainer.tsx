import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { MapPopUpAnchorPoint } from './MapPopUpAnchorPoint';
import { useSelector } from 'react-redux';
import { selectMapPopupAnchorLocation } from '@shared/store/Map/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MapPopUpAnchorPointContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const anchorLocation = useSelector(selectMapPopupAnchorLocation);

    return (
        <MapPopUpAnchorPoint
            anchorLocation={anchorLocation}
            mapView={mapView}
            groupLayer={groupLayer}
        />
    );
};
