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

import { animationStatusChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

const ICON_SIZE = 64;

const ContinuePlayButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={ICON_SIZE}
        width={ICON_SIZE}
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
        height={ICON_SIZE}
        width={ICON_SIZE}
    >
        <path
            fill="currentColor"
            d="M4 22h6V2H4zM5 3h4v18H5zm9 19h6V2h-6zm1-19h4v18h-4z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export const PlayPauseButton = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAnimationStatus);

    return (
        <div className="cursor-pointer">
            {status === 'playing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('pausing'));
                    }}
                >
                    {PauseButton}
                </div>
            )}
            {status === 'pausing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('playing'));
                    }}
                >
                    {ContinuePlayButton}
                </div>
            )}
        </div>
    );
};
