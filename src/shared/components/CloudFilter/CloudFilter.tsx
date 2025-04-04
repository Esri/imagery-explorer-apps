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

import React, { FC, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Slider } from '../Slider/Slider';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * user selected cloud coverage threshold ranges from 0 to 1
     */
    cloudCoverage: number;
    /**
     * if true, Cloud Filter should be disabled
     */
    disabled: boolean;
    /**
     * fires when user selects a new cloud coverage threshold
     * @param val new cloud coverage threshold
     * @returns
     */
    onChange: (val: number) => void;
};

type TitleTextProps = {
    cloudCoverage: number;
};

const TitleText: FC<TitleTextProps> = ({ cloudCoverage }: TitleTextProps) => {
    const { t } = useTranslation();

    const getFormattedCouldCoverageInPercent = () => {
        if (isNaN(cloudCoverage)) {
            return 'N/A';
        }

        return `${Math.floor(cloudCoverage * 100)}%`;
    };

    return (
        <div className="text-xs flex items-center">
            <span className="uppercase text-custom-light-blue-50 mr-[1px]">
                {t('cloud')}
            </span>

            <div className="w-[30px] text-right">
                <span>{getFormattedCouldCoverageInPercent()}</span>
            </div>
        </div>
    );
};

/**
 * A slider component to select cloud coverage that will be used to find Landsat scenes
 * @param param0
 * @returns
 */
export const CloudFilter: FC<Props> = ({
    cloudCoverage,
    disabled,
    onChange,
}) => {
    const cloudIconOnClick = (shouldDecrement: boolean) => {
        // do the calculation using integer to make the result more accurate
        let newVal = cloudCoverage * 100;

        if (shouldDecrement) {
            newVal -= 5;
        } else {
            newVal += 5;
        }

        if (newVal > 100) {
            newVal = 100;
        }

        if (newVal < 0) {
            newVal = 0;
        }

        // convert back to the val within range of 0 - 1
        newVal = newVal / 100;

        onChange(newVal);
    };

    return (
        <div
            className={classNames('mx-1 flex items-center', {
                'is-disabled': disabled,
            })}
        >
            <TitleText cloudCoverage={cloudCoverage} />

            <div className="flex items-center ml-2">
                {/* use offline icon to indicate low cloud tolerance */}
                <calcite-icon
                    scale="s"
                    icon="offline"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={cloudIconOnClick.bind(null, true)}
                />

                <div
                    // id="cloud-filter-container"
                    className="w-12 h-4 mx-1"
                >
                    <Slider
                        steps={[
                            0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4,
                            0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85,
                            0.9, 0.95, 1.0,
                        ]}
                        value={cloudCoverage}
                        onChange={onChange}
                    />
                </div>

                {/* use online icon to indicate high cloud tolerance */}
                <calcite-icon
                    scale="s"
                    icon="online"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={cloudIconOnClick.bind(null, false)}
                />
            </div>
        </div>
    );
};
