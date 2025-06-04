import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AnimationSpeedControl,
    AnimationSpeedSlider,
} from '@shared/components/AnimationControl/AnimationSpeedControl';
import AnimationStatusButton from './AnimationStatusButton';
import { OptionButton } from './OptionButton';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import classNames from 'classnames';
import { AnimationYearRangeSelector } from './AnimationYearRangeSelector';

type AnimationOptionsProps = {
    animationSpeed: number;
    /**
     * fires when user makes change to Animation Speed
     * @param newSpeed speed in milliseconds
     * @returns
     */
    speedOnChange: (newSpeed?: number) => void;
    copyLinkOnClick: () => void;
    donwloadAnimationOnClick: () => void;
    closeAnimationControlsButtonOnClick: () => void;
};

export const AnimationOptions: FC<AnimationOptionsProps> = ({
    animationSpeed,
    copyLinkOnClick,
    donwloadAnimationOnClick,
    speedOnChange,
    closeAnimationControlsButtonOnClick,
}: AnimationOptionsProps) => {
    const { t } = useTranslation();

    const aninationStatus = useAppSelector(selectAnimationStatus);

    const shouldOptionButtonsBeDisabled = !aninationStatus;

    return (
        <>
            <div className="flex items-center justify-around">
                <div
                    className={classNames('flex items-center w-24', {
                        'opacity-50 pointer-events-none':
                            shouldOptionButtonsBeDisabled,
                    })}
                >
                    <AnimationSpeedSlider
                        speedInMilliseonds={animationSpeed}
                        speedOnChange={speedOnChange}
                    />

                    <span className="ml-3">{t('speed')}</span>
                </div>

                <OptionButton
                    label={t('copy_link')}
                    icon="link"
                    disabled={shouldOptionButtonsBeDisabled}
                    onClick={copyLinkOnClick}
                />

                <OptionButton
                    label={t('donwload_mp4')}
                    icon="download-to"
                    disabled={shouldOptionButtonsBeDisabled}
                    onClick={donwloadAnimationOnClick}
                />

                <AnimationStatusButton
                    closeAnimationControlsButtonOnClick={
                        closeAnimationControlsButtonOnClick
                    }
                />
            </div>

            {aninationStatus === null && (
                <div>
                    <AnimationYearRangeSelector />
                </div>
            )}
        </>
    );
};
