import MapView from '@arcgis/core/views/MapView';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MapMagnifier } from './MapMagnifier';

type Props = {
    mapView?: MapView;
};

/**
 * Map Magnifier that will be turned on for the Trend and Spectral Analysis tool
 * @param param0
 * @returns
 */
export const MapMagnifierContainer: FC<Props> = ({ mapView }) => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const showMagnifier = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (!objectIdOfSelectedScene) {
            return false;
        }

        return analysisTool === 'trend' || analysisTool === 'spectral';
    }, [analysisTool, mode, objectIdOfSelectedScene]);

    return <MapMagnifier mapView={mapView} showMagnifier={showMagnifier} />;
};
