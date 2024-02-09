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
    children?: React.ReactNode;
};

export const ContainerOfSecondaryControls: FC<Props> = ({ children }) => {
    return (
        <div className="w-36 shrink-0 ml-space-between-main-secondary-selectors pl-space-between-main-secondary-selectors border-l border-custom-light-blue-50">
            {children}
        </div>
    );
};
