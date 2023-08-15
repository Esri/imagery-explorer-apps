import React from 'react';
import { RenderingControls } from './RenderingControls';
import {
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
} from '@shared/store/Analysis/reducer';
import {
    selectMaskLayerOpcity,
    selectMaskOptions,
    selectShouldClipMaskLayer,
} from '@shared/store/Analysis/selectors';
import { updateMaskColor } from '@shared/store/Analysis/thunks';
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
    );
};
