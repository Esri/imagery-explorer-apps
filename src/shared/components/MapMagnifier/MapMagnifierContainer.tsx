/* Copyright 2025 Esri
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

import MapView from '@arcgis/core/views/MapView';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { MapMagnifier } from './MapMagnifier';

type Props = {
    mapView?: MapView;
};

/**
 * Map Magnifier that will be turned on for the Trend and Spectral Analysis tool
 * @param param0
 * @returns
 */
export const MapMagnifierContainer: FC<Props> = ({ mapView }) => {
    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const showMagnifier = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        if (!objectIdOfSelectedScene) {
            return false;
        }

        return analysisTool === 'trend' || analysisTool === 'spectral';
    }, [analysisTool, mode, objectIdOfSelectedScene]);

    return <MapMagnifier mapView={mapView} showMagnifier={showMagnifier} />;
};
