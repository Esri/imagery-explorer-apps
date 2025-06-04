import { useAppSelector } from '@shared/store/configureStore';
import {
    selectShouldShowSatelliteImageryLayer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { AnimationStatus } from '@shared/store/UI/reducer';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type AnimationStatusIndicatorProps = {
    animationStatus: AnimationStatus;
};

export const AnimationStatusIndicator: FC<AnimationStatusIndicatorProps> = ({
    animationStatus,
}) => {
    const { t } = useTranslation();

    const selectedYear = useAppSelector(selectYear);

    const shouldShowSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    if (!animationStatus) {
        return null; // no animation status, do not show anything
    }

    return (
        <div className="w-full mt-8 flex items-center justify-center opacity-50">
            <div>
                {animationStatus === 'loading' ? (
                    <div className="flex ">
                        <calcite-loader
                            scale="m"
                            inline
                            label={t('load_animation')}
                        ></calcite-loader>
                        <span className="ml-2">{t('load_animation')}</span>
                    </div>
                ) : (
                    <p>
                        {shouldShowSatelliteImageryLayer
                            ? t('imagery_at', {
                                  year: selectedYear,
                              })
                            : t('landcover_at', {
                                  year: selectedYear,
                              })}
                    </p>
                )}
            </div>
        </div>
    );
};
