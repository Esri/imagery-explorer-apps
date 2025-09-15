import React, { FC, useEffect } from 'react';

import IMapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { useLandsatLayer } from './useLandsatLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    /**
     * The GroupLayer to which the Landsat layer will be added
     * This is to ensure the Landsat layer is added under the hillshade layer
     * with the blend mode applied
     */
    groupLayer?: GroupLayer;
    mapView?: IMapView;
};

export const LandsatLayer: FC<Props> = ({ groupLayer, mapView }) => {
    const year = useAppSelector(selectYear);

    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const showSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const getVisibility = () => {
        if (!showSatelliteImageryLayer) {
            return false;
        }

        if (animationMode !== null) {
            return false;
        }

        if (isSatelliteImagertLayerOutOfVisibleRange) {
            return false;
        }

        return mode === 'step';
    };

    const layer = useLandsatLayer({
        year,
        visible: getVisibility(),
    });

    useEffect(() => {
        if (groupLayer && layer) {
            groupLayer.add(layer);
        }
    }, [groupLayer, layer]);

    return null;
};
