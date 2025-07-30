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

import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownData } from '../Dropdown';
import { Tooltip } from '../Tooltip';
import { CalciteIcon } from '@esri/calcite-components-react';

type Props = {
    title: string;
    /**
     * list of options in the dropdown menu
     */
    dropdownListOptions: {
        value: string;
        label?: string;
    }[];
    /**
     * value of selected item in dropdown list
     */
    selectedValue: string;
    /**
     * tooltip for info icon next to title text
     */
    tooltipText?: string;
    /**
     * fires when user selects a new item in dropdown list
     * @param val
     * @returns
     */
    dropdownMenuSelectedItemOnChange: (val: string) => void;
    children?: React.ReactNode;
};

export const AnalysisToolHeader: FC<Props> = ({
    title,
    dropdownListOptions,
    selectedValue,
    tooltipText,
    children,
    dropdownMenuSelectedItemOnChange,
}) => {
    const dropdownData: DropdownData[] = useMemo(() => {
        return dropdownListOptions.map((d) => {
            const { value, label } = d;
            return {
                value,
                label: label ? label.toUpperCase() : value.toUpperCase(),
                selected: value === selectedValue,
            };
        });
    }, [dropdownListOptions, selectedValue]);

    return (
        <div className="flex items-center w-full select-none">
            <div className="flex items-center mr-4">
                {tooltipText && (
                    <Tooltip content={tooltipText} width={280}>
                        <CalciteIcon scale="s" icon="information" />
                    </Tooltip>
                )}

                <span className="uppercase text-sm ml-1">{title}</span>
            </div>

            <div className="flex-grow">
                <Dropdown
                    data={dropdownData}
                    onChange={dropdownMenuSelectedItemOnChange}
                />
            </div>

            {children}
        </div>
    );
};
