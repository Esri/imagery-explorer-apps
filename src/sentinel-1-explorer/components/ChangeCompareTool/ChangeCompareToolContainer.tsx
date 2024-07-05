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
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PolarizationFilter } from './PolarizationFilter';
import { RadarIndex } from '@typing/imagery-service';
import {
    SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE,
    SENTINEL1_WATER_INDEX_PIXEL_RANGE,
} from '@shared/services/sentinel-1/config';
import { useSyncCalendarDateRange } from '../../hooks/useSyncCalendarDateRange';
import { TotalVisibleAreaInfo } from '@shared/components/TotalAreaInfo/TotalAreaInfo';

/**
 * the index that user can select for the Change Compare Tool
 */
export type ChangeCompareToolOption4Sentinel1 =
    | 'water anomaly'
    | 'water'
    | 'log difference';

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
        label: 'Water Anomaly',
    },
    {
        value: 'water',
        label: 'Water Index',
    },
];

const [
    SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MIN,
    SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MAX,
] = SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE;

const [
    SENTINEL1_WATER_INDEX_PIXEL_RANGE_MIN,
    SENTINEL1_WATER_INDEX_PIXEL_RANGE_MAX,
] = SENTINEL1_WATER_INDEX_PIXEL_RANGE;

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
    water: [
        SENTINEL1_WATER_INDEX_PIXEL_RANGE_MIN -
            SENTINEL1_WATER_INDEX_PIXEL_RANGE_MAX,
        SENTINEL1_WATER_INDEX_PIXEL_RANGE_MAX -
            SENTINEL1_WATER_INDEX_PIXEL_RANGE_MIN,
    ],
    /**
     * For Water Anomaly Index, we can use a input range of -2 to 0. Typically, oil appears within the range of -1 to 0.
     * The full pixel range of the change compare results is -2 to 2
     */
    'water anomaly': [
        SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MIN -
            SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MAX,
        SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MAX -
            SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE_MIN,
    ],
};

export const ChangeCompareToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedOption: ChangeCompareToolOption4Sentinel1 = useSelector(
        selectSelectedOption4ChangeCompareTool
    ) as ChangeCompareToolOption4Sentinel1;

    const legendLabelText = useMemo(() => {
        // if (selectedOption === 'log difference') {
        //     return ['lower backscatter', 'higher backscatter'];
        // }

        return ['decrease', '', 'increase'];
    }, [selectedOption]);

    const comparisonTopic = useMemo(() => {
        if (selectedOption === 'log difference') {
            return 'Backscatter';
        }

        return '';

        // const data = ChangeCompareToolOptions.find(
        //     (d) => d.value === selectedOption
        // );

        // return data?.label || selectedOption;
    }, [selectedOption]);

    useSyncCalendarDateRange();

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
            <ChangeCompareToolHeader
                options={ChangeCompareToolOptions}
                tooltipText="Compare and report changes between two selected images. Change is always calculated and reported chronologically from oldest to newest. The result of the calculation shows where and how values have changed over time. Specific types of change can be observed by selecting an index. All changes between the selected images can be observed by selecting the Log Difference option which includes all differences in backscatter."
            />

            <ChangeCompareToolControls
                legendLabelText={legendLabelText}
                comparisonTopic={comparisonTopic}
                preselectionText="Select two scenes, SCENE A and SCENE B, and then click VIEW CHANGE. The orbit direction is locked with the first selection for consistency and more reliable change results."
            />

            {selectedOption === 'log difference' && (
                <div className="absolute bottom-6 w-full">
                    <PolarizationFilter />
                </div>
            )}
        </div>
    );
};
