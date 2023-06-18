import React, { FC, useEffect, useState } from 'react';
import { Button } from '../Button';
import { AppMode } from '../../store/Landsat/reducer';
import classNames from 'classnames';

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
                <div
                    className={classNames(ButtonWrapperClassnames, {
                        'horizontal-indicator-on-right':
                            isExploreButtonSelected,
                    })}
                >
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
                    >
                        <span className="uppercase">Explore</span>
                    </Button>
                </div>

                {modes.map((mode) => (
                    <div
                        key={mode}
                        className={classNames(ButtonWrapperClassnames, {
                            'horizontal-indicator-on-right':
                                mode === selectedMode,
                        })}
                    >
                        <Button
                            fullHeight={true}
                            appearance={
                                mode === selectedMode ? 'solid' : 'transparent'
                            }
                            onClickHandler={() => {
                                selectedModeOnChange(mode);
                            }}
                        >
                            <span className="uppercase">{mode}</span>
                        </Button>
                    </div>
                ))}
            </div>

            {isExploreButtonSelected && (
                <div className="container-of-secondary-controls">
                    {exploreModes.map((mode) => (
                        <div
                            key={mode}
                            className={classNames('relative mb-1', {
                                'horizontal-indicator-on-left':
                                    mode === selectedMode,
                            })}
                        >
                            <Button
                                // fullHeight={true}
                                appearance={
                                    mode === selectedMode
                                        ? 'solid'
                                        : 'transparent'
                                }
                                scale="s"
                                onClickHandler={() => {
                                    selectedModeOnChange(mode);
                                }}
                            >
                                <span className="uppercase">{mode}</span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
