import React, { FC } from 'react';
import { Slider } from '../Slider';

type Props = {
    selectedOpacity: number;
    opacityOnChange: (val: number) => void;
};

export const RenderingControls: FC<Props> = ({
    selectedOpacity,
    opacityOnChange,
}: Props) => {
    return (
        <div>
            <div className="flex-grow">
                <Slider value={selectedOpacity} onChange={opacityOnChange} />
            </div>
        </div>
    );
};
