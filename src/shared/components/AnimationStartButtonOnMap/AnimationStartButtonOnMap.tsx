import { CalciteIcon } from '@esri/calcite-components-react';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type AnimationStartButtonOnMapProps = {
    startAnimationButtonOnClick: () => void;
};

/**
 * This component renders a button to start the animation on the map. This button is positioned
 * at the center of the map and is only visible when the animation mode is active and the animation
 * is not currently running.
 *
 * This component offers users an alternative way to start the animation especially when the main controls
 * in the bottom panel are hidden.
 *
 * @param props.startAnimationButtonOnClick - Callback function to be invoked when the start animation button is clicked.
 * @returns A React functional component that displays a button to start the animation on the map.
 */
export const AnimationStartButtonOnMap: FC<AnimationStartButtonOnMapProps> = ({
    startAnimationButtonOnClick,
}) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    return (
        <div className="aboslute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
            <div
                className="pointer-events-auto z-10 flex items-center justify-center p-2 bg-custom-background-10 hover:bg-custom-background-50 border-4 border-custom-light-blue-80 rounded-full backdrop-blur-sm cursor-pointer"
                title={t('start_animation')}
                onClick={() => {
                    // dispatch(animationStatusChanged('loading'));
                    startAnimationButtonOnClick();
                }}
            >
                <CalciteIcon icon="play-f" scale="l" />
            </div>
        </div>
    );
};
