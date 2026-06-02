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

import React, { useMemo } from 'react';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { AnalyzeToolSelectorData } from '@shared/components/AnalysisToolSelector/AnalysisToolSelectorContainer';
import { useTranslation } from 'react-i18next';
import { AnalysisTool } from '@shared/store/ImageryScene/reducer';

export const DRXAnalyzeToolSelector = () => {
    const { t } = useTranslation();

    const data: AnalyzeToolSelectorData[] = useMemo(() => {
        return [
            {
                tool: 'change' as AnalysisTool,
                title: t('change'),
                subtitle: t('detection').toLowerCase(),
            },
            {
                tool: 'temporal composite' as AnalysisTool,
                title: t('temporal'),
                subtitle: t('composite').toLowerCase(),
            },
        ];
    }, []);

    return <AnalysisToolSelector data={data} />;
};
