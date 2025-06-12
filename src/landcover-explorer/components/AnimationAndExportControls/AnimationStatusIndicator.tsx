import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectShouldShowSatelliteImageryLayer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { AnimationStatus } from '@shared/store/UI/reducer';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TimeSliderWidget } from '../TimeSelector/TimeSliderWidget';
import { getUTCDate } from '@shared/utils/date-time/getUTCDate';
import { get } from 'http';

type AnimationStatusIndicatorProps = {
    animationStatus: AnimationStatus;
};

export const AnimationStatusIndicator: FC<AnimationStatusIndicatorProps> = ({
    animationStatus,
}) => {
    const { t } = useTranslation();

    const selectedYear = useAppSelector(selectYear);

    const availableYears = useMemo(() => {
        return getAvailableYears();
    }, []);

    const shouldShowSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const getHeader = () => {
        if (animationStatus === 'loading') {
            return (
                <div className="flex ">
                    <calcite-loader
                        scale="m"
                        inline
                        label={t('load_animation')}
                    ></calcite-loader>
                    <span className="ml-2">{t('load_animation')}</span>
                </div>
            );
        }

        if (animationStatus === 'failed-loading') {
            return <p>{t('animation_load_failed')}</p>;
        }

        return (
            <p>
                {shouldShowSatelliteImageryLayer
                    ? t('imagery_at', {
                          year: selectedYear,
                      })
                    : t('landcover_at', {
                          year: selectedYear,
                      })}
            </p>
        );
    };

    if (!animationStatus) {
        return null; // no animation status, do not show anything
    }

    return (
        <div className="w-full mt-4 opacity-50">
            <div className="flex items-center justify-center text-center text-xs">
                {/* {animationStatus === 'loading' ? (
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
                )} */}
                {getHeader()}
            </div>
            <div className="w-full mt-2 pointer-events-none ">
                <TimeSliderWidget
                    mode="instant"
                    years={availableYears}
                    selectedYear={selectedYear}
                    initialTimeExtent={{
                        start: getUTCDate(selectedYear, 1, 1),
                        end: getUTCDate(selectedYear, 1, 1),
                    }}
                    visible={true}
                />
            </div>
        </div>
    );
};
