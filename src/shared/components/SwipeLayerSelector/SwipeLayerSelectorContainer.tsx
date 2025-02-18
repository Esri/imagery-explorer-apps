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
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { SwipeLayerSelector } from './SwipeLayerSelector';
import { isSecondarySceneActiveToggled } from '@shared/store/ImageryScene/reducer';
import { swapMainAndSecondaryScenes } from '@shared/store/ImageryScene/thunks';
import { AutoSwipeControls } from './AutoSwipeControls';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import classNames from 'classnames';

export const SwipeLayerSelectorContainer = () => {
    const dispatch = useAppDispatch();

    const appMode = useAppSelector(selectAppMode);

    const isSecondarySceneActive = useAppSelector(selectIsSecondarySceneActive);

    const queryParams4LeftSide = useAppSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    if (appMode !== 'swipe') {
        return null;
    }

    return (
        <>
            <div
                className={classNames('w-full', {
                    'is-disabled': isAnimationPlaying,
                })}
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
