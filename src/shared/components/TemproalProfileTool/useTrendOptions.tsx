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
import { DropdownData } from '@shared/components/Dropdown';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';
import { useTranslation } from 'react-i18next';

export const useTrendOptions = (
    selectedTrendOption: TrendToolOption
): DropdownData[] => {
    const { t } = useTranslation();

    const options = useMemo(() => {
        const TrendOptions: {
            value: TrendToolOption;
            label: string;
        }[] = [
            {
                value: 'year-to-year',
                label: t('yearly'),
            },
            {
                value: 'month-to-month',
                label: t('monthly'),
            },
        ];

        return TrendOptions.map((d) => {
            return {
                ...d,
                selected: selectedTrendOption === d.value,
            } as DropdownData;
        });
    }, [selectedTrendOption]);

    return options;
};
