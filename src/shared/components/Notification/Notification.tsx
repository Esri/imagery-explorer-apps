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

import React, { FC } from 'react';

type Props = {
    closeButtonOnClick: () => void;
    children?: React.ReactNode;
};

export const Notification: FC<Props> = ({ closeButtonOnClick, children }) => {
    return (
        <div
            className=" absolute left-0 right-0 bottom-bottom-panel-height text-custom-background flex justify-center py-1"
            style={{
                background: `linear-gradient(90deg, rgba(191,238,254,0) 0%, rgba(191,238,254,1) 20%, rgba(191,238,254,1) 80%, rgba(191,238,254,0) 100%)`,
            }}
        >
            {children}

            <div className="cursor-pointer" onClick={closeButtonOnClick}>
                <calcite-icon icon="x" scale="m" />
            </div>
        </div>
    );
};
