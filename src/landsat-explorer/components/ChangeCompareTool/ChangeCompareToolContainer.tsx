import { PixelRangeSlider } from '@shared/components/PixelRangeSlider';
import { selectedRangeUpdated } from '@shared/store/ChangeCompareTool/reducer';
import {
    selectIsViewingChangeInChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { selectActiveAnalysisTool } from '@shared/store/Landsat/selectors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ChangeCompareToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedRange = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    if (tool !== 'change') {
        return null;
    }

    return (
        <div className="w-analysis-tool-container-width">
            <PixelRangeSlider
                values={selectedRange}
                valuesOnChange={(vals: number[]) => {
                    dispatch(selectedRangeUpdated(vals));
                }}
                min={-2}
                max={2}
                steps={0.1}
                tickLabels={[-2, -1, 0, 1, 2]}
                countOfTicks={17}
            />
        </div>
    );
};
