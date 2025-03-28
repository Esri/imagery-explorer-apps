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
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const Sentinel1AnalyzeToolSelector = () => {
    const { t } = useTranslation();

    const data: AnalyzeToolSelectorData[] = [
        {
            tool: 'mask',
            // title: 'Index',
            // subtitle: 'mask',
            title: t('index'),
            subtitle: t('mask'),
        },
        {
            tool: 'trend',
            // title: 'Temporal',
            // subtitle: 'profile',
            title: t('temporal'),
            subtitle: t('profile'),
        },
        {
            tool: 'change',
            // title: 'Change',
            // subtitle: 'detecion',
            title: t('change'),
            subtitle: t('detection'),
        },
        {
            tool: 'temporal composite',
            // title: 'Temporal',
            // subtitle: 'composite',
            title: t('temporal'),
            subtitle: t('composite', { ns: APP_NAME }),
        },
    ];

    return <AnalysisToolSelector data={data} />;
};
