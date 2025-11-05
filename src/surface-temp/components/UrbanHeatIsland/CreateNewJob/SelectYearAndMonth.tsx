import { Dropdown } from '@shared/components/Dropdown';
import { APP_NAME } from '@shared/config';
import { useAvailableAcquisitionYears } from '@shared/hooks/useAvailableAcquisitionYears';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectedMonthsChanged,
    selectedYearsChanged,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import {
    selectSelectedMonths4UrbanHeatIslandTool,
    selectSelectedYears4UrbanHeatIslandTool,
} from '@shared/store/UrbanHeatIslandTool/selectors';
import { getMonthAbbreviation } from '@shared/utils/date-time/monthHelpers';
import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export const SelectYearAndMonth = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const selectedYears = useAppSelector(
        selectSelectedYears4UrbanHeatIslandTool
    );

    const selectedMonths = useAppSelector(
        selectSelectedMonths4UrbanHeatIslandTool
    );

    const availableYears = useAvailableAcquisitionYears();

    const availbleMonths = useMemo(() => {
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        return months.map((m) => {
            return {
                value: m,
                label: m.toString(),
            };
        });
    }, []);

    const availableYearsDropdownData = useMemo(() => {
        const selectedYearsSet = new Set(selectedYears);
        // console.log('Selected Years Set: ', selectedYearsSet);

        const output = availableYears
            .map((year) => ({
                value: year.toString(),
                label: year.toString(),
                selected: selectedYearsSet.has(year),
            }))
            .reverse();
        // console.log('Available Years Dropdown Data: ', output);
        return output;
    }, [availableYears, selectedYears]);

    const availableMonthsDropdownData = useMemo(() => {
        const selectedMonthsSet = new Set(selectedMonths);

        return availbleMonths.map((d) => ({
            value: d.value.toString(),
            label: d.label,
            selected: selectedMonthsSet.has(d.value),
        }));
    }, [availbleMonths, selectedMonths]);

    return (
        <div>
            <div className="flex items-center relative w-full">
                <Dropdown
                    data={availableYearsDropdownData}
                    title={t('choose_years', { ns: APP_NAME })}
                    onChange={(val) => {
                        const year = parseInt(val, 10);
                        const newSelectedYears = selectedYears.includes(year)
                            ? selectedYears.filter((y) => y !== year)
                            : [...selectedYears, year];

                        console.log('newSelectedYears', newSelectedYears);

                        // Dispatch action to update selected years in the store
                        dispatch(selectedYearsChanged(newSelectedYears));
                    }}
                    selectionMode="multiple"
                />

                <div className="ml-2 pl-2 border-l border-custom-light-blue-50">
                    <Dropdown
                        data={availableMonthsDropdownData}
                        title={t('choose_months', { ns: APP_NAME })}
                        onChange={(val) => {
                            const month = parseInt(val, 10);
                            const newSelectedMonths = selectedMonths.includes(
                                month
                            )
                                ? selectedMonths.filter((m) => m !== month)
                                : [...selectedMonths, month];

                            // Dispatch action to update selected months in the store
                            dispatch(selectedMonthsChanged(newSelectedMonths));
                        }}
                        selectionMode="multiple"
                    />
                </div>
            </div>

            <div className="mt-3 text-xs opacity-80">
                {selectedMonths?.length === 0 &&
                    selectedYears?.length === 0 && (
                        <p>
                            {t('please_select_months_and_years', {
                                ns: APP_NAME,
                            })}
                        </p>
                    )}
                {selectedMonths?.length > 0 && selectedYears?.length === 0 && (
                    <p>{t('please_select_years', { ns: APP_NAME })}</p>
                )}
                {selectedMonths?.length === 0 && selectedYears?.length > 0 && (
                    <p>{t('please_select_months', { ns: APP_NAME })}</p>
                )}

                {selectedMonths?.length > 0 && selectedYears?.length > 0 && (
                    // t('selected_months_and_years', {
                    //         months: selectedMonths
                    //             .map((m) => m.toString())
                    //             .join(', '),
                    //         years: selectedYears.join(', '),
                    //         ns: APP_NAME,
                    // })
                    <Trans
                        i18nKey="selected_months_and_years"
                        ns={APP_NAME}
                        values={{
                            months: selectedMonths
                                .map((m) => m.toString())
                                .join(', '),
                            years: selectedYears.join(', '),
                        }}
                        components={{ strong: <strong /> }}
                    />
                )}
            </div>
        </div>
    );
};
