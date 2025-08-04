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

import { CalciteIcon } from '@esri/calcite-components-react';
import { Button } from '@shared/components/Button';
import classNames from 'classnames';
import React, { FC, useState } from 'react';

type Props = {
    classificationNameOnEnter: (name: string) => void;
};

export const SamplingSessionNameEditor: FC<Props> = ({
    classificationNameOnEnter,
}) => {
    const [classificationName, setClassificationName] = useState<string>('');

    return (
        <div className="relative">
            <div className="relative w-full border-b border-custom-light-blue-25 mb-3">
                <input
                    className={classNames(
                        'w-full px-1 bg-transparent text-xs',
                        'border-none outline-none ',
                        'placeholder:text-custom-light-blue-50 text-custom-light-blue-90'
                    )}
                    placeholder="Classification Name"
                    type="text"
                    value={classificationName}
                    onChange={(evt) => {
                        setClassificationName(evt.target.value);
                    }}
                    onKeyUp={(evt) => {
                        if (evt.key === 'Enter') {
                            classificationNameOnEnter(classificationName);
                        }
                    }}
                />

                {classificationName && (
                    <div
                        className=" bg-custom-background absolute right-0 top-0 h-full flex items-center cursor-pointer"
                        onClick={setClassificationName.bind(null, '')}
                    >
                        <CalciteIcon icon="x" scale="s" />
                    </div>
                )}
            </div>

            <div
                className={classNames({
                    'is-disabled': !classificationName,
                })}
            >
                <Button
                    scale="s"
                    onClickHandler={() => {
                        classificationNameOnEnter(classificationName);
                    }}
                >
                    Start a New Session
                </Button>
            </div>
        </div>
    );
};
