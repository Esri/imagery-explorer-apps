import {
    MaskMethodList,
    MaskPixelRangeSlider,
} from '@shared/components/MaskTool';
import { maskMethodChanged } from '@shared/store/Analysis/reducer';
import {
    selectMaskMethod,
    selectMaskOptions,
} from '@shared/store/Analysis/selectors';
import { updateSelectedRange } from '@shared/store/Analysis/thunks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const selectedMethod = useSelector(selectMaskMethod);

    const maskOptions = useSelector(selectMaskOptions);

    return (
        <div className="w-[280px] h-full mx-2">
            <MaskMethodList
                selectedMethod={selectedMethod}
                onChange={(val) => {
                    dispatch(maskMethodChanged(val));
                }}
            />

            <MaskPixelRangeSlider
                values={maskOptions.selectedRange}
                valOnChange={(index, value) => {
                    dispatch(updateSelectedRange(index, value));
                }}
            />
        </div>
    );
};
