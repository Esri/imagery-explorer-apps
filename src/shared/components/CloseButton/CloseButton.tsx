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
import './CloseButton.css';
import React, { FC } from 'react';

type Props = {
    /**
     * size of the gradient backgeound
     */
    gradientBackgroundSize?: 'l' | 'm' | 's';
    onClick: () => void;
};

export const CloseButton: FC<Props> = ({
    gradientBackgroundSize,
    onClick,
}: Props) => {
    return (
        <div
            className={classNames('close-button text-custom-light-blue', {
                'large-gradient-background': gradientBackgroundSize === 'l',
                'medium-gradient-background': gradientBackgroundSize === 'm',
            })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                height="64"
                width="64"
                className="absolute top-1 right-1 cursor-pointer with-drop-shadow"
                onClick={onClick}
            >
                <path
                    fill="currentColor"
                    d="M23.985 8.722L16.707 16l7.278 7.278-.707.707L16 16.707l-7.278 7.278-.707-.707L15.293 16 8.015 8.722l.707-.707L16 15.293l7.278-7.278z"
                />
                <path fill="none" d="M0 0h32v32H0z" />
            </svg>
        </div>
    );
};
