import React, { FC } from 'react';
import { LandsatScene } from '../../services/landsat-2/getLandsatScenes';

type Props = {
    data: LandsatScene;
};

export const SceneInfo: FC<Props> = ({ data }: Props) => {
    return (
        <div>
            <div>
                <h4 className="uppercase text-sm">Scene Information</h4>
            </div>
        </div>
    );
};
