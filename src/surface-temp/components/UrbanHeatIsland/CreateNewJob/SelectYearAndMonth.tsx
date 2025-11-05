import { Dropdown } from '@shared/components/Dropdown';
import { APP_NAME } from '@shared/config';
import { useAvailableAcquisitionYears } from '@shared/hooks/useAvailableAcquisitionYears';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const SelectYearAndMonth = () => {
    const { t } = useTranslation();

    const availableYears = useAvailableAcquisitionYears();

    const availbleMonths = useMemo(() => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }, []);

    const availableYearsDropdownData = useMemo(() => {
        return availableYears
            .map((year) => ({
                value: year.toString(),
                label: year.toString(),
                selected: false,
            }))
            .reverse();
    }, [availableYears]);

    const availableMonthsDropdownData = useMemo(() => {
        return availbleMonths.map((month) => ({
            value: month.toString(),
            label: month.toString(),
            selected: false,
        }));
    }, [availbleMonths]);

    return (
        <div>
            <Dropdown
                data={availableYearsDropdownData}
                title={t('choose_years', { ns: APP_NAME })}
                onChange={(val) => {
                    console.log('Selected Year: ', val);
                }}
                selectionMode="multiple"
            />
        </div>
    );
};
