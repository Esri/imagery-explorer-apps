import React from 'react';
import { ChangeCompareLayerSelector } from './ChangeCompareLayerSelector';
import {
    ActiveScene4ChangeCompareTool,
    activeSceneChanged,
    changeCompareLayerIsOnUpdated,
} from '@shared/store/ChangeCompareTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { useSelector } from 'react-redux';
import {
    selectActiveScene4ChangeCompareTool,
    selectChangeCompareLayerIsOn,
} from '@shared/store/ChangeCompareTool/selectors';
import { useDispatch } from 'react-redux';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';

export const ChangeCompareLayerSelectorContainer = () => {
    const dispatch = useDispatch();

    const activeScene = useSelector(selectActiveScene4ChangeCompareTool);

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
            activeScene={activeScene}
            changeCompareLayerIsOn={changeCompareLayerIsOn}
            viewChangeButtonDisabled={viewChangeButtonDisabled}
            queryParams4SceneA={queryParams4SceneA}
            queryParams4SceneB={queryParams4SceneB}
            // selectedSpectralIndexOnChange={(spectralIndex: SpectralIndex) => {
            //     //
            // }}
            viewChangeButtonOnClick={() => {
                dispatch(changeCompareLayerIsOnUpdated(true));
            }}
            activeSceneOnChange={(
                activeScene: ActiveScene4ChangeCompareTool
            ) => {
                dispatch(activeSceneChanged(activeScene));
                dispatch(changeCompareLayerIsOnUpdated(false));
            }}
        />
    );
};
