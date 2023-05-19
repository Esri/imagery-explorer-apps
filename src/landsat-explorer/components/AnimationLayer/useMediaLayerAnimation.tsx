import React, { FC, useEffect, useRef, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';
import { AnimationStatus } from '../../../shared/store/UI/reducer';

const ANIMATION_SPEED_IN_MILLISECONDS = 1000;

/**
 * Animate media layer elements
 * @param mediaLayerElements Image Elements added to media layer
 */
const useMediaLayerAnimation = (
    animationStatus: AnimationStatus,
    mediaLayerElements: IImageElement[]
) => {
    const isPlayingRef = useRef<boolean>(false);

    const timeLastFrameDisplayed = useRef<number>(performance.now());

    const indexOfNextFrame = useRef<number>(0);

    const showNextFrame = () => {
        // use has stopped animation, no need to show next frame
        if (!isPlayingRef.current) {
            return;
        }

        // get current performance time
        const now = performance.now();

        const millisecondsSinceLastFrame = now - timeLastFrameDisplayed.current;

        // if last frame was shown within the time window, no need to display next frame
        if (millisecondsSinceLastFrame < ANIMATION_SPEED_IN_MILLISECONDS) {
            requestAnimationFrame(showNextFrame);
            return;
        }

        timeLastFrameDisplayed.current = now;

        for (let i = 0; i < mediaLayerElements.length; i++) {
            const opacity = i === indexOfNextFrame.current ? 1 : 0;
            mediaLayerElements[i].opacity = opacity;
        }

        // update indexOfNextFrame using the index of next element
        // when hit the end of the array, use 0 instead
        indexOfNextFrame.current =
            (indexOfNextFrame.current + 1) % mediaLayerElements.length;

        // call showNextFrame recursively to play the animation as long as
        // animationMode is 'playing'
        requestAnimationFrame(showNextFrame);
    };

    useEffect(() => {
        isPlayingRef.current = animationStatus === 'playing';

        if (mediaLayerElements && animationStatus === 'playing') {
            requestAnimationFrame(showNextFrame);
        }
    }, [animationStatus, mediaLayerElements]);
};

export default useMediaLayerAnimation;
