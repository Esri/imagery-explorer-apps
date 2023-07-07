import React, { FC } from 'react';
import { Button } from '../Button';
import {
    QueryParams4ImageryScene,
    Side4SwipeMode,
} from '../../store/Landsat/reducer';
import classNames from 'classnames';
import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';

type Props = {
    selectedSide: Side4SwipeMode;
    queryParams4SceneOnLeft: QueryParams4ImageryScene;
    queryParams4SceneOnRight: QueryParams4ImageryScene;
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

                            <span className="normal-case">
                                {getRasterFunctionLabelText(
                                    queryParams?.rasterFunctionName
                                )}
                            </span>
                        </>
                    ) : (
                        <span>No Scene Selected</span>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="flex flex-col h-full w-full">
            {sides.map((side) => (
                <div
                    className={classNames(
                        'relative mb-1 h-1/2 flex items-center'
                    )}
                    key={side}
                >
                    <Button
                        appearance={
                            selectedSide === side ? 'solid' : 'transparent'
                        }
                        fullHeight={true}
                        onClickHandler={() => {
                            onChange(side);
                        }}
                        decorativeIndicator={
                            selectedSide === side ? 'left' : null
                        }
                    >
                        {getButtonContent(side)}
                    </Button>
                </div>
            ))}
        </div>
    );
};
