import React, { useMemo } from 'react';
import { LandCoverType, ListOfLandCoverTypes } from '../config';
import { getFillColorByLandCoverType } from '../helpers';

type LegendData = {
    label: string;
    color: string;
    value: LandCoverType;
    selected: boolean;
};

export const ExpandedSpectralProfileChartLegend = () => {
    const legendData: LegendData[] = useMemo(() => {
        return ListOfLandCoverTypes.map((landCoverType: LandCoverType) => {
            return {
                label: landCoverType,
                color: getFillColorByLandCoverType(landCoverType),
                value: landCoverType,
                selected: true,
            };
        });
    }, []);

    return (
        <div className="pl-20 h-full flex items-center">
            <div className="">
                {legendData.map((data: LegendData, index: number) => {
                    return (
                        <div
                            key={data.value}
                            className="flex items-center mb-2"
                        >
                            <calcite-icon
                                icon={data.selected ? 'check-square' : 'square'}
                                class="text-sm cursor-pointer"
                                scale="s"
                            ></calcite-icon>

                            <svg width="16" height="2" className="mx-3">
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

                            <span className="text-sm">{data.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
