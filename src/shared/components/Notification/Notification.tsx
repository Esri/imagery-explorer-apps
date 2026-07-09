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

type Props = {
    message: string;
    closeButtonOnClick: () => void;
};

export const Notification: FC<Props> = ({ closeButtonOnClick, message }) => {
    return (
        <div
            className="fixed left-0 right-0 bottom-bottom-panel-height flex justify-center items-center pb-4 pointer-events-none"
            // style={{
            //     background: `linear-gradient(90deg, rgba(191,238,254,0) 0%, rgba(191,238,254,1) 20%, rgba(191,238,254,1) 80%, rgba(191,238,254,0) 100%)`,
            // }}
        >
            <div className="theme-background text-custom-light-blue-90 text-sm flex items-start px-4 py-2">
                <div
                    className="max-w-3xl"
                    dangerouslySetInnerHTML={{
                        __html: message,
                    }}
                ></div>

                <div
                    className="cursor-pointer pointer-events-auto ml-2"
                    onClick={closeButtonOnClick}
                >
                    <calcite-icon icon="x" scale="m" />
                </div>
            </div>
        </div>
    );
};
