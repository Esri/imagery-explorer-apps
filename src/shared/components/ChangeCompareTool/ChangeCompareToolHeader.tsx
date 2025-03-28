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

import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import {
    selectedRangeUpdated,
    selectedOption4ChangeCompareToolChanged,
} from '@shared/store/ChangeCompareTool/reducer';
import {
    selectChangeCompareLayerIsOn,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * list of options that will be available in the dropdown menu
     */
    options: {
        value: SpectralIndex | string;
        label: string;
    }[];
    /**
     * tooltip text for the info icon of the Change Compare tool
     */
    tooltipText?: string;
};

export const ChangeCompareToolHeader: FC<Props> = ({
    options,
    tooltipText,
}: Props) => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const tool = useAppSelector(selectActiveAnalysisTool);

    const selectedOption = useAppSelector(
        selectSelectedOption4ChangeCompareTool
    );

    if (tool !== 'change') {
        return null;
    }

    return (
        <AnalysisToolHeader
            title={t('change')}
            dropdownListOptions={options}
            selectedValue={selectedOption}
            tooltipText={tooltipText || t('compare_and_report_changes')}
            dropdownMenuSelectedItemOnChange={(val) => {
                dispatch(
                    selectedOption4ChangeCompareToolChanged(
                        val as SpectralIndex
                    )
                );
            }}
        />
    );
};
