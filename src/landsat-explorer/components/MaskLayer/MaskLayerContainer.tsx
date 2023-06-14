import MapView from 'esri/views/MapView';
import React, { FC, useMemo } from 'react';
import { MaskLayer } from './MaskLayer';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectMaskMethod,
    selectMaskOptions,
} from '@shared/store/Analysis/selectors';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';

type Props = {
    mapView?: MapView;
};

export const MaskLayerContainer: FC<Props> = ({ mapView }) => {
    const mode = useSelector(selectAppMode);

    const maskMethod = useSelector(selectMaskMethod);

    const { selectedRange, color, opacity } = useSelector(selectMaskOptions);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const anailysisTool = useSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode !== 'analysis' || anailysisTool !== 'mask') {
            return false;
        }

        if (!objectIdOfSelectedScene) {
            return false;
        }

        return true;
    }, [anailysisTool, objectIdOfSelectedScene]);

    return (
        <MaskLayer
            mapView={mapView}
            method={maskMethod}
            objectId={objectIdOfSelectedScene}
            visible={isVisible}
            selectedRange={selectedRange}
            color={color}
            opacity={opacity}
        />
    );
};
