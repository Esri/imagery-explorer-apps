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
import { useAppDispatch } from '@shared/store/configureStore';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

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
            d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm0 19.6a9.3 9.3 0 1 1 9.3-9.3 9.31 9.31 0 0 1-9.3 9.3zM9 7h2v11H9zm5 0h2v11h-2z"
            fill="currentColor"
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
            d="M12.5 2.2C6.81 2.2 2.2 6.81 2.2 12.5c0 5.692 4.61 10.3 10.3 10.3s10.3-4.608 10.3-10.3c0-5.69-4.61-10.3-10.3-10.3zm0 19.6c-5.128 0-9.3-4.172-9.3-9.3s4.172-9.3 9.3-9.3 9.3 4.172 9.3 9.3-4.172 9.3-9.3 9.3zM8 8h9v9H8V8z"
            fill="currentColor"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

type AnimationStatusButtonProps = {
    closeAnimationControlsButtonOnClick: () => void;
};

export const AnimationStatusButton: FC<AnimationStatusButtonProps> = ({
    closeAnimationControlsButtonOnClick,
}) => {
    const dispatch = useAppDispatch();

    const animationMode = useAppSelector(selectAnimationStatus);

    return (
        <div className="flex cursor-pointer items-center">
            {!animationMode && (
                <>
                    <div
                        onClick={() => {
                            dispatch(animationStatusChanged('loading'));
                        }}
                    >
                        {PlayButton}
                    </div>

                    <div onClick={closeAnimationControlsButtonOnClick}>
                        {CloseButton}
                    </div>
                </>
            )}
            {/* {animationMode === 'loading' && (
                <div>
                    <calcite-loader scale="m" active inline></calcite-loader>
                </div>
            )} */}
            {animationMode === 'playing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('pausing'));
                    }}
                >
                    {PauseButton}
                </div>
            )}
            {animationMode === 'pausing' && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged('playing'));
                    }}
                >
                    {PlayButton}
                </div>
            )}
            {(animationMode === 'playing' || animationMode === 'pausing') && (
                <div
                    onClick={() => {
                        dispatch(animationStatusChanged(null));
                    }}
                >
                    {CloseButton}
                </div>
            )}
        </div>
    );
};

export default AnimationStatusButton;
