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

import classNames from 'classnames';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { satelliteImageryLayerAquisitionMonthChanged } from '@shared/store/LandcoverExplorer/reducer';
import { selectSatelliteImageryLayerAquisitionMonth } from '@shared/store/LandcoverExplorer/selectors';
import { saveActiveMonthToHashParams } from '@landcover-explorer/utils/URLHashParams';
import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import { useTranslation } from 'react-i18next';

const MONTH_ABBR = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

type Props = {
    disabled?: boolean;
};

const MonthPicker: FC<Props> = ({ disabled }: Props) => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const selectedMonth = useAppSelector(
        selectSatelliteImageryLayerAquisitionMonth
    );

    const dropdownData: DropdownData[] = useMemo(() => {
        return MONTH_ABBR.map((month, index) => {
            return {
                value: index.toString(),
                label: t(month.toLowerCase(), {
                    defaultValue: month, // Fallback to the month abbreviation if translation is not available
                }),
                selected: selectedMonth === index + 1,
            };
        });
    }, [selectedMonth]);

    useEffect(() => {
        saveActiveMonthToHashParams(selectedMonth);
    }, [selectedMonth]);

    return (
        <div
            className={classNames('relative', {
                'disabled-when-animation-mode-is-on': disabled,
            })}
        >
            <Dropdown
                data={dropdownData}
                onChange={(indexOfSelectedMOnth) => {
                    const monthVal = parseInt(indexOfSelectedMOnth) + 1;

                    dispatch(
                        satelliteImageryLayerAquisitionMonthChanged(monthVal)
                    );
                    // setShouldShowOptions(false);
                }}
            />
        </div>
    );
};

export default MonthPicker;
