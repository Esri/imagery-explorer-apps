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
import { SAVE_OPTION_ROW_CLASS } from './SaveOptionButton';

type SaveOptionsListHeaderProps = {
    title: string;
};

export const SaveOptionsListHeader: FC<SaveOptionsListHeaderProps> = ({
    title,
}) => {
    return (
        <div
            className={classNames(
                SAVE_OPTION_ROW_CLASS,
                'mb-6 border-b pb-1 border-custom-light-blue-25'
            )}
        >
            <div className="uppercase text-lg">{title}</div>
            <div className="opacity-50">About</div>
        </div>
    );
};
