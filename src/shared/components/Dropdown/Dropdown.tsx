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
import React, { FC, useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useWindowSize from '@shared/hooks/useWindowSize';
import { CalciteIcon } from '@esri/calcite-components-react';

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
    tooltip?: string;
    /**
     * If true, the label text will not be converted to uppercase
     */
    skipUppercase?: boolean;
    onChange: (val: string) => void;
};

export const Dropdown: FC<Props> = ({
    data,
    disabled,
    tooltip,
    skipUppercase,
    onChange,
}: Props) => {
    const [shouldShowOptions, setShouldShowOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const windowSize = useWindowSize();

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

    const getDropdownMenu = () => {
        return (
            <div
                className={classNames(
                    'max-h-[351px] overflow-y-auto',
                    'text-xs bg-custom-background border border-custom-light-blue-5 border-b-0',
                    'fancy-scrollbar'
                )}
            >
                {data.map((d, index) => {
                    const { value, label } = d;

                    return (
                        <div
                            className="p-1 border-custom-light-blue-5 border-b cursor-pointer"
                            key={value}
                            data-testid={`dropdown-option-${value}`}
                            onClick={() => {
                                onChange(value);
                                setShouldShowOptions(false);
                            }}
                        >
                            <span
                                className={classNames({
                                    uppercase: !skipUppercase,
                                })}
                            >
                                {label || value}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    /**
     * This function returns the dropdown menu to be placed on the screen at a the fixed position.
     *
     * We need to use the fixed position to ensure that the dropdown menu can extend to outside of the bottom panel when the bottom panel
     * is displayed in a narrow screen (with overflow-x turned on).
     * @returns
     */
    const getDropdownMenuAtFixedPosition = () => {
        if (!containerRef.current) {
            return null;
        }

        if (!shouldShowOptions) {
            return null;
        }

        const viewportHeight = windowSize.innerHeight;

        // get the container's position relative to the viewport
        const { x, y, width } = containerRef.current.getBoundingClientRect();

        return (
            <div
                className={classNames(
                    'block bottom-panel-content-min-width:hidden fixed z-50'
                )}
                data-testid="dropdown-menu-at-fixed-position"
                style={{
                    // The bottom position (relative to the viewport) of the dropdown menu should be
                    // the space between the top of the container and the bottom of the viewport.
                    bottom: viewportHeight - y,
                    left: x,
                    width: width,
                }}
            >
                {getDropdownMenu()}
            </div>
        );
    };

    useEffect(() => {
        // close dropdown menu when viewport size has changed
        setShouldShowOptions(false);
    }, [windowSize]);

    if (!data || !data.length) {
        return null;
    }

    return (
        <div ref={containerRef} className={classNames('relative')}>
            <div className="relative group">
                <div
                    className={classNames([
                        // "border border-custom-light-blue-50 opacity-80",
                        'bg-custom-light-blue-5',
                        'p-1 text-xs cursor-pointer flex items-center justify-between',
                    ])}
                    onClick={() => {
                        setShouldShowOptions(!shouldShowOptions);
                    }}
                >
                    <span className="mr-1 whitespace-nowrap ">
                        {getLabel()}
                    </span>

                    <CalciteIcon icon="chevron-down" scale="s" />
                </div>

                {tooltip && (
                    <div
                        className={classNames(
                            'absolute bottom-[115%] hidden group-hover:block p-1',
                            'text-xs bg-custom-background opacity-90 border border-custom-light-blue-50',
                            'pointer-events-none'
                        )}
                    >
                        {tooltip}
                    </div>
                )}
            </div>

            {shouldShowOptions && (
                <div
                    className={classNames(
                        'hidden bottom-panel-content-min-width:block absolute bottom-[101%] left-0 right-0 z-50'
                    )}
                >
                    {getDropdownMenu()}
                </div>
            )}

            {getDropdownMenuAtFixedPosition()}
        </div>
    );
};
