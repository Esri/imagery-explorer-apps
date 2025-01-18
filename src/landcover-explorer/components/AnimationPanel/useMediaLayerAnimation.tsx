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

import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
} from '@shared/store/UI/selectors';
import IImageElement from '@arcgis/core/layers/support/ImageElement';
import { selectYear } from '@shared/store/LandcoverExplorer/selectors';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { useAppDispatch } from '@shared/store/configureStore';
import { yearUpdated } from '@shared/store/LandcoverExplorer/reducer';

// const ANIMATION_SPEED_IN_MILLISECONDS = 1000;

/**
 * Animate media layer elements
 * @param mediaLayerElements Image Elements added to media layer
 */
const useMediaLayerAnimation = (mediaLayerElements: IImageElement[]) => {
    const dispatch = useAppDispatch();

    const animationMode = useSelector(selectAnimationStatus);

    const years = getAvailableYears();

    const year = useSelector(selectYear);

    const isPlayingRef = useRef<boolean>(false);

    const timeLastFrameDisplayed = useRef<number>(performance.now());

    const indexOfNextFrame = useRef<number>(0);

    const animationSpeed = useSelector(selectAnimationSpeed);

    const animationSpeedRef = useRef<number>(animationSpeed);

    const showNextFrame = () => {
        // use has stopped animation, no need to show next frame
        if (!isPlayingRef.current) {
            return;
        }

        // get current performance time
        const now = performance.now();

        const millisecondsSinceLastFrame = now - timeLastFrameDisplayed.current;

        // if last frame was shown within the time window, no need to display next frame
        if (millisecondsSinceLastFrame < animationSpeedRef.current) {
            requestAnimationFrame(showNextFrame);
            return;
        }

        timeLastFrameDisplayed.current = now;

        // find the year associated with next frame to display and
        // update the year in redux store, so the Time Slider can be
        // updated too
        const year = years[indexOfNextFrame.current];
        dispatch(yearUpdated(year));

        // loop throght media elements and change the opacity of the element associated with next frame to 1
        // change the opacity of all other elements to 0.
        // why using a for loop? well, this media layer contains frames that represent land cover/sentinel-2 data captured from different year,
        // so far (in 2022) this array has a length of 5 because we only have 5 years of data (it will be 6 in next year and so on),
        // so why not using a for loop?
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
        isPlayingRef.current = animationMode === 'playing';

        if (mediaLayerElements && animationMode === 'playing') {
            // update indexOfNextFrame using the index of the active year from the years list
            indexOfNextFrame.current = years.indexOf(year);
            requestAnimationFrame(showNextFrame);
        }
    }, [animationMode, mediaLayerElements]);

    useEffect(() => {
        animationSpeedRef.current = animationSpeed;
    }, [animationSpeed]);
};

export default useMediaLayerAnimation;
