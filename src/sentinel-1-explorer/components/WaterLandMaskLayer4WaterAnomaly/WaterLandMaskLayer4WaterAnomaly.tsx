import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { WaterLandMaskLayer } from '../MaskLayer/WaterLandMaskLayer';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const WaterLandMaskLayer4WaterAnomaly: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const { rasterFunctionName } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const isVisible = useMemo(() => {
        if (mode === 'analysis') {
            return false;
        }

        if (mode === 'animate') {
            return false;
        }

        const rft4Sentinel1: Sentinel1FunctionName =
            rasterFunctionName as Sentinel1FunctionName;

        if (rft4Sentinel1 === 'Water Anomaly Index Colorized') {
            return true;
        }

        return false;
    }, [rasterFunctionName, mode, analyzeTool]);

    return (
        <WaterLandMaskLayer
            visible={isVisible}
            visibleCategory={'water'}
            groupLayer={groupLayer}
        />
    );
};
