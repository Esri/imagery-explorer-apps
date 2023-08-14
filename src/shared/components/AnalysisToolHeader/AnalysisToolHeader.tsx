import { SpectralIndex } from '@typing/imagery-service';
import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownData } from '../Dropdown';
import { Tooltip } from '../Tooltip';

type SpectralIndexOption = {
    value: SpectralIndex;
    label?: string;
};

type Props = {
    title: string;
    /**
     * list of spectral index to be included in the dropdown menu
     */
    data: SpectralIndexOption[];
    /**
     * user selected spectral index
     */
    selectedSpectralIndex: SpectralIndex;
    tooltipText?: string;
    /**
     * fires when user selects a new spectral index
     * @param val
     * @returns
     */
    selectedSpectralIndexOnChange: (val: SpectralIndex) => void;
};

export const AnalysisToolHeader: FC<Props> = ({
    title,
    data,
    selectedSpectralIndex,
    tooltipText,
    selectedSpectralIndexOnChange,
}: Props) => {
    const dropdownData: DropdownData[] = useMemo(() => {
        return data.map((d) => {
            const { value, label } = d;
            return {
                value,
                label: label ? label.toUpperCase() : value.toUpperCase(),
                selected: value === selectedSpectralIndex,
            };
        });
    }, [data]);

    return (
        <div className="flex items-center w-full">
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
                    onChange={selectedSpectralIndexOnChange}
                />
            </div>

            {/* <div className="ml-1 shrink-0 flex items-center cursor-pointer">
                <calcite-icon scale="s" icon="download-to" />
            </div> */}
        </div>
    );
};
