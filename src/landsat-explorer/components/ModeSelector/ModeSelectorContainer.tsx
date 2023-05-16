import React from 'react';
import { Button } from '../../../shared/components/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAppMode } from '../../../shared/store/Landsat/selectors';
import { AppMode, modeChanged } from '../../../shared/store/Landsat/reducer';

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
                        dispatch(modeChanged(mode));
                    }}
                >
                    <span className="uppercase">{mode}</span>
                </Button>
            ))}
        </div>
    );
};
