import React from 'react';
import {
    ChangeCompareLayerSelector,
    ActiveScene4ChangeCompareTool,
} from './ChangeCompareLayerSelector';
import {
    // ActiveScene4ChangeCompareTool,
    // activeSceneChanged,
    changeCompareLayerIsOnUpdated,
} from '@shared/store/ChangeCompareTool/reducer';
import { useSelector } from 'react-redux';
import {
    // selectActiveScene4ChangeCompareTool,
    selectChangeCompareLayerIsOn,
} from '@shared/store/ChangeCompareTool/selectors';
import { useDispatch } from 'react-redux';
import {
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { isSecondarySceneActiveToggled } from '@shared/store/ImageryScene/reducer';

export const ChangeCompareLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const isSecondarySceneActive = useSelector(selectIsSecondarySceneActive);

    const changeCompareLayerIsOn = useSelector(selectChangeCompareLayerIsOn);

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const viewChangeButtonDisabled =
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
            ? true
            : false;

    return (
        <ChangeCompareLayerSelector
            activeScene={isSecondarySceneActive ? 'scene b' : 'scene a'}
            changeCompareLayerIsOn={changeCompareLayerIsOn}
            viewChangeButtonDisabled={viewChangeButtonDisabled}
            queryParams4SceneA={queryParams4SceneA}
            queryParams4SceneB={queryParams4SceneB}
            viewChangeButtonOnClick={() => {
                dispatch(changeCompareLayerIsOnUpdated(true));
            }}
            activeSceneOnChange={(
                activeScene: ActiveScene4ChangeCompareTool
            ) => {
                dispatch(
                    isSecondarySceneActiveToggled(activeScene === 'scene b')
                );
                dispatch(changeCompareLayerIsOnUpdated(false));
            }}
        />
    );
};
