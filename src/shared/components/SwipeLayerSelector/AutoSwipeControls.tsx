import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAutoSwipeStatus,
    selectAutoSwipeSpeed,
} from '@shared/store/Map/selectors';
import {
    StartPlayButton,
    CloseButton,
} from '../AnimationControl/AnimationControl';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    AUTO_SWIPE_SPEEDS,
    autoSwipeSpeedChanged,
    AutoSwipeStatus,
    autoSwipeStatusChanged,
} from '@shared/store/Map/reducer';
import { Slider } from '../Slider';

export const AutoSwipeControls = () => {
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectAutoSwipeStatus);

    const speed = useAppSelector(selectAutoSwipeSpeed);

    const statusOnChange = (status: AutoSwipeStatus) => {
        dispatch(autoSwipeStatusChanged(status));
    };

    /**
     * use index of items in auto swipe speeds arrar
     * as the steps of the slider
     */
    const sliderSteps = useMemo(() => {
        const indice = [];

        for (let i = 0; i < AUTO_SWIPE_SPEEDS.length; i++) {
            indice.push(i);
        }

        return indice;
    }, [AUTO_SWIPE_SPEEDS]);

    return (
        <div className="flex items-center">
            <div className="flex-grow mx-2 mt-2">
                <Slider
                    value={AUTO_SWIPE_SPEEDS.indexOf(speed)}
                    steps={sliderSteps}
                    onChange={(index) => {
                        // console.log(val)

                        // get actual speed by index
                        const speed = AUTO_SWIPE_SPEEDS[index];

                        dispatch(autoSwipeSpeedChanged(speed));
                    }}
                />

                <div className="text-xs text-center mt-1">
                    <span>speed</span>
                </div>
            </div>

            <div className={'flex cursor-pointer items-center mx-1'}>
                {!status && (
                    <div
                        className=" bg-custom-light-blue-5 px-1"
                        onClick={statusOnChange.bind(null, 'playing')}
                        title="Enable auto-swipe"
                    >
                        {StartPlayButton}
                    </div>
                )}
                {status && (
                    <div onClick={statusOnChange.bind(null, null)}>
                        {CloseButton}
                    </div>
                )}
            </div>
        </div>
    );
};
