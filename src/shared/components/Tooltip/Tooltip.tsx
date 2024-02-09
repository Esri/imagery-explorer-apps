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
import React, { FC, useState } from 'react';

type Props = {
    content: string;
    width?: number;
    children?: React.ReactNode;
};

export const Tooltip: FC<Props> = ({ content, width = 130, children }) => {
    const [visible, setIsVisible] = useState<boolean>(false);

    const toggleTooltipVisibility = debounce((val: boolean) => {
        setIsVisible(val);
    }, 150);

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
                toggleTooltipVisibility(true);
            }}
            onMouseLeave={() => {
                toggleTooltipVisibility(false);
            }}
        >
            {children}
            <div
                className={classNames(
                    'absolute inline-block left-1/2 bottom-[125%] translate-x-[-50%] bg-custom-background text-custom-light-blue-90 p-1 px-2 border border-custom-light-blue-50 text-xs z-10 pointer-events-none',
                    {
                        hidden: visible === false,
                    }
                )}
                dangerouslySetInnerHTML={{ __html: content }}
                style={{
                    width: `${width}px`,
                }}
            ></div>
        </div>
    );
};
