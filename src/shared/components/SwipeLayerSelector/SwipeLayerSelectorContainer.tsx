import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    selectSelectedSideOfSwipeMode,
} from '@shared/store/ImageryScene/selectors';
import { useDispatch } from 'react-redux';
import { SwipeLayerSelector } from './SwipeLayerSelector';
import { selectedSide4SwipeModeChanged } from '@shared/store/ImageryScene/reducer';
import { swapMainAndSecondaryScenes } from '@shared/store/ImageryScene/thunks';

export const SwipeLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const appMode = useSelector(selectAppMode);

    const selectedSideOfSwipeMode = useSelector(selectSelectedSideOfSwipeMode);

    const queryParams4LeftSide = useSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useSelector(selectQueryParams4SecondaryScene);

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
            swapButtonOnClick={() => {
                dispatch(swapMainAndSecondaryScenes());
            }}
        />
    );
};
