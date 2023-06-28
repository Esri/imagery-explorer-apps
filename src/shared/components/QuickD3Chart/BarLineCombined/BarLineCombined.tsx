import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
    ScaleBand,
    scaleLinear,
    scaleTime,
    ScaleLinear,
    ScaleTime,
    AxisScale,
    scaleBand,
    max,
    min,
} from 'd3';

import {
    // SvgContainerData,
    Dimension,
    Margin,
} from '../types';

import {
    SvgContainer,
    Bars,
    Line,
    XAxis,
    YAxis,
    PointerEventsOverlay,
    Tooltip,
} from '../elements';

import { PointerPositionOnHover } from '../elements/PointerEventsOverlay';

import {
    QuickD3ChartData,
    // QuickD3ChartDataItem
} from '../types';
import { SCALE_BAND_PADDING_INNER } from '../constants';

type XScale =
    | ScaleBand<string | number>
    | ScaleTime<number, number>
    | ScaleLinear<number, number>;
type YScale = ScaleLinear<number, number>;

type Props = {
    data4Bars?: QuickD3ChartData;
    data4Line?: QuickD3ChartData;
    barColor?: string;
    lineColor?: string;
    lineWidth?: number;
    margin?: Margin;
    timeFormatSpecifier?: string;
    //if specified, use list of tick values for x axis
    // xScaleTickValues?: (string | number)[];
    // specify this value to show only 1 in every n ticks on x axis so it won't be crowded
    numOfTicksOnXAxisToHide?: number;
    resizable?: boolean;
    showAxis?: boolean;
    yDomain?: number[];
};

const BarLineCombined: React.FC<Props> = ({
    data4Bars = [],
    data4Line = [],
    barColor,
    lineColor,
    lineWidth,
    margin,
    timeFormatSpecifier,
    // xScaleTickValues,
    numOfTicksOnXAxisToHide,
    resizable = true,
    showAxis = true,
    yDomain,
}) => {
    const [dimension, setDimension] = useState<Dimension>({
        height: 0,
        width: 0,
    });

    const [pointerPositionOnHover, setPointerPositionOnHover] =
        useState<PointerPositionOnHover>();

    const xDomain = useMemo(() => {
        if (!data4Bars.length && !data4Line.length) {
            return [];
        }

        const data =
            data4Bars && data4Bars.length ? [...data4Bars] : [...data4Line];

        return data.map((d) => {
            return typeof d.key === 'number' ? d.key.toString() : d.key;
        });
    }, [data4Bars, data4Line]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        if (data4Bars && data4Bars.length) {
            return scaleBand()
                .paddingInner(SCALE_BAND_PADDING_INNER)
                .range([0, width])
                .domain(xDomain);
        }

        const xmin = +data4Line[0].key;
        const xmax = max(data4Line, (d) => +d.key);

        const xScale = timeFormatSpecifier
            ? scaleTime().range([0, width]).domain([xmin, xmax])
            : scaleLinear().range([0, width]).domain([xmin, xmax]);

        return xScale;
    }, [dimension, xDomain]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        const ymax4Bars =
            data4Bars && data4Bars.length ? max(data4Bars, (d) => d.value) : 0;

        // const ymin4Bars = data4Bars && data4Bars.length
        //     ? min(data4Bars, d=>d.value)
        //     : undefined;

        const ymax4Lines =
            data4Line && data4Line.length
                ? max(data4Line, (d) => d.value)
                : undefined;

        // const ymin4Lines = data4Line && data4Line.length
        //     ? min(data4Line, d=>d.value)
        //     : undefined;

        const ymax = yDomain ? yDomain[1] : max([ymax4Bars, ymax4Lines]);

        const ymin = yDomain ? yDomain[0] : 0;
        // const ymin = min([ymin4Bars, ymin4Lines])

        return scaleLinear<number, number>()
            .range([height, 0])
            .domain([ymin, ymax]);
    }, [dimension, data4Bars, data4Line]);

    const xScaleTickValues = useMemo(() => {
        const data = data4Line;

        const maxNumOfTicks = 5;

        if (data.length <= maxNumOfTicks) {
            return data.map((d) => d.key);
        }

        const numOfTicksPerGroup = Math.ceil(data.length / maxNumOfTicks);

        return data
            .map((d) => d.key)
            .filter((d, i) => {
                return i % numOfTicksPerGroup === 0;
            });
    }, [data4Line]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <SvgContainer
                margin={margin}
                resizable={resizable}
                dimensionOnChange={setDimension}
            >
                {data4Bars && data4Bars.length ? (
                    <Bars
                        data={data4Bars}
                        xScale={xScale as ScaleBand<string | number>}
                        yScale={yScale}
                        color={barColor}
                    />
                ) : (
                    <></>
                )}

                {data4Line && data4Line.length ? (
                    <Line
                        data={data4Line}
                        xScale={xScale}
                        yScale={yScale}
                        color={lineColor}
                        width={lineWidth}
                    />
                ) : (
                    <></>
                )}

                {showAxis ? (
                    <XAxis
                        scale={xScale as AxisScale<string | number>}
                        timeFormatSpecifier={timeFormatSpecifier}
                        tickValues={xScaleTickValues}
                    />
                ) : (
                    <></>
                )}

                {showAxis ? <YAxis scale={yScale} /> : <></>}

                <PointerEventsOverlay
                    xDomain={xDomain}
                    xScale={xScale}
                    onHover={setPointerPositionOnHover}
                />
            </SvgContainer>

            <Tooltip
                pointerPosition={pointerPositionOnHover}
                dimension={dimension}
                data4Bars={data4Bars}
                data4Line={data4Line}
                margin={margin}
            />
        </div>
    );
};

export default BarLineCombined;
