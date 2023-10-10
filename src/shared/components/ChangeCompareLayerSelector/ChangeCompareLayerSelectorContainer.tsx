import React from 'react';
import { ChangeCompareLayerSelector } from './ChangeCompareLayerSelector';
import {
    ActiveScene4ChangeCompareTool,
    activeSceneChanged,
    isViewingChangeUpdated,
} from '@shared/store/ChangeCompareTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { useSelector } from 'react-redux';
import {
    selectActiveScene4ChangeCompareTool,
    selectIsViewingChangeInChangeCompareTool,
} from '@shared/store/ChangeCompareTool/selectors';
import { useDispatch } from 'react-redux';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/Landsat/selectors';

export const ChangeCompareLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const activeScene = useSelector(selectActiveScene4ChangeCompareTool);

    const isViewingChange = useSelector(
        selectIsViewingChangeInChangeCompareTool
    );

    const queryParams4SceneA = useSelector(selectQueryParams4MainScene);

    const queryParams4SceneB = useSelector(selectQueryParams4SecondaryScene);

    const viewChangeButtonDisabled =
        !queryParams4SceneA?.objectIdOfSelectedScene ||
        !queryParams4SceneB?.objectIdOfSelectedScene
            ? true
            : false;

    return (
        <ChangeCompareLayerSelector
            activeScene={activeScene}
            isViewingChange={isViewingChange}
            viewChangeButtonDisabled={viewChangeButtonDisabled}
            queryParams4SceneA={queryParams4SceneA}
            queryParams4SceneB={queryParams4SceneB}
            selectedSpectralIndexOnChange={(spectralIndex: SpectralIndex) => {
                //
            }}
            viewChangeButtonOnClick={() => {
                dispatch(isViewingChangeUpdated(true));
            }}
            activeSceneOnChange={(
                activeScene: ActiveScene4ChangeCompareTool
            ) => {
                dispatch(activeSceneChanged(activeScene));
                dispatch(isViewingChangeUpdated(false));
            }}
        />
    );
};
