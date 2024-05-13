import { Dropdown, DropdownData } from '@shared/components/Dropdown';
import {
    Sentinel1PolarizationFilter,
    polarizationFilterChanged,
} from '@shared/store/Sentinel1/reducer';
import { selectPolarizationFilter } from '@shared/store/Sentinel1/selectors';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const PolarizationFilter = () => {
    const dispatch = useDispatch();

    const selectedPolarizationFilter = useSelector(selectPolarizationFilter);

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
