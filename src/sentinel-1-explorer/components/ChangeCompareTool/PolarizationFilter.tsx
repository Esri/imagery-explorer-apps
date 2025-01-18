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

import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import {
    Sentinel1PolarizationFilter,
    polarizationFilterChanged,
} from '@shared/store/Sentinel1/reducer';
import { selectPolarizationFilter } from '@shared/store/Sentinel1/selectors';
import React, { useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

export const PolarizationFilter = () => {
    const dispatch = useAppDispatch();

    const selectedPolarizationFilter = useAppSelector(selectPolarizationFilter);

    const dropdownMenuData = useMemo(() => {
        const data: DropdownData[] = [
            {
                value: 'VV' as Sentinel1PolarizationFilter,
                label: 'VV Amplitude',
                selected: selectedPolarizationFilter === 'VV',
            },
            {
                value: 'VH' as Sentinel1PolarizationFilter,
                label: 'VH Amplitude',
                selected: selectedPolarizationFilter === 'VH',
            },
        ];

        return data;
    }, [selectedPolarizationFilter]);

    return (
        <div className="flex justify-right w-full">
            <div className="mr-2 text-right flex-grow">
                <span className="text-xs">Polarization:</span>
            </div>

            <Dropdown
                data={dropdownMenuData}
                onChange={(val) => {
                    dispatch(
                        polarizationFilterChanged(
                            val as Sentinel1PolarizationFilter
                        )
                    );
                }}
            />
        </div>
    );
};
