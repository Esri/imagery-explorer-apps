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

type DownloadIconProps = {
    onClick: () => void;
};

const DownloadIcon: FC<DownloadIconProps> = ({
    onClick,
}: DownloadIconProps) => {
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
                d="M9 2v7.293l1.618-1.619.707.707-2.808 2.81-2.81-2.81.707-.707L8 9.26V2zM4 14h9v-1H4z"
            />
            <path fill="none" d="M0 0h16v16H0z" />
        </svg>
    );
};

export default DownloadIcon;
