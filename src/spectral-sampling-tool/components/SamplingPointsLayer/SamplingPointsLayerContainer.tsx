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
import React, { FC, useMemo } from 'react';
import { SamplingPoints } from './SamplingPointsLayer';
import MapView from '@arcgis/core/views/MapView';
import { useSelector } from 'react-redux';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from '@shared/store/SpectralSamplingTool/selectors';
import { Point } from '@arcgis/core/geometry';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const SamplingPointsLayerContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    // const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

    const selectedSamplingPoint = useSelector(
        selectSelectedSpectralSamplingPointData
    );

    // const points: Point[] = useMemo(() => {
    //     if (!selectedSamplingPoint) {
    //         return [];
    //     }

    //     return [selectedSamplingPoint]
    //         .filter((d) => d.location !== null)
    //         .map((d) => {
    //             const { location } = d;
    //             return location;
    //         });
    // }, [selectedSamplingPoint]);

    return (
        <SamplingPoints
            groupLayer={groupLayer}
            mapView={mapView}
            selectedPoint={selectedSamplingPoint?.location}
            // points={points}
        />
    );
};
