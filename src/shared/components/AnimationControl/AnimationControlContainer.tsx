import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import { useDispatch } from 'react-redux';
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

const ANIMATION_FRAMES_UPPER_LIMIT = 30;

export const AnimationControlContainer = () => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const mode = useSelector(selectAppMode);

    const animationFramesData = useAnimationFramesInfo();

    const shouldDisablePlayPauseButton = useShouldDisablePlayPauseButton();

    const animationSpeed = useSelector(selectAnimationSpeed);

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
