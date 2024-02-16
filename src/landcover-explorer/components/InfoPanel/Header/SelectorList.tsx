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

import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import './SelectorList.css';
import classNames from 'classnames';
import React, { FC, useMemo, useRef, useState } from 'react';

export type SelectorListData = {
    value: string;
    label: string;
};

type Props = {
    /**
     * Title of this Selector List
     */
    title: string;
    /**
     * array of SelectorListData that will be used to populate the list
     */
    data: SelectorListData[];
    /**
     * value of the selected item
     */
    valueOfSelectedItem: string;
    /**
     * place holder text to be displayed when no item is selected
     */
    placeholderText: string;
    /**
     * If true, the selection list is searchable via the text input at the top of the list
     */
    searchable?: boolean;
    /**
     * Fires when user selects a new item from the list
     */
    onChange: (value: string) => void;
};

const ChevronDownIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M5 8.793l7 7 7-7v1.414l-7 7-7-7z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const ChevronUpIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M5 13.793l7-7 7 7v1.414l-7-7-7 7z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CloseIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M18.01 6.697L12.707 12l5.303 5.303-.707.707L12 12.707 6.697 18.01l-.707-.707L11.293 12 5.99 6.697l.707-.707L12 11.293l5.303-5.303z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const SelectorList: FC<Props> = ({
    title,
    data,
    valueOfSelectedItem,
    placeholderText,
    searchable = false,
    onChange,
}: Props) => {
    const containterRef = useRef<HTMLDivElement>();

    const [showList, setShowList] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const labelOfSelectedItem = useMemo(() => {
        if (!valueOfSelectedItem || !data.length) {
            return '';
        }

        const selectedItem = data.find((d) => d.value === valueOfSelectedItem);
        return selectedItem?.label || selectedItem?.value;
    }, [data, valueOfSelectedItem]);

    // close selection list
    useOnClickOutside(containterRef, setShowList.bind(null, false));

    const selectedItemOnChange = (value: string) => {
        onChange(value);
        setShowList(false);
        setSearchTerm('');
    };

    const getSearchInput = () => {
        if (!searchable) {
            return null;
        }

        return (
            <div className="relative bg-custom-background-95 p-2 text-sm">
                <input
                    className="w-full bg-transparent border border-custom-light-blue-50 px-1"
                    value={searchTerm}
                    placeholder={'Filter…'}
                    onChange={(evt) => {
                        setSearchTerm(evt.target.value);
                        // console.log(evt.target.value)
                    }}
                />

                {searchTerm && (
                    <div
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => {
                            setSearchTerm('');
                        }}
                    >
                        {CloseIcon}
                    </div>
                )}
            </div>
        );
    };

    const getSelectionList = () => {
        if (!showList) {
            return null;
        }

        const ListItemClassNames = `bg-custom-background-95 py-1 px-2 cursor-pointer text-sm`;

        const listData =
            searchTerm && searchable
                ? data.filter((d) => {
                      const { label, value } = d;
                      const textToCompareWithSearchTerm = label || value;
                      return textToCompareWithSearchTerm
                          .toLowerCase()
                          .startsWith(searchTerm.toLowerCase());
                  })
                : data;

        return (
            <div className="absolute top-9 max-h-96 overflow-y-auto w-full fancy-scroller border border-custom-light-blue-50 border-t-0">
                {getSearchInput()}

                <div
                    className={classNames(
                        ListItemClassNames,
                        'border-b border-custom-light-blue-50'
                    )}
                    onClick={selectedItemOnChange.bind(null, '')}
                >
                    <span>{placeholderText}</span>
                </div>

                {listData.map((d) => {
                    const { value, label } = d;
                    return (
                        <div
                            className={ListItemClassNames}
                            key={value}
                            onClick={selectedItemOnChange.bind(null, value)}
                        >
                            <span>{label || value}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="relative mr-4" ref={containterRef}>
            <h5 className="mb-2">{title}</h5>

            <div className="relative">
                <div
                    className="flex justify-between items-center border border-custom-light-blue-80 p-1 text-sm"
                    style={{
                        width: 300,
                    }}
                >
                    <div
                        className="flex-grow cursor-pointer"
                        onClick={() => {
                            setShowList(!showList);
                        }}
                    >
                        <span className="">
                            {labelOfSelectedItem || placeholderText}
                        </span>
                    </div>

                    <div className="flex items-center shrink-0">
                        {valueOfSelectedItem && (
                            <div
                                className="cursor-pointer"
                                onClick={selectedItemOnChange.bind(null, '')}
                            >
                                {CloseIcon}
                            </div>
                        )}

                        <div
                            className="cursor-pointer"
                            onClick={setShowList.bind(null, !showList)}
                        >
                            {showList ? ChevronUpIcon : ChevronDownIcon}
                        </div>
                    </div>
                </div>
                {getSelectionList()}
            </div>
        </div>
    );
};

export default SelectorList;
