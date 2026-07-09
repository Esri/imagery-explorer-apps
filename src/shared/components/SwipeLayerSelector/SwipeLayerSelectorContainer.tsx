/* Copyright 2025 Esri
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

import React, { FC } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAppMode,
    selectIsBasemapOnRightSideOfSwipe,
    selectIsSecondarySceneActive,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
    selectSwipeSubMode,
} from '@shared/store/ImageryScene/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { SwipeLayerSelector } from './SwipeLayerSelector';
import {
    isBasemapOnRightSideOfSwipeChanged,
    isSecondarySceneActiveToggled,
} from '@shared/store/ImageryScene/reducer';
import { swapMainAndSecondaryScenes } from '@shared/store/ImageryScene/thunks';
import { AutoSwipeControls } from './AutoSwipeControls';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { SwipeLayerSelectorScene2Basemap } from './SwipeLayerSelectorScene2Basemap';

type Props = {
    useAcquisitionTimestampAsLabel?: boolean;
    /**
     * tooltip text shown on the leading (left) layer selector, if provided
     */
    tooltip4LeadingLayerSelector?: string;
    /**
     * tooltip text shown on the trailing (right) layer selector, if provided
     */
    tooltip4TrailingLayerSelector?: string;
};

export const SwipeLayerSelectorContainer: FC<Props> = ({
    useAcquisitionTimestampAsLabel = false,
    tooltip4LeadingLayerSelector,
    tooltip4TrailingLayerSelector,
}) => {
    const dispatch = useAppDispatch();

    const appMode = useAppSelector(selectAppMode);

    const isSecondarySceneActive = useAppSelector(selectIsSecondarySceneActive);

    const queryParams4LeftSide = useAppSelector(selectQueryParams4MainScene);

    const queryParams4RightSide = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const queryParams4SelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const swipeSubMode = useAppSelector(selectSwipeSubMode);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const showBasemapOnRightSide = useAppSelector(
        selectIsBasemapOnRightSideOfSwipe
    );

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
                inert={isAnimationPlaying}
            >
                {swipeSubMode === 'scene-to-scene' && (
                    <SwipeLayerSelector
                        selectedSide={isSecondarySceneActive ? 'right' : 'left'}
                        queryParams4SceneOnLeft={queryParams4LeftSide}
                        queryParams4SceneOnRight={queryParams4RightSide}
                        useAcquisitionTimestampAsLabel={
                            useAcquisitionTimestampAsLabel
                        }
                        tooltip4LeadingLayerSelector={
                            tooltip4LeadingLayerSelector
                        }
                        tooltip4TrailingLayerSelector={
                            tooltip4TrailingLayerSelector
                        }
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
                )}

                {swipeSubMode === 'scene-to-basemap' && (
                    <SwipeLayerSelectorScene2Basemap
                        queryParams4SelectedScene={queryParams4SelectedScene}
                        useAcquisitionTimestampAsLabel={
                            useAcquisitionTimestampAsLabel
                        }
                        showBasemapOnRightSide={showBasemapOnRightSide}
                        swapButtonOnClick={() => {
                            dispatch(
                                isBasemapOnRightSideOfSwipeChanged(
                                    !showBasemapOnRightSide
                                )
                            );
                        }}
                    />
                )}
            </div>

            <AutoSwipeControls />
        </>
    );
};
