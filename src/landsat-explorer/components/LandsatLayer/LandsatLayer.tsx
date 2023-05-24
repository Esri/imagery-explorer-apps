import MapView from 'esri/views/MapView';
import React, { FC, useEffect } from 'react';
import useLandsatLayer from './useLandsatLayer';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4SceneInSelectedMode,
    selectAppMode,
} from '@shared/store/Landsat/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

type Props = {
    mapView?: MapView;
};

const LandsatLayer: FC<Props> = ({ mapView }: Props) => {
    const mode = useSelector(selectAppMode);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const animationStatus = useSelector(selectAnimationStatus);

    const getVisibility = () => {
        // if (mode === 'explore') {
        //     return true;
        // }

        if (mode === 'find a scene' && objectIdOfSelectedScene) {
            return true;
        }

        // when in animate mode, only need to show landsat layer if animation is not playing
        if (
            mode === 'animate' &&
            objectIdOfSelectedScene &&
            animationStatus === null
        ) {
            return true;
        }

        return false;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
        rasterFunction: rasterFunctionName,
        objectId: objectIdOfSelectedScene,
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default LandsatLayer;
