import React from 'react';
import { Button } from '../../../shared/components/Button';
import { AppMode, appModeChanged } from '../../../shared/store/UI/reducer';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../../../shared/store/UI/selectors';
import { useDispatch } from 'react-redux';

const modes: AppMode[] = ['explore', 'find a scene', 'swipe', 'animate'];

export const ModeSelectorContainer = () => {
    const dispatch = useDispatch();

    const selectedMode = useSelector(selectAppMode);
    return (
        <div>
            {modes.map((mode) => (
                <Button
                    key={mode}
                    appearance={mode === selectedMode ? 'solid' : 'transparent'}
                    onClickHandler={() => {
                        dispatch(appModeChanged(mode));
                    }}
                >
                    <span className="uppercase">{mode}</span>
                </Button>
            ))}
        </div>
    );
};
