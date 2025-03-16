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

// import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
// // import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
// import {
//     // selectedRangeUpdated,
//     selectedOption4ChangeCompareToolChanged,
// } from '@shared/store/ChangeCompareTool/reducer';
// import {
//     selectChangeCompareLayerIsOn,
//     selectSelectedOption4ChangeCompareTool,
//     selectUserSelectedRangeInChangeCompareTool,
// } from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { useMemo } from 'react';
// import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { getChangeCompareLayerColorrampAsCSSGradient } from '../ChangeLayer/helpers';
import {
    ChangeCompareToolHeader,
    ChangeCompareToolControls,
} from '@shared/components/ChangeCompareTool';
import { useTranslation } from 'react-i18next';

export const ChangeCompareToolContainer = () => {
    const { t } = useTranslation();
    const tool = useAppSelector(selectActiveAnalysisTool);

    const LEGEND_LABEL_TEXT = useMemo(() => {
        return [t('decrease'), t('no_change'), t('increase')];
    }, []);

    if (tool !== 'change') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            <ChangeCompareToolHeader
                options={[
                    {
                        value: 'water' as SpectralIndex,
                        // label: 'WATER INDEX',
                        label: t('water_index'),
                    },
                    {
                        value: 'vegetation' as SpectralIndex,
                        // label: 'VEGETATION INDEX',
                        label: t('vegetation_index'),
                    },
                    {
                        value: 'moisture' as SpectralIndex,
                        // label: 'MOISTURE INDEX',
                        label: t('moisture_index'),
                    },
                ]}
            />
            <ChangeCompareToolControls legendLabelText={LEGEND_LABEL_TEXT} />
        </div>
    );
};
