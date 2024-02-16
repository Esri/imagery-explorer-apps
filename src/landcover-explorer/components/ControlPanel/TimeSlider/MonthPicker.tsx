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

import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useOnClickOutside from '@shared/hooks/useOnClickOutside';
import { sentinel2AquisitionMonthChanged } from '@landcover-explorer/store/LandcoverExplorer/reducer';
import { selectSentinel2AquisitionMonth } from '@landcover-explorer/store/LandcoverExplorer/selectors';
import { saveActiveMonthToHashParams } from '@landcover-explorer/utils/URLHashParams';

const MONTH_ABBR = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

type Props = {
    disabled?: boolean;
};

const MonthPicker: FC<Props> = ({ disabled }: Props) => {
    const dispatch = useDispatch();

    const month = useSelector(selectSentinel2AquisitionMonth);

    const [shouldShowOptions, setShouldShowOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>();

    useOnClickOutside(containerRef, () => {
        setShouldShowOptions(false);
    });

    useEffect(() => {
        saveActiveMonthToHashParams(month);
    }, [month]);

    return (
        <div
            ref={containerRef}
            className={classNames({
                'disabled-when-animation-mode-is-on': disabled,
            })}
        >
            <div
                className="border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer flex items-center"
                onClick={() => {
                    setShouldShowOptions(true);
                }}
            >
                <span className="mr-1">{MONTH_ABBR[month - 1]}</span>

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
                    {MONTH_ABBR.map((monthAbbr, index) => {
                        return (
                            <div
                                className="p-1 border-custom-light-blue-50 border-b cursor-pointer"
                                key={monthAbbr}
                                onClick={() => {
                                    dispatch(
                                        sentinel2AquisitionMonthChanged(
                                            index + 1
                                        )
                                    );
                                    setShouldShowOptions(false);
                                }}
                            >
                                {monthAbbr}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MonthPicker;
