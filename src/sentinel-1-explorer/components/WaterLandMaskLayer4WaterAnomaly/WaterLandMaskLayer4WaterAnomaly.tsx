/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
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
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

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
