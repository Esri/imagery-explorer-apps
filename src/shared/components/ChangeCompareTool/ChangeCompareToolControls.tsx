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
    selectFullPixelValuesRangeInChangeCompareTool,
    selectSelectedOption4ChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { getChangeCompareLayerColorrampAsCSSGradient } from './helpers';
import { TotalVisibleAreaInfo } from '../TotalAreaInfo/TotalAreaInfo';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * the label text to be placed at the bottom of the pixel range selector. e.g. `['decrease', 'no change', 'increase']`
     */
    legendLabelText?: string[];
    /**
     * The selected parameter for comparison, such as 'Water Index' or 'Log Difference'.
     * It will be displayed along with the Estimated area info.
     */
    comparisonTopic?: string;
    /**
     * The preselection dialogue text message will be displayed when the change layer is not turned on.
     * This text provide user instruction about how to use this tool
     */
    preselectionText?: string;
};

export const ChangeCompareToolControls: FC<Props> = ({
    legendLabelText = [],
    comparisonTopic,
    preselectionText,
}: Props) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const tool = useAppSelector(selectActiveAnalysisTool);

    const selectedRange = useAppSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useAppSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const isChangeLayerOn = useAppSelector(selectChangeCompareLayerIsOn);

    const getPixelRangeSlider = () => {
        const [min, max] = fullPixelValueRange;

        // const fullRange = Math.abs(max - min);

        // const countOfTicks = fullRange / 0.25 + 1;

        // const oneFourthOfFullRange = fullRange / 4;

        // const tickLabels: number[] = [
        //     min,
        //     min + oneFourthOfFullRange,
        //     min + oneFourthOfFullRange * 2,
        //     min + oneFourthOfFullRange * 3,
        //     max,
        // ];

        // console.log(min, max, fullRange, countOfTicks, tickLabels);

        return (
            <PixelRangeSlider
                values={selectedRange}
                valuesOnChange={(vals: number[]) => {
                    dispatch(selectedRangeUpdated(vals));
                }}
                min={min}
                max={max}
                steps={0.01}
                showSliderTooltip={true}
            />
        );
    };

    const getLegendLabelText = () => {
        if (!legendLabelText?.length) {
            return null;
        }

        let content: JSX.Element = null;

        if (legendLabelText.length === 2) {
            content = (
                <div className="flex items-center text-xs">
                    <div className="w-1/2">
                        <span>{legendLabelText[0] || t('decrease')}</span>
                    </div>

                    <div className="w-1/2 text-right">
                        <span>{legendLabelText[1] || t('increase')}</span>
                    </div>
                </div>
            );
        }

        if (legendLabelText.length === 3) {
            content = (
                <div className="flex items-center text-xs">
                    <div className="w-1/3">
                        <span>{legendLabelText[0] || t('decrease')}</span>
                    </div>
                    <div className="w-1/3 text-center">
                        <span>{legendLabelText[1] || t('no_change')}</span>
                    </div>
                    <div className="w-1/3 text-right">
                        <span>{legendLabelText[2] || t('increase')}</span>
                    </div>
                </div>
            );
        }

        if (!content) {
            return null;
        }

        return <div className="w-full mt-12">{content}</div>;
    };

    const totalVisibleAreaInfo = useMemo(() => {
        if (!comparisonTopic) {
            return t('estimated_change_area');
        }

        const text = t('est_change_area_variable');

        return text.replace('{comparisonTopic}', comparisonTopic);
    }, [comparisonTopic]);

    if (tool !== 'change') {
        return null;
    }

    if (!isChangeLayerOn) {
        return (
            <div className="mt-6 text-center">
                <p className="text-sm opacity-50 ">
                    {preselectionText || t('select_two_scenes')}
                </p>
            </div>
        );
    }

    return (
        <div className={classNames('relative w-full h-[0px] pt-[50px]')}>
            <div className="absolute top-3 w-full text-right ">
                {/* <span className="text-xs">{legendTitle}</span> */}
                <TotalVisibleAreaInfo label={totalVisibleAreaInfo} />
            </div>

            <div className="relative w-full">
                <div
                    className="w-full h-2"
                    style={{
                        background:
                            getChangeCompareLayerColorrampAsCSSGradient(),
                    }}
                ></div>
            </div>

            {getPixelRangeSlider()}
            {getLegendLabelText()}
        </div>
    );
};
