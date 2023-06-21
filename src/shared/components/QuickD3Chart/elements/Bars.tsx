import React, { useRef, useEffect } from 'react';

import { select, ScaleBand, ScaleLinear } from 'd3';

import { BAR_COLOR } from '../constants';

import { QuickD3ChartData, SvgContainerData } from '../types';

type Props = {
    xScale: ScaleBand<string | number>;
    yScale: ScaleLinear<number, number>;
    svgContainerData?: SvgContainerData;
    data: QuickD3ChartData;
    color?: string;
};

const Bars: React.FC<Props> = ({
    xScale,
    yScale,
    data,
    svgContainerData,
    color,
}) => {
    const barsGroup = useRef<SVGGElement>();

    const draw = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const existingBars = select(barsGroup.current).selectAll('rect');

        if (existingBars.size()) {
            existingBars.remove();
        }

        select(barsGroup.current)
            .selectAll(`rect`)
            .data(data)
            .enter()
            .append('rect')
            .style('fill', color || BAR_COLOR)
            .attr('x', (d) => xScale(d.key))
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => yScale(d.value))
            .attr('height', (d) => {
                return height - yScale(d.value);
            });
    };

    useEffect(() => {
        if (svgContainerData && xScale && yScale && data) {
            draw();
        }
    }, [xScale, yScale, data]);

    return <g ref={barsGroup} className="bar-group"></g>;
};

export default Bars;
