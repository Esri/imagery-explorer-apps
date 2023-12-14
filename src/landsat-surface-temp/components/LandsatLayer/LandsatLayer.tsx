import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView from '@arcgis/core/views/MapView';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import { useLandsatLayer } from '@landsat-explorer/components/LandsatLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const LandsatLayer: FC<Props> = ({ mapView, groupLayer }: Props) => {
    const mode = useSelector(selectAppMode);

    const { rasterFunctionName, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4MainScene) || {};

    const activeAnalysisTool = useSelector(selectActiveAnalysisTool);

    const getVisibility = () => {
        if (mode === 'dynamic') {
            return true;
        }

        if (mode === 'find a scene') {
            return objectIdOfSelectedScene !== null;
        }

        if (mode === 'analysis') {
            return (
                activeAnalysisTool === 'mask' &&
                objectIdOfSelectedScene !== null
            );
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
