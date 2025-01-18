/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { useAppDispatch } from '@shared/store/configureStore';
import {
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { isSecondarySceneActiveToggled } from '@shared/store/ImageryScene/reducer';

export const ChangeCompareLayerSelectorContainer = () => {
    const dispatch = useAppDispatch();

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
