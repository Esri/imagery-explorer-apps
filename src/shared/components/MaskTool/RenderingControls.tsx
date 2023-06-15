import React, { FC } from 'react';
import { Slider } from '../Slider';

type Props = {
    /**
     * opacity of the Mask Layer
     */
    selectedOpacity: number;
    /**
     * if true, uses the pixels as a clipping mask, showing the underlying landsat imagery using the “destination atop” blend mode
     */
    shouldClip: boolean;
    shouldClipOnToggle: () => void;
    opacityOnChange: (val: number) => void;
};

export const RenderingControls: FC<Props> = ({
    selectedOpacity,
    shouldClip,
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
                <span className="text-sm ml-2 max-w-[100px] leading-none">
                    Show as clipping mask
                </span>
            </div>
            <div className="flex-grow">
                <Slider value={selectedOpacity} onChange={opacityOnChange} />
            </div>
        </div>
    );
};
