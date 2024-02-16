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
import { useDispatch } from 'react-redux';
import { animationModeUpdated } from '@landcover-explorer/store/LandcoverUI/reducer';
import { selectAnimationMode } from '@landcover-explorer/store/LandcoverUI/selectors';

const PlayButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M6 1.773v20.454l15-10.225zm1 1.892l12.225 8.337L7 20.335z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const PauseButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M4 22h6V2H4zM5 3h4v18H5zm9 19h6V2h-6zm1-19h4v18h-4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CloseButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path
            fill="currentColor"
            d="M17.45 8.257L13.207 12.5l4.243 4.243-.707.707-4.243-4.243-4.243 4.243-.707-.707 4.243-4.243L7.55 8.257l.707-.707 4.243 4.243 4.243-4.243zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const AnimationButton = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    return (
        <div className="flex cursor-pointer">
            {!animationMode && (
                <div
                    onClick={() => {
                        dispatch(animationModeUpdated('loading'));
                    }}
                >
                    {PlayButton}
                </div>
            )}
            {animationMode === 'loading' && (
                <div>
                    <calcite-loader scale="m" active inline></calcite-loader>
                </div>
            )}
            {animationMode === 'playing' && (
                <div
                    onClick={() => {
                        dispatch(animationModeUpdated('pausing'));
                    }}
                >
                    {PauseButton}
                </div>
            )}
            {animationMode === 'pausing' && (
                <div
                    onClick={() => {
                        dispatch(animationModeUpdated('playing'));
                    }}
                >
                    {PlayButton}
                </div>
            )}
            {animationMode && (
                <div
                    onClick={() => {
                        dispatch(animationModeUpdated(null));
                    }}
                >
                    {CloseButton}
                </div>
            )}
        </div>
    );
};

export default AnimationButton;
