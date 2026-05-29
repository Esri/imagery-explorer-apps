import { getChangeCompareLayerColorrampAsCSSGradient } from '@shared/components/ChangeCompareTool/helpers';
import { RangeSlider } from '@shared/components/Slider/RangeSlider';
import { selectedRangeUpdated } from '@shared/store/ChangeCompareTool/reducer';
import {
    selectFullPixelValuesRangeInChangeCompareTool,
    selectUserSelectedRangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import React from 'react';

export const DRXChangeCompareTool = () => {
    const tool = useAppSelector(selectActiveAnalysisTool);

    const dispatch = useAppDispatch();

    const selectedRange = useAppSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const fullPixelValueRange = useAppSelector(
        selectFullPixelValuesRangeInChangeCompareTool
    );

    const legend: React.ReactNode = (
        <div
            className="w-full h-2"
            style={{
                background: getChangeCompareLayerColorrampAsCSSGradient(),
            }}
        ></div>
    );

    if (tool !== 'change') {
        return null;
    }

    return (
        <div>
            <RangeSlider
                values={selectedRange}
                valuesOnChange={(vals: number[]) => {
                    dispatch(selectedRangeUpdated(vals));
                }}
                min={fullPixelValueRange[0]}
                max={fullPixelValueRange[1]}
                steps={1}
                showSliderTooltip={true}
                legend={legend}
            />
        </div>
    );
};
