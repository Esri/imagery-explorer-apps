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

import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button } from '@shared/components/Button';
import { AnalysisTool, AppMode } from '@shared/store/ImageryScene/reducer';

const modes: {
    mode: AppMode;
    label?: string;
}[] = [
    {
        mode: 'dynamic',
    },
    {
        mode: 'find a scene',
    },
];

type Props = {
    /**
     * selected app mode
     */
    selectedMode: AppMode;
    /**
     * selected analysis tool
     */
    selectedAnalysisTool: AnalysisTool;
    /**
     * if true, Mode Selector should be disabled
     */
    disabled: boolean;
    /**
     * fires when app mode is changed
     * @param value
     * @returns
     */
    selectedModeOnChange: (value: AppMode, label?: string) => void;
    highlightButtonOnClick: () => void;
    profileButtonOnClick: () => void;
};

const ButtonWrapperClassnames = `relative mb-1 h-12`;

export const ModeSelector: FC<Props> = ({
    selectedMode,
    selectedAnalysisTool,
    disabled,
    highlightButtonOnClick,
    profileButtonOnClick,
    selectedModeOnChange,
}: Props) => {
    return (
        <>
            <div
                className={classNames('relative', {
                    'is-disabled': disabled,
                })}
            >
                {modes.map((d) => {
                    const { mode, label } = d;
                    return (
                        <div
                            key={mode}
                            className={classNames(ButtonWrapperClassnames)}
                        >
                            <Button
                                fullHeight={true}
                                appearance={
                                    mode === selectedMode
                                        ? 'solid'
                                        : 'transparent'
                                }
                                onClickHandler={() => {
                                    selectedModeOnChange(mode, label);
                                }}
                            >
                                <span className="uppercase">
                                    {label || mode}
                                </span>
                            </Button>
                        </div>
                    );
                })}

                <div className={classNames(ButtonWrapperClassnames)}>
                    <Button
                        fullHeight={true}
                        appearance={
                            selectedMode === 'analysis' &&
                            selectedAnalysisTool === 'mask'
                                ? 'solid'
                                : 'transparent'
                        }
                        onClickHandler={highlightButtonOnClick}
                    >
                        <span className="uppercase">Highlight</span>
                    </Button>
                </div>

                <div className={classNames(ButtonWrapperClassnames)}>
                    <Button
                        fullHeight={true}
                        appearance={
                            selectedMode === 'analysis' &&
                            selectedAnalysisTool === 'trend'
                                ? 'solid'
                                : 'transparent'
                        }
                        onClickHandler={profileButtonOnClick}
                    >
                        <span className="uppercase">Profile</span>
                    </Button>
                </div>
            </div>
        </>
    );
};
