import React, { useEffect, useMemo } from 'react';
import {
    select,
    line,
    ScaleBand,
    ScaleLinear,
    ScaleTime,
    curveMonotoneX,
} from 'd3';

import {
    QuickD3ChartData,
    QuickD3ChartDataItem,
    SvgContainerData,
} from '../types';

import { LINE_COLOR, LINE_WIDTH } from '../constants';

type Props = {
    xScale:
        | ScaleBand<string | number>
        | ScaleTime<number, number>
        | ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: QuickD3ChartData[];
    color?: string;
    width?: number;
};

const Lines: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    color,
    width,
}) => {
    const lineGroup = React.useRef<SVGGElement>();

    // set offset if typeof xScale is ScaleBand
    const xOffset = useMemo(() => {
        return 'bandwidth' in xScale ? xScale.bandwidth() / 2 : 0;
    }, [xScale]);

    const valueline = useMemo(() => {
        return line<QuickD3ChartDataItem>()
            .curve(curveMonotoneX)
            .x((d) => {
                return 'bandwidth' in xScale
                    ? xScale(d.key) + xOffset
                    : xScale(+d.key);
            })
            .y((d) => yScale(d.value));
    }, [xScale, yScale]);

    const draw = () => {
        remove();

        select(lineGroup.current)
            .selectAll('path')
            .data(data)
            .join('path')
            .attr('d', (d) => {
                return valueline(d);
            })
            .style('fill', 'none')
            .style('stroke', (d) => {
                return 'red';
            })
            .style('stroke-width', (d, index: number) => {
                return 1;
            })
            .style('opacity', (d, index: number) => {
                return 1;
            });
    };

    const remove = () => {
        const lines = select(lineGroup.current).selectAll('path');

        // check the number of existing lines, if greater than 0; remove all existing ones
        if (lines.size()) {
            lines.remove().exit();
        }
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={lineGroup} className="lines-group"></g>;
};

export default Lines;
