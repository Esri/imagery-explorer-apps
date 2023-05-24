import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4SceneOnLeftSideOfSwipeMode,
    selectQueryParams4SceneOnRightSideOfSwipeMode,
    selectSelectedSideOfSwipeMode,
} from '@shared/store/Landsat/selectors';
import { useDispatch } from 'react-redux';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { selectedSide4SwipeModeChanged } from '@shared/store/Landsat/reducer';

export const SwipeLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const appMode = useSelector(selectAppMode);

    const selectedSideOfSwipeMode = useSelector(selectSelectedSideOfSwipeMode);

    const queryParams4LeftSide = useSelector(
        selectQueryParams4SceneOnLeftSideOfSwipeMode
    );

    const queryParams4RightSide = useSelector(
        selectQueryParams4SceneOnRightSideOfSwipeMode
    );

    if (appMode !== 'swipe') {
        return null;
    }

    return (
        <SwipeLayerSelector
            selectedSide={selectedSideOfSwipeMode}
            queryParams4SceneOnLeft={queryParams4LeftSide}
            queryParams4SceneOnRight={queryParams4RightSide}
            onChange={(value) => {
                dispatch(selectedSide4SwipeModeChanged(value));
            }}
        />
    );
};
