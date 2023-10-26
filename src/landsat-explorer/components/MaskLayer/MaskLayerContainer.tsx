import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
import { MaskLayer } from './MaskLayer';
import { useSelector } from 'react-redux';
import {
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectMaskLayerOpcity,
    selectSpectralIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MaskLayerContainer: FC<Props> = ({ mapView, groupLayer }) => {
    const mode = useSelector(selectAppMode);

    const spectralIndex = useSelector(selectSpectralIndex4MaskTool);

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
            spectralIndex={spectralIndex}
            objectId={objectIdOfSelectedScene}
            visible={isVisible}
            selectedRange={selectedRange}
            color={color}
            opacity={opacity}
            shouldClip={shouldClip}
        />
    );
};
