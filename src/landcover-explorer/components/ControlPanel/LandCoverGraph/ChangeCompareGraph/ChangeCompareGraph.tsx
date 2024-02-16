import React, { FC, useMemo, useRef } from 'react';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { DivergingBarChart } from '@vannizhang/react-d3-charts';
import { DivergingBarChartDataItem } from '@vannizhang/react-d3-charts/dist/DivergingBarChart/types';

// import DivergingBarChart from '@landcover-explorer/QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '@landcover-explorer/QuickD3Chart/types';

type Props = {
    data: DivergingBarChartDataItem[];
    itemOnHover: (index: number) => void;
};

const ChangeCompareGraph: FC<Props> = ({ data, itemOnHover }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    useGetTooltipPositionOnHover(containerRef);

    const customDomain4YScale = useMemo(() => {
        if (!data) {
            return [];
        }

        const absMaxVal = data.reduce((ans, d) => {
            return Math.max(ans, Math.abs(d.y));
        }, 0);

        const customYMax = absMaxVal * 1.25;

        return [-customYMax, customYMax];
    }, [data]);

    const getContent = () => {
        if (!data) {
            return (
                <div className="w-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            );
        }

        return (
            <DivergingBarChart
                data={data}
                showStickyLabelText={true}
                yScaleOptions={{
                    domain: customDomain4YScale,
                }}
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
                // itemOnHover={itemOnHover}
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
                    '--divider-line-color': 'var(--custom-light-blue-25)',
                    '--bar-label-text-color': 'var(--custom-light-blue-80)',
                } as React.CSSProperties
            }
        >
            {getContent()}
        </div>
    );
};

export default ChangeCompareGraph;
