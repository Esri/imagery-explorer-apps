import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAnimationStatus,
    selectIsAnimationPlaying,
} from '@shared/store/UI/selectors';
import { useDispatch } from 'react-redux';
import {
    AnimationControl,
    AnimationFrames,
    AnimationFrameInfo,
} from '@shared/components/AnimationControl';
import {
    animationSpeedChanged,
    animationStatusChanged,
} from '@shared/store/UI/reducer';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import {
    addAnimationFrame,
    removeAnimationFrame,
} from '@shared/store/Landsat/thunks';
import { selectedAnimationFrameIdChanged } from '@shared/store/Landsat/reducer';
import { useAnimationFramesInfo } from './useAnimationFramesInfo';
import { useShouldDisablePlayPauseButton } from './useShouldDisablePlayPauseButton';

const ANIMATION_FRAMES_UPPER_LIMIT = 5;

export const AnimationControlContainer = () => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const mode = useSelector(selectAppMode);

    const animationFramesData = useAnimationFramesInfo();

    const shouldDisablePlayPauseButton = useShouldDisablePlayPauseButton();

    if (mode !== 'animate') {
        return null;
    }

    return (
        <div className="w-full mx-2">
            <AnimationFrames
                data={animationFramesData}
                disabled={isAnimationPlaying}
                frameOnSelect={(frameId: string) => {
                    dispatch(selectedAnimationFrameIdChanged(frameId));
                }}
                removeButtonOnClick={(frameId: string) => {
                    dispatch(removeAnimationFrame(frameId));
                }}
            />

            <AnimationControl
                status={animationStatus}
                shouldDisablePlayPauseButton={shouldDisablePlayPauseButton}
                shouldDisableAddFrameButton={
                    animationFramesData.length &&
                    animationFramesData.length >= ANIMATION_FRAMES_UPPER_LIMIT
                }
                addButtonOnClick={() => {
                    dispatch(addAnimationFrame());
                }}
                statusOnChange={(status) => {
                    dispatch(animationStatusChanged(status));
                }}
                speedOnChange={(speed) => {
                    dispatch(animationSpeedChanged(speed));
                }}
            />
        </div>
    );
};
