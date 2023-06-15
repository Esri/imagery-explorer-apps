import React, { FC } from 'react';
import { Slider } from '../Slider';
import { ColorPicker } from './ColorPicker';
import classNames from 'classnames';

type Props = {
    /**
     * opacity of the Mask Layer
     */
    selectedOpacity: number;
    /**
     * if true, uses the pixels as a clipping mask, showing the underlying landsat imagery using the “destination atop” blend mode
     */
    shouldClip: boolean;
    /**
     * color to render the mask layer
     */
    color: number[];
    colorOnChange: (color: number[]) => void;
    shouldClipOnToggle: () => void;
    opacityOnChange: (val: number) => void;
};

export const RenderingControls: FC<Props> = ({
    selectedOpacity,
    shouldClip,
    color,
    colorOnChange,
    shouldClipOnToggle,
    opacityOnChange,
}: Props) => {
    return (
        <div className="flex items-center calcite-mode-dark">
            <div className="flex items-center">
                <div className="cursor-pointer" onClick={shouldClipOnToggle}>
                    {shouldClip ? (
                        <calcite-icon icon="check-square" scale="s" />
                    ) : (
                        <calcite-icon icon="square" scale="s" />
                    )}
                </div>
                <span className="text-xs ml-2 max-w-[90px] leading-none">
                    Show as clipping mask
                </span>
            </div>

            <div
                className={classNames('mx-2', {
                    'is-disabled': shouldClip,
                })}
            >
                <ColorPicker color={color} onChange={colorOnChange} />
            </div>

            <div
                className={classNames('flex-grow', {
                    'is-disabled': shouldClip,
                })}
            >
                <Slider value={selectedOpacity} onChange={opacityOnChange} />
            </div>
        </div>
    );
};
