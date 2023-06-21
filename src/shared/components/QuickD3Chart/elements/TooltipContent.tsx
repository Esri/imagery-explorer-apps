import React from 'react';

import {
    TOOLTIP_BACKGROUND_COLOR,
    TOOLTIP_TEXT_COLOR,
    TOOLTIP_PADDING,
} from '../constants';
import { QuickD3ChartDataItem } from '../types';

type Props = {
    index4ItemOnHover?: number;
    barDataOnHover?: QuickD3ChartDataItem;
    lineDataOnHover?: QuickD3ChartDataItem;
};

const TooltipContent: React.FC<Props> = ({
    index4ItemOnHover,
    barDataOnHover,
    lineDataOnHover,
}) => {
    return (
        <div
            style={{
                padding: TOOLTIP_PADDING,
                background: TOOLTIP_BACKGROUND_COLOR,
                color: TOOLTIP_TEXT_COLOR,
            }}
        >
            <div>bar data: {barDataOnHover ? barDataOnHover.value : 'n/a'}</div>

            <div>
                line data: {lineDataOnHover ? lineDataOnHover.value : 'n/a'}
            </div>
        </div>
    );
};

export default TooltipContent;
