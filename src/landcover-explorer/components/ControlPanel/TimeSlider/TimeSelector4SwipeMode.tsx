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

import classNames from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
} from '@shared/store/LandcoverExplorer/reducer';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import Dropdown from './Dropdown';
import MonthPicker from './MonthPicker';

type Props = {
    shouldShowMonthPicker: boolean;
};

const TimeSelector4SwipeMode: FC<Props> = ({
    shouldShowMonthPicker,
}: Props) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectMapMode);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const years = getAvailableYears();

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const data4LeadingYearDropdown = years.map((year) => {
        return {
            value: year.toString(),
            active: year === year4LeadingLayer,
        };
    });

    const data4TrailingYearDropdown = years.map((year) => {
        return {
            value: year.toString(),
            active: year === year4TrailingLayer,
        };
    });

    if (mode !== 'swipe' || isSentinel2LayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="mt-8 flex">
            <div
                className={classNames('grid grid-cols-2 gap-2 mr-2', {
                    'w-4/5': shouldShowMonthPicker,
                    'w-full': shouldShowMonthPicker === false,
                })}
            >
                <Dropdown
                    data={data4LeadingYearDropdown}
                    onChange={(year) => {
                        dispatch(year4LeadingLayerUpdated(+year));
                    }}
                />

                <Dropdown
                    data={data4TrailingYearDropdown}
                    onChange={(year) => {
                        dispatch(year4TrailingLayerUpdated(+year));
                    }}
                />
            </div>

            {shouldShowMonthPicker && (
                <div className="relative border-l border-custom-light-blue-50 ml-1 pl-3">
                    <MonthPicker />
                </div>
            )}
        </div>
    );
};

export default TimeSelector4SwipeMode;
