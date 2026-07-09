import React, { useMemo } from 'react';
import { RangeSlider } from '@shared/components/Slider/RangeSlider';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectAvaiableYearsForLandCoverLayer,
    selectLandcoverAppAnimationYearRange,
} from '@shared/store/LandcoverExplorer/selectors';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import { landcoverAnimationYearRangeChanged } from '@shared/store/LandcoverExplorer/reducer';
import { useTranslation } from 'react-i18next';

export const AnimationYearRangeSelector = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const aminationYearRange = useAppSelector(
        selectLandcoverAppAnimationYearRange
    );

    // const availableYears = useMemo(() => {
    //     return getAvailableYears();
    // }, [aminationYearRange]);

    const availableYears = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    const sliderValues = useMemo(() => {
        const currentYear = getCurrentYear();
        const { start, end } = aminationYearRange || {
            start: currentYear,
            end: currentYear,
        };
        return [start || currentYear, end || currentYear];
    }, [aminationYearRange]);

    const minYear = availableYears?.[0] ?? getCurrentYear() - 1;
    const maxYear =
        availableYears?.[availableYears.length - 1] ?? getCurrentYear();

    return (
        <div className="mt-4">
            <div className="text-center text-xs opacity-50 pr-2">
                <span>
                    {t('selected_year_range', {
                        startYear:
                            aminationYearRange?.start || getCurrentYear(),
                        endYear: aminationYearRange?.end || getCurrentYear(),
                    })}
                </span>
            </div>

            <RangeSlider
                values={sliderValues}
                min={minYear}
                max={maxYear}
                steps={1}
                tickLabels={availableYears}
                countOfTicks={20}
                valuesOnChange={(vals) => {
                    const [startYear, endYear] = vals;
                    if (!startYear || !endYear || startYear > endYear) return;
                    dispatch(
                        landcoverAnimationYearRangeChanged({
                            start: startYear,
                            end: endYear,
                        })
                    );
                }}
            />
        </div>
    );
};
