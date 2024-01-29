import React from 'react';
import { RenderingControls } from './RenderingControls';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
} from '@shared/store/MaskTool/reducer';
import {
    selectMaskLayerOpcity,
    selectMaskOptions,
    selectShouldClipMaskLayer,
} from '@shared/store/MaskTool/selectors';
import { updateMaskColor } from '@shared/store/MaskTool/thunks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const RenderingControlsContainer = () => {
    const dispatch = useDispatch();

    /**
     * options for selected spectral index
     */
    const maskOptions = useSelector(selectMaskOptions);

    /**
     * opacity of the mask layer
     */
    const opacity = useSelector(selectMaskLayerOpcity);

    /**
     * if true, use mask layer to clip the imagery scene
     */
    const shouldClip = useSelector(selectShouldClipMaskLayer);

    return (
        <RenderingControls
            transparence={1 - opacity}
            shouldClip={shouldClip}
            color={maskOptions.color}
            colorOnChange={(color) => {
                dispatch(updateMaskColor(color));
            }}
            shouldClipOnToggle={() => {
                dispatch(shouldClipMaskLayerToggled());
            }}
            transparenceOnChange={(val) => {
                dispatch(maskLayerOpacityChanged(1 - val));
            }}
        />
    );
};
