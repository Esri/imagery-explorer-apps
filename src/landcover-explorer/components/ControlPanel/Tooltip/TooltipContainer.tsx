import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectTooltipData,
    selectTooltipXPosition,
} from '@landcover-explorer/store/UI/selectors';
import Tooltip from './Tooltip';

const TooltipContainer = () => {
    const xPosition = useSelector(selectTooltipXPosition);

    const data = useSelector(selectTooltipData);

    if (!data || !xPosition) {
        return null;
    }

    return (
        <div
            className="absolute bottom-bottom-panel-height pb-1 z-10"
            style={{
                left: xPosition,
            }}
        >
            <Tooltip data={data} />
        </div>
    );
};

export default TooltipContainer;
