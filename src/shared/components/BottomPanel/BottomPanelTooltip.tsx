import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectTooltipData,
    selectTooltipXPosition,
} from '@shared/store/UI/selectors';

export const BottomPanelTooltip = () => {
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
            <div className=" bg-custom-background-90 text-custom-light-blue-90 text-sm p-2 max-w-xs">
                {data.title && <h4 className="text-sm mb-1">{data.title}</h4>}
                <p className="text-xs">{data.content}</p>
            </div>
        </div>
    );
};
