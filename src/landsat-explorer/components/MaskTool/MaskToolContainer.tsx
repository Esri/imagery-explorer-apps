import {
    MaskMethodList,
    MaskPixelRangeSlider,
    MaskRenderingControls,
} from '@shared/components/MaskTool';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    spectralIndexChanged,
} from '@shared/store/Analysis/reducer';
import {
    selectMaskLayerOpcity,
    selectSpectralIndex,
    selectMaskOptions,
    selectShouldClipMaskLayer,
} from '@shared/store/Analysis/selectors';
import {
    updateMaskColor,
    updateSelectedRange,
} from '@shared/store/Analysis/thunks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const selectedSpectralIndex = useSelector(selectSpectralIndex);

    const maskOptions = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

    return (
        <div className="w-[250px] h-full mx-4">
            <MaskMethodList
                selectedSpectralIndex={selectedSpectralIndex}
                onChange={(val) => {
                    dispatch(spectralIndexChanged(val));
                }}
            />

            <MaskPixelRangeSlider
                values={maskOptions.selectedRange}
                valOnChange={(index, value) => {
                    dispatch(updateSelectedRange(index, value));
                }}
            />

            <MaskRenderingControls
                selectedOpacity={opacity}
                shouldClip={shouldClip}
                color={maskOptions.color}
                colorOnChange={(color) => {
                    dispatch(updateMaskColor(color));
                }}
                shouldClipOnToggle={() => {
                    dispatch(shouldClipMaskLayerToggled());
                }}
                opacityOnChange={(val) => {
                    dispatch(maskLayerOpacityChanged(val));
                }}
            />
        </div>
    );
};
