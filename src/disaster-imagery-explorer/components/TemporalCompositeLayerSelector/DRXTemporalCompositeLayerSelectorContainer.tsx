import React from 'react';

import { useAppSelector } from '@shared/store/configureStore';
import {
    // selectActiveScene4ChangeCompareTool,
    selectChangeCompareLayerIsOn,
} from '@shared/store/ChangeCompareTool/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { isSecondarySceneActiveToggled } from '@shared/store/ImageryScene/reducer';
import {
    ActiveScene4ChangeCompareTool,
    ChangeCompareLayerSelector,
} from '@shared/components/ChangeCompareLayerSelector/ChangeCompareLayerSelector';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';
import { DRXTemporalCompositeLayerSelector } from './DRXTemporalCompositeLayerSelector';
import { isTemporalCompositeLayerOnUpdated } from '@shared/store/TemporalCompositeTool/reducer';
import { swapMainAndSecondaryScenes } from '@shared/store/ImageryScene/thunks';

export const DRXTemporalCompositeToolLayerSelectorContainer = () => {
    const dispatch = useAppDispatch();

    const isSecondarySceneActive = useAppSelector(selectIsSecondarySceneActive);

    // const changeCompareLayerIsOn = useAppSelector(selectChangeCompareLayerIsOn);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const queryParams4SceneA = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useAppSelector(selectQueryParams4SecondaryScene);

    const viewChangeButtonDisabled =
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
            ? true
            : false;

    return (
        <DRXTemporalCompositeLayerSelector
            activeScene={isSecondarySceneActive ? 'scene b' : 'scene a'}
            isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
            viewCompositeLayerDisabled={viewChangeButtonDisabled}
            queryParams4SceneA={queryParams4SceneA}
            queryParams4SceneB={queryParams4SceneB}
            viewCompositeLayerButtonOnClick={() => {
                dispatch(isTemporalCompositeLayerOnUpdated(true));
            }}
            activeSceneOnChange={(
                activeScene: ActiveScene4ChangeCompareTool
            ) => {
                dispatch(
                    isSecondarySceneActiveToggled(activeScene === 'scene b')
                );
                dispatch(isTemporalCompositeLayerOnUpdated(false));
            }}
            swapButtonOnClick={() => {
                dispatch(swapMainAndSecondaryScenes());
            }}
        />
    );
};
