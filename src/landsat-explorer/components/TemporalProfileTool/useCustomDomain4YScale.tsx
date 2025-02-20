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

import { selectSelectedIndex4TrendTool } from '@shared/store/TrendTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';

export const useCustomDomain4YScale = (chartData: LineChartDataItem[]) => {
    const spectralIndex: SpectralIndex = useAppSelector(
        selectSelectedIndex4TrendTool
    ) as SpectralIndex;

    const customDomain4YScale = useMemo(() => {
        const yValues = chartData.map((d) => d.y);

        // boundary of y axis, for spectral index, the boundary should be -1 and 1
        let yUpperLimit = 1;
        let yLowerLimit = -1;

        // temperature is handled differently as we display the actual values in the chart
        if (spectralIndex === 'temperature farhenheit') {
            yLowerLimit = LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT;
            yUpperLimit = LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT;
        }

        if (spectralIndex === 'temperature celcius') {
            yLowerLimit = LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS;
            yUpperLimit = LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS;
        }

        // get min and max from the data
        let ymin = Math.min(...yValues);
        let ymax = Math.max(...yValues);

        // get range between min and max from the data
        const yRange = ymax - ymin;

        // adjust ymin and ymax to add 10% buffer to it, but also need to make sure it fits in the upper and lower limit
        ymin = Math.max(yLowerLimit, ymin - yRange * 0.1);
        ymax = Math.min(yUpperLimit, ymax + yRange * 0.1);

        return [ymin, ymax];
    }, [chartData]);

    return customDomain4YScale;
};
