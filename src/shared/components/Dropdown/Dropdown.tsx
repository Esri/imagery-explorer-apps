import classNames from 'classnames';
import React, { FC, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export type DropdownData = {
    /**
     * value of this item
     */
    value: string;
    /**
     * label text will be displayed
     */
    label?: string;
    /**
     * If true, this item is selected
     */
    selected: boolean;
};

type Props = {
    data: DropdownData[];
    disabled?: boolean;
    onChange: (val: string) => void;
};

export const Dropdown: FC<Props> = ({ data, disabled, onChange }: Props) => {
    const [shouldShowOptions, setShouldShowOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>();

    useOnClickOutside(containerRef, () => {
        setShouldShowOptions(false);
    });

    const getLabel = () => {
        let selectedItem = data.find((d) => d.selected);

        if (!selectedItem) {
            selectedItem = data[0];
        }

        return selectedItem.label || selectedItem.value;
    };

    if (!data || !data.length) {
        return null;
    }

    return (
        <div ref={containerRef} className={classNames('relative')}>
            <div
                className="border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer flex items-center justify-between"
                onClick={() => {
                    setShouldShowOptions(true);
                }}
            >
                <span className="mr-1">{getLabel()}</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                >
                    <path fill="currentColor" d="M13.1 6L8 11.1 2.9 6z" />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
            </div>

            {shouldShowOptions && (
                <div className="absolute bottom-0 left-0 right-0 bg-custom-background border border-custom-light-blue-50 border-b-0 text-xs">
                    {data.map((d, index) => {
                        const { value, label } = d;

                        return (
                            <div
                                className="p-1 border-custom-light-blue-50 border-b cursor-pointer"
                                key={value}
                                onClick={() => {
                                    onChange(value);
                                    setShouldShowOptions(false);
                                }}
                            >
                                <span className="uppercase">
                                    {label || value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
