import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { PixelRangeSlider as MaskPixelRangeSlider } from './PixelRangeSlider';

import { RenderingControls as MaskRenderingControls } from './RenderingControls';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    spectralIndex4MaskToolChanged,
} from '@shared/store/Analysis/reducer';
import {
    selectMaskLayerOpcity,
    selectSpectralIndex4MaskTool,
    selectMaskOptions,
    selectShouldClipMaskLayer,
    selectActiveAnalysisTool,
} from '@shared/store/Analysis/selectors';
import {
    updateMaskColor,
    updateSelectedRange,
} from '@shared/store/Analysis/thunks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const MaskToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const selectedSpectralIndex = useSelector(selectSpectralIndex4MaskTool);

    const maskOptions = useSelector(selectMaskOptions);

    const opacity = useSelector(selectMaskLayerOpcity);

    const shouldClip = useSelector(selectShouldClipMaskLayer);

    if (tool !== 'mask') {
        return null;
    }

    return (
        <div className="w-analysis-tool-container-width h-full">
            <AnalysisToolHeader
                title="Mask Index"
                data={[
                    {
                        value: 'water',
                        label: '',
                    },
                    {
                        value: 'vegetation',
                        label: '',
                    },
                    {
                        value: 'moisture',
                        label: '',
                    },
                ]}
                selectedSpectralIndex={selectedSpectralIndex}
                selectedSpectralIndexOnChange={(val) => {
                    dispatch(spectralIndex4MaskToolChanged(val));
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
