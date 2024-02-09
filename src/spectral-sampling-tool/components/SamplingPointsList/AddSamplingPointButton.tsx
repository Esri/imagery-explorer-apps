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
     * if ture, Add a Frame Button should be disabled.
     * This happenes when number of frames hits the upper limit
     */
    shouldDisableAddButton?: boolean;
    /**
     * fires when user clicks on "Add A Scene" button
     * @returns void
     */
    addButtonOnClick: () => void;
};

export const AddSamplingPointButton: FC<Props> = ({
    shouldDisableAddButton,
    addButtonOnClick,
}) => {
    return (
        <div
            className={classNames(
                'w-full cursor-pointer text-center flex items-center',
                {
                    'is-disabled': shouldDisableAddButton,
                }
            )}
            onClick={addButtonOnClick}
        >
            <calcite-icon icon="plus" scale="s" />
            <span
                className=" text-custom-light-blue uppercase ml-1 underline"
                style={{
                    fontSize: `.7rem`,
                }}
            >
                Add a sample point
            </span>
        </div>
    );
};
