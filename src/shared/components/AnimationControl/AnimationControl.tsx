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
import { AnimationStatus } from '../../store/UI/reducer';
import classNames from 'classnames';
import { AnimationSpeedControl } from './AnimationSpeedControl';
import { useTranslation } from 'react-i18next';

const ICON_SIZE = 22;

export const StartPlayButton = (
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

export const ContinuePlayButton = (
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

export const PauseButton = (
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

export const CloseButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={ICON_SIZE}
        width={ICON_SIZE}
    >
        <path
            fill="currentColor"
            d="M17.45 8.257L13.207 12.5l4.243 4.243-.707.707-4.243-4.243-4.243 4.243-.707-.707 4.243-4.243L7.55 8.257l.707-.707 4.243 4.243 4.243-4.243zM22.8 12.5A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const DownloadButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={ICON_SIZE}
        width={ICON_SIZE}
    >
        <path
            fill="currentColor"
            d="M13 3v12.294l2.647-2.647.707.707-3.853 3.854-3.854-3.854.707-.707L12 15.292V3zM6 21h13v-1H6z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CopyLinkButton = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={18} // the Link Icon looks bigger than other calcite Icons, therefore we should use this hardcoded size to make it looks normal
        width={18} // the Link Icon looks bigger than other calcite Icons, therefore we should use this hardcoded size to make it looks normal
    >
        <path
            fill="currentColor"
            d="M7 14c0 .025.003.05.004.075l-3.54-3.54a5 5 0 0 1 7.072-7.07l4 4a4.992 4.992 0 0 1-1.713 8.187l-.237-.237a1.998 1.998 0 0 1-.413-.609 3.985 3.985 0 0 0 1.656-6.635l-4-4a4 4 0 0 0-5.369-.26l-.318-.387.318.386a4 4 0 0 0-.29 5.92l2.94 2.94A7.012 7.012 0 0 0 7 14zm16 4a4.97 4.97 0 0 0-1.464-3.536l-3.54-3.539c0 .025.004.05.004.075a7.087 7.087 0 0 1-.113 1.23l2.942 2.941a4 4 0 0 1-.128 5.78l.338.368-.338-.368a4 4 0 0 1-5.53-.122l-4-4a3.966 3.966 0 0 1 1.658-6.631 1.998 1.998 0 0 0-.415-.613l-.234-.234a5.004 5.004 0 0 0-1.907 1.315 5 5 0 0 0 .191 6.87l4 4A5 5 0 0 0 23 18z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

type Props = {
    status: AnimationStatus;
    animationSpeed: number;
    /**
     * if ture, the Animation Status Control Button (Play/Pause/Close) should be disabled.
     * This happenes when there is no frames in the Animation Layer
     */
    shouldDisablePlayPauseButton?: boolean;
    /**
     * if ture, Add a Frame Button should be disabled.
     * This happenes when number of frames hits the upper limit
     */
    shouldDisableAddFrameButton?: boolean;
    /**
     * fires when user clicks on "Add A Scene" button
     * @returns void
     */
    addButtonOnClick: () => void;
    /**
     * fires when user clicks on "download" button
     * @returns void
     */
    donwloadButtonOnClick: () => void;
    /**
     * fires when user clicks on "copy" link button
     * @param newSpeed speed in milliseconds
     * @returns
     */
    copyLinkOnClick: () => void;
    /**
     * fires when user makes change to Animation Status
     * @param newStatus
     * @returns void;
     */
    statusOnChange: (newStatus?: AnimationStatus) => void;
    /**
     * fires when user makes change to Animation Speed
     * @param newSpeed speed in milliseconds
     * @returns
     */
    speedOnChange: (newSpeed?: number) => void;
};

export const AnimationControl: FC<Props> = ({
    status,
    animationSpeed,
    shouldDisablePlayPauseButton,
    shouldDisableAddFrameButton,
    addButtonOnClick,
    donwloadButtonOnClick,
    copyLinkOnClick,
    statusOnChange,
    speedOnChange,
}: Props) => {
    const { t } = useTranslation();

    const isAnimtaionOn = status === 'playing' || status === 'pausing';

    return (
        <div
            className={classNames('flex items-center mt-1')}
            data-testid="animation-controls"
            data-animation-status={status}
        >
            <div className="flex items-center flex-grow mr-1">
                {status === null && (
                    <div
                        data-testid="add-animation-frame-button"
                        className={classNames(
                            'w-[105px] cursor-pointer text-center flex items-center bg-custom-light-blue-5',
                            {
                                'is-disabled': shouldDisableAddFrameButton,
                            }
                        )}
                        onClick={addButtonOnClick}
                    >
                        <calcite-icon icon="plus" scale="s" />
                        <span
                            className=" text-custom-light-blue uppercase ml-1"
                            style={{
                                fontSize: `.7rem`,
                            }}
                        >
                            {t('add_a_scene')}
                        </span>
                    </div>
                )}

                {isAnimtaionOn && (
                    <AnimationSpeedControl
                        speed={animationSpeed}
                        onChange={(speed) => {
                            speedOnChange(speed);
                        }}
                    />
                )}
            </div>

            <div
                className={classNames(
                    'flex cursor-pointer justify-center items-center',
                    {
                        hidden: shouldDisablePlayPauseButton,
                    }
                )}
            >
                {!status && (
                    <div
                        className=" bg-custom-light-blue-5 px-1"
                        onClick={statusOnChange.bind(null, 'loading')}
                        title={t('play_animation')}
                        data-testid="play-animation-button"
                    >
                        {StartPlayButton}
                    </div>
                )}
                {status === 'loading' && (
                    <div data-testid="animation-loading-indicator">
                        <calcite-loader
                            scale="m"
                            active
                            inline
                        ></calcite-loader>
                    </div>
                )}
                {isAnimtaionOn && (
                    <div
                        onClick={copyLinkOnClick}
                        title={t('copy_animation_link')}
                    >
                        {CopyLinkButton}
                    </div>
                )}
                {isAnimtaionOn && (
                    <div
                        onClick={donwloadButtonOnClick}
                        title={t('download_animation')}
                    >
                        {DownloadButton}
                    </div>
                )}
                {status === 'playing' && (
                    <div
                        onClick={statusOnChange.bind(null, 'pausing')}
                        data-testid="pause-animation-button"
                        title={t('pause_animation')}
                    >
                        {PauseButton}
                    </div>
                )}
                {status === 'pausing' && (
                    <div
                        onClick={statusOnChange.bind(null, 'playing')}
                        data-testid="resume-animation-button"
                        title={t('resume_animation')}
                    >
                        {ContinuePlayButton}
                    </div>
                )}
                {status === 'failed-loading' && (
                    <div className="pr-1">
                        <span className="text-xs text-opacity-50 line-clamp-none">
                            {t('animation_load_failed')}
                        </span>
                    </div>
                )}
                {status && (
                    <div
                        onClick={statusOnChange.bind(null, null)}
                        data-testid="stop-animation-button"
                    >
                        {CloseButton}
                    </div>
                )}
            </div>
        </div>
    );
};
