import React, { useMemo } from 'react';
import { TimeSliderWidget } from '../TimeSelector/TimeSliderWidget';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { getUTCDate } from '@shared/utils/date-time/getUTCDate';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectLandcoverAppAnimationYearRange } from '@shared/store/LandcoverExplorer/selectors';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import { landcoverAnimationYearRangeChanged } from '@shared/store/LandcoverExplorer/reducer';

export const AnimationYearRangeSelector = () => {
    const dispatch = useAppDispatch();

    const aminationYearRange = useAppSelector(
        selectLandcoverAppAnimationYearRange
    );

    const availableYears = useMemo(() => {
        return getAvailableYears();
    }, [aminationYearRange]);

    const initialTimeExtent = useMemo(() => {
        const currentYear = getCurrentYear();

        const { start, end } = aminationYearRange || {
            start: currentYear,
            end: currentYear, // default to current year
        };

        if (!start || !end || start > end) {
            return {
                start: getUTCDate(currentYear - 1, 1, 1), // January 1st of the start year
                end: getUTCDate(currentYear, 1, 1),
            };
        }

        return {
            start: getUTCDate(start, 1, 1), // January 1st of the start year
            end: getUTCDate(end, 1, 1),
        };
    }, [availableYears, aminationYearRange]);

    return (
        <div className="mt-4">
            <TimeSliderWidget
                mode="time-window"
                years={availableYears}
                initialTimeExtent={initialTimeExtent}
                visible={true}
                timeExtentOnChange={(startYear, endYear) => {
                    if (!startYear || !endYear || startYear > endYear) {
                        return; // invalid range, do nothing
                    }

                    dispatch(
                        landcoverAnimationYearRangeChanged({
                            start: startYear,
                            end: endYear,
                        })
                    );
                    // console.log(startYear, endYear)
                }}
                // selectedYear={year}
            />
        </div>
    );
};
