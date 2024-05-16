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

// import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import {
    ChangeCompareToolHeader,
    ChangeCompareToolControls,
} from '@shared/components/ChangeCompareTool';
import {
    fullPixelValuesRangeUpdated,
    selectedRangeUpdated,
} from '@shared/store/ChangeCompareTool/reducer';
import { selectSelectedOption4ChangeCompareTool } from '@shared/store/ChangeCompareTool/selectors';
// import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
// import {
//     selectedRangeUpdated,
//     selectedOption4ChangeCompareToolChanged,
// } from '@shared/store/ChangeCompareTool/reducer';
// import {
//     selectChangeCompareLayerIsOn,
//     selectSelectedOption4ChangeCompareTool,
//     selectUserSelectedRangeInChangeCompareTool,
// } from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
// import { SpectralIndex } from '@typing/imagery-service';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PolarizationFilter } from './PolarizationFilter';
import { RadarIndex } from '@typing/imagery-service';

/**
 * the index that user can select for the Change Compare Tool
 */
export type ChangeCompareToolOption4Sentinel1 = RadarIndex | 'log difference';

const ChangeCompareToolOptions: {
    value: ChangeCompareToolOption4Sentinel1;
    label: string;
}[] = [
    {
        value: 'log difference',
        label: 'Log difference',
    },
    // { value: 'vegetation', label: ' Dual-pol Radar Vegetation Index' },
    {
        value: 'water anomaly',
        label: 'Water Anomaly Index',
    },
    {
        value: 'water',
        label: 'Sentinel-1 Water Index (SWI)',
    },
];

export const ChangeCompareToolPixelValueRange4Sentinel1: Record<
    ChangeCompareToolOption4Sentinel1,
    number[]
> = {
    'log difference': [-0.5, 0.5],
    // vegetation: [0, 1],
    /**
     * For the Water Index (SWI), we have selected a input range of -0.3 to 1, though it may need adjustment.
     * The SWI index is not well-documented with a specific range of values.
     */
    water: [-1.5, 1.5],
    /**
     * For Water Anomaly Index, we can use a input range of -2 to 0. Typically, oil appears within the range of -1 to 0.
     * The full pixel range of the change compare results is -2 to 2
     */
    'water anomaly': [-2, 2],
};

export const ChangeCompareToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedOption: ChangeCompareToolOption4Sentinel1 = useSelector(
        selectSelectedOption4ChangeCompareTool
    ) as ChangeCompareToolOption4Sentinel1;

    useEffect(() => {
        const pixelValuesRange =
            ChangeCompareToolPixelValueRange4Sentinel1[
                selectedOption as ChangeCompareToolOption4Sentinel1
            ];

        // update pxiel values range based on user selected option
        if (pixelValuesRange) {
            dispatch(fullPixelValuesRangeUpdated(pixelValuesRange));
            dispatch(selectedRangeUpdated(pixelValuesRange));
        }
    }, [selectedOption]);

    if (tool !== 'change') {
        return null;
    }

    return (
        <div className={classNames('relative w-full h-full')}>
            <ChangeCompareToolHeader options={ChangeCompareToolOptions} />
            <ChangeCompareToolControls
                legendLabelText={['smoother', '', 'rougher']}
            />
            {selectedOption === 'log difference' && (
                <div className="absolute bottom-6 w-full">
                    <PolarizationFilter />
                </div>
            )}
        </div>
    );
};
