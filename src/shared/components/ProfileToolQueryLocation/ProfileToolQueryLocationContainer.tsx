import {
    selectActiveAnalysisTool,
    selectQueryLocation4ProfileTool,
} from '@shared/store/Analysis/selectors';
import MapView from 'esri/views/MapView';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ProfileToolQueryLocation } from './ProfileToolQueryLocation';
import { selectAppMode } from '@shared/store/Landsat/selectors';

type Props = {
    mapView?: MapView;
};

export const ProfileToolQueryLocationContainer: FC<Props> = ({ mapView }) => {
    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    return (
        <ProfileToolQueryLocation
            queryLocation={queryLocation}
            visible={mode === 'analysis' && analysisTool === 'profile'}
            mapView={mapView}
        />
    );
};
