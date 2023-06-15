import MapView from 'esri/views/MapView';
import React, { FC, useMemo } from 'react';
import { MaskLayer } from './MaskLayer';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectMaskMethod,
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectMaskLayerOpcity,
} from '@shared/store/Analysis/selectors';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import GroupLayer from 'esri/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MaskLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const mode = useSelector(selectAppMode);

    const maskMethod = useSelector(selectMaskMethod);

    const { selectedRange, color } = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

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
    }, [mode, anailysisTool, objectIdOfSelectedScene]);

    return (
        <MaskLayer
            mapView={mapView}
            groupLayer={groupLayer}
            method={maskMethod}
            objectId={objectIdOfSelectedScene}
            visible={isVisible}
            selectedRange={selectedRange}
            color={color}
            opacity={opacity}
            shouldClip={shouldClip}
        />
    );
};
