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
import { LandCoverType, ListOfLandCoverTypes } from '../config';
import { getFillColorByLandCoverType } from '../helpers';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { CalciteIcon } from '@esri/calcite-components-react';

type LegendData = {
    label: string;
    color: string;
    value: LandCoverType;
    selected: boolean;
};

type Props = {
    excludedLandCoverTypes: Set<LandCoverType>;
    landCoverTypeOnClick: (landCoverType: LandCoverType) => void;
    landCoverTypeOnHover: (landCoverType: LandCoverType) => void;
    toggleSelectAll: () => void;
};

export const ExpandedSpectralProfileChartLegend: FC<Props> = ({
    excludedLandCoverTypes,
    landCoverTypeOnClick,
    landCoverTypeOnHover,
    toggleSelectAll,
}) => {
    const { t } = useTranslation();

    const legendData: LegendData[] = useMemo(() => {
        return ListOfLandCoverTypes.map((landCoverType: LandCoverType) => {
            return {
                label: t(landCoverType),
                color: getFillColorByLandCoverType(landCoverType),
                value: landCoverType,
                selected: excludedLandCoverTypes.has(landCoverType) === false,
            };
        });
    }, [excludedLandCoverTypes]);

    return (
        <div className="pl-20 h-full flex items-center">
            <div className="">
                <div
                    className="flex items-center mb-2"
                    title="toggle select all"
                >
                    <CalciteIcon
                        icon={
                            excludedLandCoverTypes.size === 0
                                ? 'square-inset-medium'
                                : 'square'
                        }
                        class="cursor-pointer"
                        scale="s"
                        onClick={toggleSelectAll}
                    ></CalciteIcon>
                    <span className="text-sm ml-3">
                        {t('spectral_profiles')}
                    </span>
                </div>
                {legendData.map((data: LegendData, index: number) => {
                    return (
                        <div
                            key={data.value}
                            className="flex items-center pb-2 cursor-pointer"
                            onMouseOver={() => landCoverTypeOnHover(data.value)}
                            onMouseOut={() => landCoverTypeOnHover(null)}
                        >
                            <CalciteIcon
                                icon={data.selected ? 'check-square' : 'square'}
                                class="text-sm cursor-pointer"
                                scale="s"
                                onClick={() => landCoverTypeOnClick(data.value)}
                            ></CalciteIcon>

                            <svg
                                width="16"
                                height="2"
                                className={classNames('mx-3', {
                                    'opacity-50': !data.selected,
                                })}
                            >
                                <line
                                    x1="0"
                                    y1="1"
                                    x2="24"
                                    y2="1"
                                    stroke={data.color}
                                    strokeWidth="2"
                                    strokeDasharray="4,2"
                                />
                            </svg>

                            <span
                                className={classNames('text-sm', {
                                    'opacity-50': !data.selected,
                                })}
                            >
                                {data.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
