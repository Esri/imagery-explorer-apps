import React, { useEffect } from 'react';

import { select, axisLeft, AxisScale } from 'd3';

import { SvgContainerData } from '../types';

import { AXIS_TEXT_COLOR, AXIS_LINE_COLOR } from '../constants';

type Props = {
    scale: AxisScale<number>;
    svgContainerData?: SvgContainerData;
};

const XAxis: React.FC<Props> = ({ scale, svgContainerData }) => {
    const drawYAxis = () => {
        const { rootGroup } = svgContainerData;

        // const { width } = dimension;

        const yAxis = axisLeft(scale)
            .ticks(3)
            // .tickSizeInner(-width)
            .tickPadding(5);

        const yAxisLabel = select(rootGroup).selectAll('.y.axis');

        if (!yAxisLabel.size()) {
            select(rootGroup).append('g').attr('class', 'y axis').call(yAxis);

            const yAxisG = select(rootGroup).select('.y.axis');

            yAxisG
                .selectAll('.domain, .tick line')
                .attr('stroke', AXIS_LINE_COLOR);

            yAxisG.selectAll('.tick text').style('fill', AXIS_TEXT_COLOR);
        } else {
            yAxisLabel.call(yAxis);
        }
    };

    useEffect(() => {
        if (svgContainerData) {
            drawYAxis();
        }
    }, [scale, svgContainerData]);

    return null;
};

export default XAxis;
