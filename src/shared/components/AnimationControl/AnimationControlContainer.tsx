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

import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { AnimationControl } from './AnimationControl';
import {
    AnimationFramesList,
    // AnimationFrameInfo
} from './AnimationFramesList';

import {
    animationSpeedChanged,
    animationStatusChanged,
    showDownloadAnimationPanelToggled,
} from '@shared/store/UI/reducer';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import {
    removeItemFromQueryParamsList,
    addNewItemToQueryParamsList,
} from '@shared/store/ImageryScene/thunks';
import { selectedItemIdOfQueryParamsListChanged } from '@shared/store/ImageryScene/reducer';
import { useAnimationFramesInfo } from './useAnimationFramesInfo';
import { useShouldDisablePlayPauseButton } from './useShouldDisablePlayPauseButton';
import { nanoid } from 'nanoid';
import { copyAnimationLink } from '@shared/store/UI/thunks';

const ANIMATION_FRAMES_UPPER_LIMIT = 30;

export const AnimationControlContainer = () => {
    const dispatch = useAppDispatch();

    const animationStatus = useAppSelector(selectAnimationStatus);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const mode = useAppSelector(selectAppMode);

    const animationFramesData = useAnimationFramesInfo();

    const shouldDisablePlayPauseButton = useShouldDisablePlayPauseButton();

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    const addNewAnimationFrame = () => {
        dispatch(addNewItemToQueryParamsList(nanoid(5), true));
    };

    /**
     * Comment out the section below because we have decided to not preload an animation frame
     * @see https://github.com/vannizhang/imagery-explorer-apps/issues/77
     */
    // useEffect(() => {
    //     // we should add a animation frame using query params from the main scene
    //     // if there is no animation scene. Only need to do this when the Animation Controls is mounted.
    //     if (animationFramesData.length === 0) {
    //         addNewAnimationFrame();
    //     }
    // }, []);

    if (mode !== 'animate') {
        return null;
    }

    return (
        <div className="w-full h-full relative">
            <AnimationFramesList
                data={animationFramesData}
                disabled={isAnimationPlaying}
                frameOnSelect={(frameId: string) => {
                    dispatch(selectedItemIdOfQueryParamsListChanged(frameId));
                }}
                removeButtonOnClick={(frameId: string) => {
                    dispatch(removeItemFromQueryParamsList(frameId));
                }}
            />

            <AnimationControl
                animationSpeed={animationSpeed}
                status={animationStatus}
                shouldDisablePlayPauseButton={shouldDisablePlayPauseButton}
                shouldDisableAddFrameButton={
                    animationFramesData.length &&
                    animationFramesData.length >= ANIMATION_FRAMES_UPPER_LIMIT
                }
                addButtonOnClick={() => {
                    addNewAnimationFrame();
                }}
                donwloadButtonOnClick={() => {
                    dispatch(showDownloadAnimationPanelToggled());
                }}
                copyLinkOnClick={() => {
                    dispatch(copyAnimationLink());
                }}
                statusOnChange={(status) => {
                    dispatch(animationStatusChanged(status));
                }}
                speedOnChange={(speed) => {
                    dispatch(animationSpeedChanged(speed));
                }}
            />

            {animationFramesData && animationFramesData.length <= 1 ? (
                <div className="absolute w-full left-0 bottom-0">
                    <p className="text-xs opacity-50">
                        Add scenes to this list to create a chronological
                        animation.
                    </p>
                </div>
            ) : null}
        </div>
    );
};
