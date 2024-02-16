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

import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { modeChanged } from '@landcover-explorer/store/Map/reducer';
import { selectMapMode } from '@landcover-explorer/store/Map/selectors';
import { saveMapModeToHashParams } from '@landcover-explorer/utils/URLHashParams';

const BTN_CLASSNAMES =
    'p-1 mx-2 cursor-pointer uppercase flex items-center border-b';

type Props = {
    disabled?: boolean;
};

const ModeSelector: FC<Props> = ({ disabled }: Props) => {
    const dispatch = useDispatch();

    const activeMode = useSelector(selectMapMode);

    const isSwipeBtnActive = activeMode === 'swipe';
    const isStepBtnActive = activeMode === 'step';

    useEffect(() => {
        saveMapModeToHashParams(activeMode);
    }, [activeMode]);

    return (
        <div
            className={classNames(
                'hidden md:flex justify-center text-xs mt-4',
                {
                    'disabled-when-animation-mode-is-on': disabled,
                }
            )}
        >
            <div
                className={classNames(BTN_CLASSNAMES, {
                    'opacity-50': !isStepBtnActive,
                    'border-custom-light-blue-80': isStepBtnActive,
                    'border-custom-light-blue-0': !isStepBtnActive,
                })}
                onClick={() => {
                    dispatch(modeChanged('step'));
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                >
                    <path
                        fill="currentColor"
                        d="M2 8h7.26L7.674 6.415l.707-.707 2.809 2.81-2.81 2.808-.706-.707L9.295 9H2zm11 5h1V4h-1z"
                    />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
                <span className="ml-1">step mode</span>
            </div>

            <div
                className={classNames(BTN_CLASSNAMES, {
                    'opacity-50': !isSwipeBtnActive,
                    'border-custom-light-blue-80': isSwipeBtnActive,
                    'border-custom-light-blue-0': !isSwipeBtnActive,
                })}
                onClick={() => {
                    dispatch(modeChanged('swipe'));
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                >
                    <path
                        fill="currentColor"
                        d="M12 9v1.746L14.296 8.5 12 6.254V8h-2V2h6v13h-6V9zm-4 7h1V1H8zm-7-1h6v-1H2V3h5V2H1zm4-8.45L2.95 8.5 5 10.45V9h2V8H5z"
                    />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
                <span className="ml-1">swipe mode</span>
            </div>
        </div>
    );
};

export default ModeSelector;
