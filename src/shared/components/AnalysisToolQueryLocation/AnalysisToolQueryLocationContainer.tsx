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

import { selectQueryLocation4TrendTool } from '@shared/store/TrendTool/selectors';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { AnalysisToolQueryLocation } from './AnalysisToolQueryLocation';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { selectQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/selectors';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const AnalysisToolQueryLocationContainer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const queryLocation4TrendTool = useAppSelector(
        selectQueryLocation4TrendTool
    );

    const queryLocation4SpectralProfileTool = useAppSelector(
        selectQueryLocation4SpectralProfileTool
    );

    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const visible = useMemo(() => {
        if (mode !== 'analysis') {
            return false;
        }

        return analysisTool === 'trend' || analysisTool === 'spectral';
    }, [mode, analysisTool]);

    return (
        <AnalysisToolQueryLocation
            queryLocation={
                analysisTool === 'trend'
                    ? queryLocation4TrendTool
                    : queryLocation4SpectralProfileTool
            }
            visible={visible}
            mapView={mapView}
            groupLayer={groupLayer}
        />
    );
};
