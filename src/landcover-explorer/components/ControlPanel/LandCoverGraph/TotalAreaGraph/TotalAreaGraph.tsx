import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { BarChartBasic } from '@vannizhang/react-d3-charts';
import { BarChartDataItem } from '@vannizhang/react-d3-charts/dist/BarChart/types';
// import BarChart from '@landcover-explorer/QuickD3Chart/BarChart/BarChart';
// import { MARGIN } from '@landcover-explorer/QuickD3Chart/constants';

// import DivergingBarChart from '@landcover-explorer/QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '@landcover-explorer/QuickD3Chart/types';

type Props = {
    data: BarChartDataItem[];
    itemOnHover: (index: number) => void;
};

const TotalAreaGraph: FC<Props> = ({ data, itemOnHover }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    useGetTooltipPositionOnHover(containerRef);

    const getContent = () => {
        if (!data) {
            return (
                <div className="w-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            );
        }

        return (
            // <BarChart
            //     data4Bars={data}
            //     showAxis={true}
            //     showLabelOnTop={true}
            //     showXAxisLine={true}
            //     // itemOnHover={itemOnHover}
            // />

            <BarChartBasic
                data={data}
                showStickyLabelText={true}
                leftAxisOptions={{
                    shouldHide: true,
                }}
                bottomAxisOptions={{
                    shouldRotateTextLabels: true,
                }}
                margin={{
                    top: 15,
                    right: 15,
                    bottom: 50,
                    left: 30,
                }}
            />
        );
    };

    return (
        <div
            className="relative first-letter:w-full h-full"
            ref={containerRef}
            style={
                {
                    '--axis-tick-line-color': 'var(--custom-light-blue-50)',
                    '--axis-tick-text-color': 'var(--custom-light-blue-80)',
                    '--bar-label-text-color': 'var(--custom-light-blue-80)',
                } as React.CSSProperties
            }
        >
            {getContent()}
        </div>
    );
};

export default TotalAreaGraph;
