import React, { FC } from 'react';
import { Button } from '../Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAppMode } from '../../store/Landsat/selectors';
import { AppMode, modeChanged } from '../../store/Landsat/reducer';
import { selectIsAnimationPlaying } from '../../store/UI/selectors';
import classNames from 'classnames';

const modes: AppMode[] = ['explore', 'find a scene', 'swipe', 'animate'];

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
    onChange: (value: AppMode) => void;
};

export const ModeSelector: FC<Props> = ({
    selectedMode,
    disabled,
    onChange,
}: Props) => {
    return (
        <div
            className={classNames('flex flex-col', {
                'is-disabled': disabled,
            })}
        >
            {modes.map((mode) => (
                <div key={mode} className="my-1 h-1/4">
                    <Button
                        fullHeight={true}
                        appearance={
                            mode === selectedMode ? 'solid' : 'transparent'
                        }
                        onClickHandler={() => {
                            onChange(mode);
                        }}
                    >
                        <span className="uppercase">{mode}</span>
                    </Button>
                </div>
            ))}
        </div>
    );
};
