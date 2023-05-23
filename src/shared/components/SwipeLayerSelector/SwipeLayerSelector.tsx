import React, { FC } from 'react';
import { Button } from '../Button';
import {
    QueryParams4LandsatScene,
    Side4SwipeMode,
} from '../../store/Landsat/reducer';

type Props = {
    selectedSide: Side4SwipeMode;
    queryParams4SceneOnLeft: QueryParams4LandsatScene;
    queryParams4SceneOnRight: QueryParams4LandsatScene;
    onChange: (side: Side4SwipeMode) => void;
};

const sides: Side4SwipeMode[] = ['left', 'right'];

export const SwipeLayerSelector: FC<Props> = ({
    selectedSide,
    queryParams4SceneOnLeft,
    queryParams4SceneOnRight,
    onChange,
}) => {
    const getButtonContent = (side: Side4SwipeMode) => {
        const queryParams =
            side === 'left'
                ? queryParams4SceneOnLeft
                : queryParams4SceneOnRight;

        return (
            <>
                <div>
                    <span>{side}</span>
                </div>

                <div className="text-xs text-center lowercase">
                    {queryParams?.acquisitionDate ? (
                        <>
                            <span>{queryParams.acquisitionDate}</span>

                            <br />

                            <span>{queryParams?.rasterFunctionName}</span>
                        </>
                    ) : (
                        <span>No selected scene</span>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="mx-2 flex flex-col">
            {sides.map((side) => (
                <div className="my-2 h-1/2 flex items-center" key={side}>
                    <Button
                        appearance={
                            selectedSide === side ? 'solid' : 'transparent'
                        }
                        fullHeight={true}
                        onClickHandler={() => {
                            onChange(side);
                        }}
                    >
                        {getButtonContent(side)}
                    </Button>
                </div>
            ))}
        </div>
    );
};
