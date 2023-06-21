import React, { useRef, useEffect } from 'react';

import { select, mouse, ScaleBand, ScaleLinear, ScaleTime } from 'd3';

import { SvgContainerData } from '../types';

import { REF_LINE_COLOR, REF_LINE_STROKE } from '../constants';

export type PointerPositionOnHover = {
    // index of the item on hover
    index4ItemOnHover: number;
    // position on x axis for the item on hover
    xPosition: number;
};

type Props = {
    xScale:
        | ScaleBand<string | number>
        | ScaleLinear<number, number>
        | ScaleTime<number, number>;
    xDomain?: (string | number)[];
    svgContainerData?: SvgContainerData;
    onHover?: (data: PointerPositionOnHover) => void;
};

const PointerEventsOverlay: React.FC<Props> = ({
    xScale,
    xDomain,
    svgContainerData,
    onHover,
}) => {
    const containerG = useRef<SVGGElement>();

    const itemOnHover = useRef<PointerPositionOnHover>();

    const initRefLine = () => {
        const { dimension } = svgContainerData;

        const { height } = dimension;

        const container = select(containerG.current);

        const refLine = container.selectAll('line');

        if (!refLine.size()) {
            container
                .append('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', height)
                .style('opacity', 0)
                .attr('stroke-width', REF_LINE_STROKE)
                .attr('stroke', REF_LINE_COLOR)
                .style('fill', 'none');
        }
    };

    const initOverlayRect = () => {
        const { dimension } = svgContainerData;

        const { height, width } = dimension;

        const container = select(containerG.current);

        container.selectAll('rect').remove();

        container
            .append('rect')
            // .attr("class", ClassNames.BackgroundRect)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'rgba(0,0,0,0)')
            .on('mouseleave', () => {
                setDataOnHover(null);
            })
            .on('mousemove', function () {
                const mousePosX = mouse(this)[0];
                // console.log(mousePosX)
                setDataOnHover(getDataByMousePos(mousePosX));
            });
    };

    const setDataOnHover = (data?: PointerPositionOnHover) => {
        itemOnHover.current = data;
        updateVerticalRefLinePos();
        onHover(data);
    };

    const updateVerticalRefLinePos = (): void => {
        const vRefLine = select(containerG.current).select('line');

        const opacity = itemOnHover.current ? 1 : 0;

        const xPos: number = itemOnHover.current
            ? itemOnHover.current.xPosition
            : 0;

        vRefLine.attr('x1', xPos).attr('x2', xPos).style('opacity', opacity);
    };

    const getDataByMousePos = (mousePosX: number): PointerPositionOnHover => {
        const { dimension } = svgContainerData;

        const { width } = dimension;

        // set offset if typeof xScale is ScaleBand
        const offset = 'bandwidth' in xScale ? xScale.bandwidth() / 2 : 0;

        // when pointer at left half of first bar OR at right half of last bar
        if (mousePosX < offset || mousePosX > width - offset) {
            const index = mousePosX < offset ? 0 : xDomain.length - 1;

            const value = xDomain[index];

            const xPosition =
                'bandwidth' in xScale ? xScale(value) + offset : xScale(+value);

            return {
                index4ItemOnHover: index,
                xPosition,
            };
        }

        let itemIndex = -1;
        let xPosition = 0;

        for (let i = 0, len = xDomain.length; i < len; i++) {
            const currItem = xDomain[i];
            const currItemPos =
                'bandwidth' in xScale
                    ? xScale(currItem) + offset
                    : xScale(+currItem);

            const nextItemIndex = xDomain[i + 1] ? i + 1 : i;
            const nextItem = xDomain[nextItemIndex];
            const nextItemPos =
                'bandwidth' in xScale
                    ? xScale(nextItem) + offset
                    : xScale(+nextItem);

            if (mousePosX >= currItemPos && mousePosX <= nextItemPos) {
                const distToCurrItem = Math.abs(mousePosX - currItemPos);
                const distToNextItem = Math.abs(mousePosX - nextItemPos);

                itemIndex = distToCurrItem < distToNextItem ? i : nextItemIndex;

                xPosition =
                    distToCurrItem < distToNextItem ? currItemPos : nextItemPos;

                break;
            }
        }

        return {
            index4ItemOnHover: itemIndex,
            xPosition,
        };
    };

    useEffect(() => {
        if (svgContainerData) {
            initRefLine();
            initOverlayRect();
        }
    }, [svgContainerData]);

    return <g className="pointer-event-overlay-group" ref={containerG} />;
};

export default PointerEventsOverlay;
