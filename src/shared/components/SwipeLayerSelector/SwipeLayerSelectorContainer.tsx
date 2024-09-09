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
import { AutoSwipeControls } from './AutoSwipeControls';

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
        <>
            <div
                className="w-full"
                style={{
                    height: `calc(100% - 30px)`,
                }}
            >
                <SwipeLayerSelector
                    selectedSide={isSecondarySceneActive ? 'right' : 'left'}
                    queryParams4SceneOnLeft={queryParams4LeftSide}
                    queryParams4SceneOnRight={queryParams4RightSide}
                    onChange={(value) => {
                        const isSecondarySceneActive = value === 'right';
                        dispatch(
                            isSecondarySceneActiveToggled(
                                isSecondarySceneActive
                            )
                        );
                    }}
                    swapButtonOnClick={() => {
                        dispatch(swapMainAndSecondaryScenes());
                    }}
                />
            </div>

            <AutoSwipeControls />
        </>
    );
};
