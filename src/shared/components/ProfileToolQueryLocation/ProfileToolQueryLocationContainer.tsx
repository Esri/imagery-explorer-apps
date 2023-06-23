import { selectQueryLocation4ProfileTool } from '@shared/store/Analysis/selectors';
import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ProfileToolQueryLocation } from './ProfileToolQueryLocation';

type Props = {
    mapView?: MapView;
};

export const ProfileToolQueryLocationContainer: FC<Props> = ({ mapView }) => {
    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    return (
        <ProfileToolQueryLocation
            queryLocation={queryLocation}
            mapView={mapView}
        />
    );
};
