import { Slider } from '@shared/components/Slider';
import { maskLayerOpacityChanged } from '@shared/store/MaskTool/reducer';
import { selectMaskLayerOpcity } from '@shared/store/MaskTool/selectors';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const MaskLayerOpacityControl = () => {
    const dispatch = useDispatch();

    /**
     * opacity of the mask layer
     */
    const opacity = useSelector(selectMaskLayerOpcity);

    return (
        <div className="flex items-center calcite-mode-dark">
            <div className="flex items-center">
                <span className="text-xs mr-4 max-w-[90px] leading-none">
                    Opacity
                </span>
            </div>

            <div className={classNames('flex-grow pr-4')}>
                <Slider
                    value={opacity}
                    onChange={(val) => {
                        dispatch(maskLayerOpacityChanged(val));
                    }}
                />
            </div>
        </div>
    );
};
