import MapView from 'esri/views/MapView';
import React, { FC, useEffect } from 'react';
import useLandsatLayer from './useLandsatLayer';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4SceneInSelectedMode,
    selectAppMode,
} from '@shared/store/Landsat/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import GroupLayer from 'esri/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

const LandsatLayer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    const mode = useSelector(selectAppMode);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const animationStatus = useSelector(selectAnimationStatus);

    const getVisibility = () => {
        // if (mode === 'explore') {
        //     return true;
        // }

        if (mode === 'find a scene' || mode === 'analysis') {
            return objectIdOfSelectedScene !== null;
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
        if (groupLayer && layer) {
            groupLayer.add(layer);
        }
    }, [groupLayer, layer]);

    return null;
};

export default LandsatLayer;
