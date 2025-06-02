import React, { FC, useEffect } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    selectIsSentinel2LayerOutOfVisibleRange,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { useLandsatLayer } from './useLandsatLayer';

type Props = {
    mapView?: IMapView;
};

export const LandsatLayer: FC<Props> = ({ mapView }) => {
    const year = useAppSelector(selectYear);

    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const showSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const getVisibility = () => {
        if (!showSatelliteImageryLayer) {
            return false;
        }

        if (animationMode !== null) {
            return false;
        }

        return mode === 'step';
    };

    const layer = useLandsatLayer({
        year,
        visible: getVisibility(),
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};
