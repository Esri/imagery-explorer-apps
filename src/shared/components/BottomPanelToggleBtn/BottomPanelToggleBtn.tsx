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

import classNames from 'classnames';
import React, { FC } from 'react';

type Props = {
    /**
     * if true, Bottom Panel is hidden
     */
    isBottomPanelHidden: boolean;
    onClickHandler: () => void;
};

const CheveronDownIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M20.1 9L12 17.1 3.9 9z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const CheveronUpIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
    >
        <path fill="currentColor" d="M3.9 15L12 6.9l8.1 8.1z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

const BottomPanelToggleBtn: FC<Props> = ({
    isBottomPanelHidden,
    onClickHandler,
}: Props) => {
    return (
        <div
            className={classNames('absolute right-0 w-10 h-10', {
                'bottom-bottom-panel-height': isBottomPanelHidden === false,
                'bottom-0': isBottomPanelHidden,
            })}
        >
            <div
                className="absolute rounded-full top-5 w-full h-full theme-background text-custom-light-blue flex justify-center cursor-pointer"
                onClick={onClickHandler}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-full"
                    style={{
                        background: 'rgba(0,0,0,0.6)',
                    }}
                ></div>

                <div className="relative z-10">
                    {isBottomPanelHidden ? CheveronUpIcon : CheveronDownIcon}
                </div>
            </div>
        </div>
    );
};

export default BottomPanelToggleBtn;
