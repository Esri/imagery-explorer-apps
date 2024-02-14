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

import { debounce } from '@shared/utils/snippets/debounce';
import classNames from 'classnames';
import React, { FC, useRef, useState } from 'react';

type Props = {
    content: string;
    width?: number;
    children?: React.ReactNode;
};

type TooltipPosition = {
    left: number;
    top: number;
};

export const Tooltip: FC<Props> = ({ content, width = 130, children }) => {
    const containerRef = useRef<HTMLDivElement>();

    const [visible, setIsVisible] = useState<boolean>(false);

    /**
     * Fixed position of the Tooltip relative to the screen
     */
    const [position, setPosition] = useState<TooltipPosition>();

    const toggleTooltipVisibility = debounce((val: boolean) => {
        if (val) {
            getTooltipPosition();
        } else {
            setPosition(null);
        }

        setIsVisible(val);
    }, 150);

    /**
     * calculate the fixed position (relative to the window) where the tooltip should be placed
     */
    const getTooltipPosition = () => {
        // Get the position of the element relative to the viewport
        const rect = containerRef.current.getBoundingClientRect();

        // The position of the element relative to the screen
        setPosition({
            top: rect.top,
            left: rect.left,
        });
    };

    return (
        <div
            className="relative cursor-pointer"
            ref={containerRef}
            onMouseEnter={() => {
                toggleTooltipVisibility(true);
            }}
            onMouseLeave={() => {
                toggleTooltipVisibility(false);
            }}
        >
            {children}

            {visible && position ? (
                <div
                    className={classNames(
                        'fixed inline-block translate-x-[-50%] translate-y-[-105%] bg-custom-background text-custom-light-blue-90 p-1 px-2 border border-custom-light-blue-50 text-xs z-10 pointer-events-none'
                    )}
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={{
                        width: `${width}px`,
                        left: position.left,
                        top: position.top,
                    }}
                ></div>
            ) : (
                <></>
            )}
        </div>
    );
};
