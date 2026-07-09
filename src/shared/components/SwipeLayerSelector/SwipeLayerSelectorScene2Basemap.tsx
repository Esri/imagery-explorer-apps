import type { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import classNames from 'classnames';
import React, { type FC } from 'react';
import { Button } from '../Button';
import {
    SwipeLayerSelectorButtonContent,
    SwipeLayerSelectorButtonContentForBasemap,
} from './SwipeLayerSelectorButtonContent';

type Props = {
    queryParams4SelectedScene: QueryParams4ImageryScene;
    useAcquisitionTimestampAsLabel?: boolean;
    showBasemapOnRightSide: boolean;
    swapButtonOnClick: () => void;
};

export const SwipeLayerSelectorScene2Basemap: FC<Props> = ({
    queryParams4SelectedScene,
    useAcquisitionTimestampAsLabel = false,
    showBasemapOnRightSide,
    swapButtonOnClick,
}) => {
    // We always want to highlight the selected scene in the SwipeLayerSelector, regardless of whether it's on the left or right side. So the left button will be highlighted when the basemap is on the right side, and the right button will be highlighted when the basemap is on the left side.
    const appearanceOfLeftButton = showBasemapOnRightSide
        ? 'solid'
        : 'transparent';
    const appearanceOfRightButton = showBasemapOnRightSide
        ? 'transparent'
        : 'solid';

    // The decorative indicator (a vertical line on the left side of the button) will only be shown when the button is in the "solid" appearance, which indicates the selected scene. So it will be shown on the left button when the basemap is on the right side, and shown on the right button when the basemap is on the left side.
    const decorationIndicatorOfLeftButton = showBasemapOnRightSide
        ? 'left'
        : null;
    const decorationIndicatorOfRightButton = showBasemapOnRightSide
        ? null
        : 'left';

    const getButtonContent = (side: 'left' | 'right') => {
        const isSceneOnLeft =
            side === 'left' && showBasemapOnRightSide === true;
        const isSceneOnRight =
            side === 'right' && showBasemapOnRightSide === false;

        if (isSceneOnLeft || isSceneOnRight) {
            return (
                <SwipeLayerSelectorButtonContent
                    queryParams={queryParams4SelectedScene}
                    side={side}
                    selectedSide={showBasemapOnRightSide ? 'left' : 'right'}
                    useAcquisitionTimestampAsLabel={
                        useAcquisitionTimestampAsLabel
                    }
                />
            );
        }

        return <SwipeLayerSelectorButtonContentForBasemap side={side} />;
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div
                className={classNames('relative mb-1 h-1/2 flex items-center')}
                key={'left'}
            >
                <Button
                    appearance={appearanceOfLeftButton}
                    fullHeight={true}
                    // onClickHandler={() => {
                    //     onChange('left');
                    // }}
                    decorativeIndicator={decorationIndicatorOfLeftButton}
                    // onClickHandler={()=>{}}
                    label="select basemap"
                >
                    {/* {getButtonContent('left')} */}
                    {getButtonContent('left')}
                </Button>
            </div>

            <div
                data-testid="swipe-mode-side-swap-button"
                className="flex justify-center cursor-pointer w-full my-1"
                title="swap left and right side"
                onClick={swapButtonOnClick}
            >
                <calcite-icon icon="arrow-up-down" scale="s" />
            </div>

            <div
                className={classNames('relative mb-1 h-1/2 flex items-center')}
                key={'right'}
            >
                <Button
                    appearance={appearanceOfRightButton}
                    fullHeight={true}
                    decorativeIndicator={decorationIndicatorOfRightButton}
                    label="select-scene"
                >
                    {getButtonContent('right')}
                </Button>
            </div>
        </div>
    );
};
