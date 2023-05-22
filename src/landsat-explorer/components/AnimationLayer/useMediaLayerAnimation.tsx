import React, { FC, useEffect, useRef, useState } from 'react';
import IImageElement from 'esri/layers/support/ImageElement';
import { AnimationStatus } from '../../../shared/store/UI/reducer';

const ANIMATION_SPEED_IN_MILLISECONDS = 1000;

type Props = {
    /**
     * status of the animation mode
     */
    animationStatus: AnimationStatus;
    /**
     * array of image elements to be animated
     */
    mediaLayerElements: IImageElement[];
    /**
     * Fires when the active frame changes
     * @param indexOfActiveFrame index of the active frame
     * @returns void
     */
    activeFrameOnChange: (indexOfActiveFrame: number) => void;
};

/**
 * This is a custom hook that handles the animation of input media layer elements
 * @param animationStatus status of the animation
 * @param mediaLayerElements Image Elements added to a media layer that will be animated
 */
const useMediaLayerAnimation = ({
    animationStatus,
    mediaLayerElements,
    activeFrameOnChange,
}: Props) => {
    const isPlayingRef = useRef<boolean>(false);

    const timeLastFrameDisplayed = useRef<number>(performance.now());

    const indexOfNextFrame = useRef<number>(0);

    const activeFrameOnChangeRef = useRef<any>();

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

        // reset index of next frame to 0 if it is out of range.
        // this can happen when a frame gets removed after previous animation is stopped
        if (indexOfNextFrame.current >= mediaLayerElements.length) {
            indexOfNextFrame.current = 0;
        }

        activeFrameOnChangeRef.current(indexOfNextFrame.current);

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

        // cannot animate layers if the list is empty
        if (!mediaLayerElements || !mediaLayerElements?.length) {
            return;
        }

        if (mediaLayerElements && animationStatus === 'playing') {
            requestAnimationFrame(showNextFrame);
        }
    }, [animationStatus, mediaLayerElements]);

    useEffect(() => {
        activeFrameOnChangeRef.current = activeFrameOnChange;
    }, [activeFrameOnChange]);
};

export default useMediaLayerAnimation;
