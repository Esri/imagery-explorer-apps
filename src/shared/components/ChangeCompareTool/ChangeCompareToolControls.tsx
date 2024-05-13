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
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChangeCompareLayerColorrampAsCSSGradient } from './helpers';

type Props = {
    /**
     * the label text to be placed at the bottom of the pixel range selector. e.g. `['decrease', 'no change', 'increase']`
     */
    legendLabelText?: string[];
};

export const ChangeCompareToolControls: FC<Props> = ({
    legendLabelText = [],
}: Props) => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const isChangeLayerOn = useSelector(selectChangeCompareLayerIsOn);

    const getPixelRangeSlider = () => {
        const [min, max] = fullPixelValueRange;

        const fullRange = Math.abs(max - min);

        const countOfTicks = fullRange / 0.25 + 1;

        const oneFourthOfFullRange = fullRange / 4;

        const tickLabels: number[] = [
            min,
            min + oneFourthOfFullRange,
            min + oneFourthOfFullRange * 2,
            min + oneFourthOfFullRange * 3,
            max,
        ];

        // console.log(min, max, fullRange, countOfTicks, tickLabels);

        return (
            <PixelRangeSlider
                values={selectedRange}
                valuesOnChange={(vals: number[]) => {
                    dispatch(selectedRangeUpdated(vals));
                }}
                min={min}
                max={max}
                steps={0.05}
                tickLabels={tickLabels}
                countOfTicks={countOfTicks}
                showSliderTooltip={true}
            />
        );
    };

    if (tool !== 'change') {
        return null;
    }

    if (!isChangeLayerOn) {
        return (
            <div className="mt-10 text-center">
                <p className="text-sm opacity-50 ">
                    Select two scenes, SCENE A and SCENE B, and then click VIEW
                    CHANGE.
                </p>
            </div>
        );
    }

    return (
        <div className={classNames('w-full h-[0px] pt-[50px]')}>
            <div className="w-full">
                <div
                    className="w-full h-2"
                    style={{
                        background:
                            getChangeCompareLayerColorrampAsCSSGradient(),
                    }}
                ></div>
            </div>

            {getPixelRangeSlider()}

            <div className="w-full mt-12">
                <div className="flex items-center text-xs">
                    <div className="w-1/3">
                        <span>{legendLabelText[0] || 'decrease'}</span>
                    </div>
                    <div className="w-1/3 text-center">
                        <span>{legendLabelText[1] || 'no change'}</span>
                    </div>
                    <div className="w-1/3 text-right">
                        <span>{legendLabelText[2] || 'increase'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
