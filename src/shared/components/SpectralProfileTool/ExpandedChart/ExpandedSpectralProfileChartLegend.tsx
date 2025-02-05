import React, { FC, useMemo } from 'react';
import { LandCoverType, ListOfLandCoverTypes } from '../config';
import { getFillColorByLandCoverType } from '../helpers';
import classNames from 'classnames';

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
    const legendData: LegendData[] = useMemo(() => {
        return ListOfLandCoverTypes.map((landCoverType: LandCoverType) => {
            return {
                label: landCoverType,
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
                    <calcite-icon
                        icon={
                            excludedLandCoverTypes.size === 0
                                ? 'square-inset-medium'
                                : 'square'
                        }
                        class="cursor-pointer"
                        scale="s"
                        onClick={toggleSelectAll}
                    ></calcite-icon>
                    <span className="text-sm ml-3">Spectral Profiles</span>
                </div>
                {legendData.map((data: LegendData, index: number) => {
                    return (
                        <div
                            key={data.value}
                            className="flex items-center pb-2 cursor-pointer"
                            onMouseOver={() => landCoverTypeOnHover(data.value)}
                            onMouseOut={() => landCoverTypeOnHover(null)}
                        >
                            <calcite-icon
                                icon={data.selected ? 'check-square' : 'square'}
                                class="text-sm cursor-pointer"
                                scale="s"
                                onClick={() => landCoverTypeOnClick(data.value)}
                            ></calcite-icon>

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
