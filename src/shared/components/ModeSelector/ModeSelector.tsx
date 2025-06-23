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
import { Button } from '../Button';
import { AppMode } from '../../store/ImageryScene/reducer';
import classNames from 'classnames';
import { ContainerOfSecondaryControls } from './ContainerOfSecondaryControls';
import { useTranslation } from 'react-i18next';

const modes: AppMode[] = ['swipe', 'animate', 'analysis'];
const exploreModes: AppMode[] = ['dynamic', 'find a scene'];

type Props = {
    /**
     * selected app mode
     */
    selectedMode: AppMode;
    /**
     * if true, Mode Selector should be disabled
     */
    disabled: boolean;
    /**
     * fires when app mode is changed
     * @param value
     * @returns
     */
    selectedModeOnChange: (value: AppMode) => void;
};

const ButtonWrapperClassnames = `relative mb-1 h-12`;

export const ModeSelector: FC<Props> = ({
    selectedMode,
    disabled,
    selectedModeOnChange,
}: Props) => {
    const { t } = useTranslation();

    const getFormattedModeName = (mode: AppMode) => {
        if (mode === 'analysis') {
            return t('analysis');
        }

        if (mode === 'find a scene') {
            return t('find_a_scene');
        }

        return t(mode);
    };

    const isExploreButtonSelected =
        selectedMode === 'find a scene' || selectedMode === 'dynamic';

    return (
        <>
            <div
                className={classNames('relative', {
                    'is-disabled': disabled,
                })}
            >
                {/* this is button to enable selection of either 'find a scene' or 'dynamic' mode */}
                <div className={classNames(ButtonWrapperClassnames)}>
                    <Button
                        fullHeight={true}
                        appearance={
                            isExploreButtonSelected ? 'solid' : 'transparent'
                        }
                        onClickHandler={() => {
                            if (isExploreButtonSelected) {
                                return;
                            }

                            selectedModeOnChange('find a scene');
                        }}
                        decorativeIndicator={
                            isExploreButtonSelected ? 'right' : null
                        }
                    >
                        <span className="uppercase">{t('explore')}</span>
                    </Button>
                </div>

                {modes.map((mode) => (
                    <div
                        key={mode}
                        className={classNames(ButtonWrapperClassnames)}
                        data-testid={`mode-selector-${mode}`}
                    >
                        <Button
                            fullHeight={true}
                            appearance={
                                mode === selectedMode ? 'solid' : 'transparent'
                            }
                            decorativeIndicator={
                                mode === selectedMode ? 'right' : null
                            }
                            onClickHandler={() => {
                                selectedModeOnChange(mode);
                            }}
                        >
                            <span className="uppercase">
                                {getFormattedModeName(mode)}
                            </span>
                        </Button>
                    </div>
                ))}
            </div>

            {isExploreButtonSelected && (
                <ContainerOfSecondaryControls>
                    {exploreModes.map((mode) => (
                        <div
                            key={mode}
                            className={classNames('relative mb-1')}
                            data-testid={`mode-selector-${mode}`}
                        >
                            <Button
                                // fullHeight={true}
                                appearance={
                                    mode === selectedMode
                                        ? 'solid'
                                        : 'transparent'
                                }
                                scale="s"
                                decorativeIndicator={
                                    mode === selectedMode ? 'left' : null
                                }
                                onClickHandler={() => {
                                    selectedModeOnChange(mode);
                                }}
                            >
                                <span className="uppercase">{t(mode)}</span>
                            </Button>
                        </div>
                    ))}
                </ContainerOfSecondaryControls>
            )}
        </>
    );
};
