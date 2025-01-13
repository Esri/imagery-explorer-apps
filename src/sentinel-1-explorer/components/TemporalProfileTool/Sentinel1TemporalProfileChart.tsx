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

import React from 'react';
import { useSentinel1TemporalProfileDataAsChartData } from './useTemporalProfileDataAsChartData';
// import { useCustomDomain4YScale } from './useCustomDomain4YScale';
import { TemporalProfileChart } from '@shared/components/TemporalProfileChart';
import { useCustomDomain4YScale } from '@shared/components/TemporalProfileChart/useCustomDomain4YScale';

export const Sentinel1TemporalProfileChart = () => {
    const chartData = useSentinel1TemporalProfileDataAsChartData();

    const customDomain4YScale = useCustomDomain4YScale(chartData);

    return (
        <TemporalProfileChart
            chartData={chartData}
            customDomain4YScale={customDomain4YScale}
        />
    );
};
