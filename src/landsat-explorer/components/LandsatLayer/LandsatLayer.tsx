import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';
import useLandsatLayer from './useLandsatLayer';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4SceneInSelectedMode,
    selectAppMode,
    selectActiveAnalysisTool,
} from '@shared/store/ImageryScene/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

const LandsatLayer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    const mode = useSelector(selectAppMode);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const animationStatus = useSelector(selectAnimationStatus);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const getVisibility = () => {
        if (mode === 'dynamic') {
            return true;
        }

        if (mode === 'find a scene' || mode === 'spectral sampling') {
            return objectIdOfSelectedScene !== null;
        }

        if (mode === 'analysis') {
            // no need to show landsat layer when user is using "compare change" tool,
            // the "compare change" tool uses "LandsatLayer4ChangeTool" to display selected Landsat scene
            if (analysisTool === 'change') {
                return false;
            }

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

    const getObjectId = () => {
        // should ignore the object id of selected scene if in dynamic mode,
        if (mode === 'dynamic') {
            return null;
        }

        return objectIdOfSelectedScene;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
        rasterFunction: rasterFunctionName,
        objectId: getObjectId(),
    });

    useEffect(() => {
        if (groupLayer && layer) {
            groupLayer.add(layer);
            groupLayer.reorder(layer, 0);
        }
    }, [groupLayer, layer]);

    return null;
};

export default LandsatLayer;
