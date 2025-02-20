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

type OpenIconProps = {
    onClick: () => void;
};

const OpenIcon: FC<OpenIconProps> = ({ onClick }: OpenIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            viewBox="0 0 16 16"
            height="16"
            width="16"
            onClick={onClick}
        >
            <path
                fill="currentColor"
                d="M8.5 6.5a1 1 0 1 1 1-1 1.002 1.002 0 0 1-1 1zM8 13h1V8H8zm2-1H7v1h3zm5.8-3.5a7.3 7.3 0 1 1-7.3-7.3 7.3 7.3 0 0 1 7.3 7.3zm-1 0a6.3 6.3 0 1 0-6.3 6.3 6.307 6.307 0 0 0 6.3-6.3z"
            />
            <path fill="none" d="M0 0h16v16H0z" />
        </svg>
    );
};

export default OpenIcon;
