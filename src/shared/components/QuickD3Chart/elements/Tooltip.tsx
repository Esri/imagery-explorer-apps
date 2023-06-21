import React, { useEffect } from 'react';
import { QuickD3ChartData, Dimension, Margin } from '../types';
import { PointerPositionOnHover } from './PointerEventsOverlay';
import {
    MARGIN,
    // TOOLTIP_BACKGROUND_COLOR,
    // TOOLTIP_TEXT_COLOR,
    TOOLTIP_BOXSHADOW_COLOR,
    // TOOLTIP_PADDING
} from '../constants';

import { TooltipContent } from './';

type Props = {
    dimension: Dimension;
    pointerPosition?: PointerPositionOnHover;
    data4Bars?: QuickD3ChartData;
    data4Line?: QuickD3ChartData;
    margin?: Margin;
};

type TooltipPos = {
    top: number;
    left: number;
};

const Tooltip: React.FC<Props> = ({
    dimension,
    pointerPosition,
    data4Bars,
    data4Line,
    margin = MARGIN,
}) => {
    const tooltipRef = React.useRef<HTMLDivElement>();

    const [tooltipPos, setTooltipPos] = React.useState<TooltipPos>({
        top: 0,
        left: 0,
    });

    const updateTooltipPosition = () => {
        const tooltipDiv = tooltipRef.current;

        if (!tooltipDiv) {
            return;
        }

        const { width } = dimension;

        const tooltipDivWidth = tooltipDiv.offsetWidth;
        const tooltipDivHeight = tooltipDiv.offsetHeight;

        const top = -(tooltipDivHeight - margin.top);
        const xPosForItemOnHover = pointerPosition.xPosition + margin.left;

        let left =
            xPosForItemOnHover + tooltipDivWidth / 2 >= width + margin.left
                ? xPosForItemOnHover - tooltipDivWidth
                : xPosForItemOnHover - tooltipDivWidth / 2;

        left = left >= margin.left ? left : margin.left;

        setTooltipPos({
            top,
            left,
        });
    };

    useEffect(() => {
        if (pointerPosition) {
            updateTooltipPosition();
        }
    }, [pointerPosition]);

    return (
        <div
            ref={tooltipRef}
            style={{
                display: pointerPosition ? 'block' : 'none',
                position: 'absolute',
                left: `${tooltipPos.left}px`,
                top: `${tooltipPos.top}px`,
                pointerEvents: 'none',
                boxSizing: 'border-box',
                boxShadow: `0 0 10px 2px ${TOOLTIP_BOXSHADOW_COLOR}`,
                zIndex: 5,
            }}
        >
            <TooltipContent
                index4ItemOnHover={
                    pointerPosition ? pointerPosition.index4ItemOnHover : -1
                }
                barDataOnHover={
                    pointerPosition && data4Bars
                        ? data4Bars[pointerPosition.index4ItemOnHover]
                        : undefined
                }
                lineDataOnHover={
                    pointerPosition && data4Line
                        ? data4Line[pointerPosition.index4ItemOnHover]
                        : undefined
                }
            />
        </div>
    );
};

export default Tooltip;
