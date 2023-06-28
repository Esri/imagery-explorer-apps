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
        <div className="text-xs p-1 bg-custom-background text-custom-light-blue-90 border border-custom-light-blue-50 opacity-75">
            <span>{lineDataOnHover ? lineDataOnHover.tooltip : 'n/a'}</span>
        </div>
    );
};

export default TooltipContent;
