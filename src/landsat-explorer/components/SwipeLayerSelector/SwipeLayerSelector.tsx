import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectLandsatQueryParams4LeftSideOfSwipeMode,
    selectLandsatQueryParams4RightSideOfSwipeMode,
    selectSelectedSideOfSwipeMode,
} from '../../../shared/store/Landsat/selectors';
import { Button } from '../../../shared/components/Button';
import { useDispatch } from 'react-redux';
import {
    Side4SwipeMode,
    selectedSide4SwipeModeChanged,
} from '../../../shared/store/Landsat/reducer';

export const SwipeLayerSelector = () => {
    const dispatch = useDispatch();

    const appMode = useSelector(selectAppMode);

    const selectedSideOfSwipeMode = useSelector(selectSelectedSideOfSwipeMode);

    const queryParams4LeftSide = useSelector(
        selectLandsatQueryParams4LeftSideOfSwipeMode
    );

    const queryParams4RightSide = useSelector(
        selectLandsatQueryParams4RightSideOfSwipeMode
    );

    const getButtonContent = (side: Side4SwipeMode) => {
        const queryParams =
            side === 'left' ? queryParams4LeftSide : queryParams4RightSide;

        return (
            <>
                <div>
                    <span>{side}</span>
                </div>

                <div className="text-xs text-center lowercase">
                    <span>
                        {queryParams?.acquisitionDate || 'No selected scene'}
                    </span>

                    <br />

                    <span>{queryParams?.rasterFunctionName}</span>
                </div>
            </>
        );
    };

    if (appMode !== 'swipe') {
        return null;
    }

    return (
        <div className="mx-2">
            <Button
                appearance={
                    selectedSideOfSwipeMode === 'left' ? 'solid' : 'transparent'
                }
                onClickHandler={() => {
                    dispatch(selectedSide4SwipeModeChanged('left'));
                }}
            >
                {getButtonContent('left')}
            </Button>

            <Button
                appearance={
                    selectedSideOfSwipeMode === 'right'
                        ? 'solid'
                        : 'transparent'
                }
                onClickHandler={() => {
                    dispatch(selectedSide4SwipeModeChanged('right'));
                }}
            >
                {getButtonContent('right')}
            </Button>
        </div>
    );
};
