import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { useDispatch } from 'react-redux';
import { SwipeLayerSelector } from './SwipeLayerSelector';
import { isSecondarySceneActiveToggled } from '@shared/store/ImageryScene/reducer';
import { swapMainAndSecondaryScenes } from '@shared/store/ImageryScene/thunks';

export const SwipeLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const appMode = useSelector(selectAppMode);

    const isSecondarySceneActive = useSelector(selectIsSecondarySceneActive);

    const queryParams4LeftSide = useSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useSelector(selectQueryParams4SecondaryScene);

    if (appMode !== 'swipe') {
        return null;
    }

    return (
        <SwipeLayerSelector
            selectedSide={isSecondarySceneActive ? 'right' : 'left'}
            queryParams4SceneOnLeft={queryParams4LeftSide}
            queryParams4SceneOnRight={queryParams4RightSide}
            onChange={(value) => {
                const isSecondarySceneActive = value === 'right';
                dispatch(isSecondarySceneActiveToggled(isSecondarySceneActive));
            }}
            swapButtonOnClick={() => {
                dispatch(swapMainAndSecondaryScenes());
            }}
        />
    );
};
