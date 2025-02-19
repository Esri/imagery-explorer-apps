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

import React from 'react';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { AnalyzeToolSelectorData } from '@shared/components/AnalysisToolSelector/AnalysisToolSelectorContainer';

const data: AnalyzeToolSelectorData[] = [
    {
        tool: 'mask',
        title: 'Index',
        subtitle: 'mask',
    },
    {
        tool: 'trend',
        title: 'Temporal',
        subtitle: 'profile',
    },
    {
        tool: 'spectral',
        title: 'Spectral',
        subtitle: 'profile',
    },
    {
        tool: 'change',
        title: 'Change',
        subtitle: 'detection',
    },
];

export const Sentinel2AnalyzeToolSelector = () => {
    return <AnalysisToolSelector data={data} />;
};
