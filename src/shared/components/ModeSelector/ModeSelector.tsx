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

const ButtonWrapperClassnames = `mb-1 h-12`;

export const ModeSelector: FC<Props> = ({
    selectedMode,
    disabled,
    selectedModeOnChange,
}: Props) => {
    return (
        <>
            <div
                className={classNames({
                    'is-disabled': disabled,
                })}
            >
                {/* this is button to enable selection of either 'find a scene' or 'dynamic' mode */}
                <div className={ButtonWrapperClassnames}>
                    <Button
                        fullHeight={true}
                        appearance={
                            selectedMode === 'find a scene' ||
                            selectedMode === 'dynamic'
                                ? 'solid'
                                : 'transparent'
                        }
                        onClickHandler={() => {
                            if (
                                selectedMode === 'find a scene' ||
                                selectedMode === 'dynamic'
                            ) {
                                return;
                            }

                            selectedModeOnChange('find a scene');
                        }}
                    >
                        <span className="uppercase">Explore</span>
                    </Button>
                </div>

                {modes.map((mode) => (
                    <div key={mode} className={ButtonWrapperClassnames}>
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

            {(selectedMode === 'dynamic' ||
                selectedMode === 'find a scene') && (
                <div className="container-of-secondary-controls px-1">
                    {exploreModes.map((mode) => (
                        <div key={mode} className={'mb-1'}>
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
