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
import React, { FC } from 'react';

type Props = {
    /**
     * label text to be displayed at bottom of the card
     */
    label?: string;
    /**
     * url of the background thumbnail image
     */
    thumbnail: string;
    /**
     * if true, use the "selected" style
     */
    selected: boolean;
    /**
     * emits when user clicks on this card
     * @returns
     */
    onClick: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

/**
 * This is a tiny rectangle card that will be used to populate the "Renderer" and "Interesting Places" grid list
 * @param param0
 * @returns
 */
export const GirdCard: FC<Props> = ({
    label,
    thumbnail,
    selected,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    return (
        <div
            className={classNames('relative w-24 h-12 cursor-pointer', {
                'drop-shadow-custom-light-blue': selected,
            })}
            style={{
                background: `url(${thumbnail})`,
                backgroundSize: 'cover',
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                className={classNames('absolute top-0 left-0 w-full h-full', {
                    'border-2': selected,
                    'border-custom-light-blue': selected,
                    // 'drop-shadow-custom-light-blue': selected,
                })}
                style={{
                    background: `linear-gradient(0deg, rgba(2,28,36,1) 0%, rgba(2,28,36,0.6) 30%, rgba(2,28,36,0) 50%, rgba(2,28,36,0) 100%)`,
                }}
            ></div>

            <div className="absolute bottom-0 left-0 right-0 text-center text-ellipsis whitespace-nowrap overflow-hidden z-10">
                <span className="text-xs">{label}</span>
            </div>
        </div>
    );
};
