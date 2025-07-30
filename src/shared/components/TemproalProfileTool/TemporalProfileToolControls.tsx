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

import React from 'react';
import { Dropdown } from '../Dropdown';
// import { useMonthOptions } from './useMonthOptions';
import { Tooltip } from '../Tooltip';
import { useTrendOptions } from './useTrendOptions';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';
import {
    getMonthAbbrName,
    getMonthAbbreviation,
} from '@shared/utils/date-time/monthHelpers';
import { useTranslation } from 'react-i18next';
import { CalciteIcon } from '@esri/calcite-components-react';
// import { useAcquisitionYearsAsDropdownMenuOptions } from '@shared/hooks/useAcquisitionYearsAsDropdownMenuOptions';

type Props = {
    /**
     * acquisition month to be used to fetch temporal trend data for a given month (Year to Year)
     */
    acquisitionMonth: number;
    /**
     * acquisition year to be used to fetch temporal trend data for a given year (Month to Month)
     */
    acquisitionYear: number;
    /**
     * user selected option for trend tool.
     */
    selectedTrendOption: TrendToolOption;
    /**
     * if true, show close button
     */
    shouldShowCloseButton: boolean;
    // /**
    //  * fires when user selects a new acquisition month that will be used in 'year-to-year' trend
    //  * @param month
    //  * @returns
    //  */
    // acquisitionMonthOnChange: (month: number) => void;
    // /**
    //  * fires when user selects a new acquisition year that will be used in 'month-to-month' trend
    //  * @param year
    //  * @returns
    //  */
    // acquisitionYearOnChange: (year: number) => void;
    /**
     * fires when user clicks on the close button
     * @returns
     */
    closeButtonOnClick: () => void;
    /**
     * emits when user selects a new option for trend tool
     * @param option
     * @returns
     */
    trendOptionOnChange: (option: TrendToolOption) => void;
};

export const TemporalProfileToolControls = ({
    acquisitionMonth,
    acquisitionYear,
    selectedTrendOption,
    shouldShowCloseButton,
    // acquisitionMonthOnChange,
    // acquisitionYearOnChange,
    closeButtonOnClick,
    trendOptionOnChange,
}: Props) => {
    const { t } = useTranslation();
    // const monthDropdownMenuData = useMonthOptions(acquisitionMonth);

    const trendOptionsDropdownMenuData = useTrendOptions(selectedTrendOption);

    // /**
    //  * options that will be used to populate the Dropdown Menu for year
    //  */
    // const yearDropdownMenuData =
    //     useAcquisitionYearsAsDropdownMenuOptions(acquisitionYear);

    return (
        <div className="prfile-control-tools">
            <div className="flex items-center select-none">
                <span className="ml-2 text-custom-light-blue-50 text-xs uppercase">
                    {t('time')}:
                </span>

                <div className="mx-1 w-1/3">
                    <Dropdown
                        data={trendOptionsDropdownMenuData}
                        onChange={(val) => {
                            // console.log(val)
                            trendOptionOnChange(val as TrendToolOption);
                        }}
                    />
                </div>

                <div className="p-1 text-xs bg-custom-background uppercase mx-1 px-1">
                    {selectedTrendOption === 'year-to-year'
                        ? getMonthAbbreviation(acquisitionMonth)
                        : acquisitionYear}
                </div>

                {shouldShowCloseButton && (
                    <div
                        className="shrink-0 flex items-center cursor-pointer"
                        onClick={closeButtonOnClick}
                    >
                        <Tooltip content={t('clear_map_selection')}>
                            <CalciteIcon icon="x-circle" scale="s" />
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
};
