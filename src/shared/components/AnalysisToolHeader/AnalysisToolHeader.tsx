import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownData } from '../Dropdown';
import { Tooltip } from '../Tooltip';

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
};

export const AnalysisToolHeader: FC<Props> = ({
    title,
    dropdownListOptions,
    selectedValue,
    tooltipText,
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
                        <calcite-icon scale="s" icon="information" />
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
        </div>
    );
};
