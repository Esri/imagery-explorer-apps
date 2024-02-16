import classNames from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
} from '@landcover-explorer/store/Map/reducer';
import { selectYearsForSwipeWidgetLayers } from '@landcover-explorer/store/Map/selectors';
import Dropdown from './Dropdown';
import MonthPicker from './MonthPicker';

type Props = {
    shouldShowMonthPicker: boolean;
};

const TimeSelector4SwipeMode: FC<Props> = ({
    shouldShowMonthPicker,
}: Props) => {
    const dispatch = useDispatch();

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
