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

import React, { FC, useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAutoSwipeStatus,
    selectAutoSwipeSpeed,
} from '@shared/store/Map/selectors';
import {
    StartPlayButton,
    CloseButton,
} from '../AnimationControl/AnimationControl';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    AUTO_SWIPE_SPEEDS,
    autoSwipeSpeedChanged,
    AutoSwipeStatus,
    autoSwipeStatusChanged,
} from '@shared/store/Map/reducer';
import { Slider } from '../Slider';
import classNames from 'classnames';
import { de } from 'date-fns/locale';
import { delay } from '@shared/utils/snippets/delay';

export const AutoSwipeControls = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAutoSwipeStatus);

    const speed = useAppSelector(selectAutoSwipeSpeed);

    const statusOnChange = (status: AutoSwipeStatus) => {
        dispatch(autoSwipeStatusChanged(status));
    };

    const [linkCopied, setLinkCopied] = React.useState(false);

    const handleCopyLink = async () => {
        if (linkCopied) {
            return;
        }

        // console.log('copy link');
        await navigator.clipboard.writeText(window.location.href);

        setLinkCopied(true);

        await delay(2000);

        setLinkCopied(false);
    };

    /**
     * use index of items in auto swipe speeds arrar
     * as the steps of the slider
     */
    const sliderSteps = useMemo(() => {
        const indice = [];

        for (let i = 0; i < AUTO_SWIPE_SPEEDS.length; i++) {
            indice.push(i);
        }

        return indice;
    }, [AUTO_SWIPE_SPEEDS]);

    return (
        <div className="flex items-center">
            <div
                className={classNames('flex-grow mx-2 mt-2', {
                    'is-disabled': !status,
                })}
            >
                <Slider
                    value={AUTO_SWIPE_SPEEDS.indexOf(speed)}
                    steps={sliderSteps}
                    onChange={(index) => {
                        // console.log(val)

                        // get actual speed by index
                        const speed = AUTO_SWIPE_SPEEDS[index];

                        dispatch(autoSwipeSpeedChanged(speed));
                    }}
                />

                <div className="text-xs text-center mt-1">
                    <span>speed</span>
                </div>
            </div>

            <div className={'flex cursor-pointer items-center mx-1'}>
                {!status && (
                    <div
                        className=" bg-custom-light-blue-5 px-1"
                        onClick={statusOnChange.bind(null, 'playing')}
                        title="Enable auto-swipe"
                    >
                        {StartPlayButton}
                    </div>
                )}
                {status && (
                    <div
                        className="mr-1"
                        onClick={handleCopyLink}
                        title={
                            linkCopied ? 'Link Copied!' : 'Copy Animation Link'
                        }
                    >
                        {linkCopied ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                height={18}
                                width={18}
                            >
                                <path
                                    fill="currentColor"
                                    d="M6.218 13.64l3.288 3.098 10.073-9.92.637.637L9.506 18.01 5.58 14.276z"
                                />
                                <path fill="none" d="M0 0h24v24H0z" />
                            </svg>
                        ) : (
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
                        )}
                    </div>
                )}
                {status && (
                    <div onClick={statusOnChange.bind(null, null)}>
                        {CloseButton}
                    </div>
                )}
            </div>
        </div>
    );
};
