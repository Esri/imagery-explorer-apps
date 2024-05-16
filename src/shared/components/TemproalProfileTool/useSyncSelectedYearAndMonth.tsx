import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    // getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import {
    acquisitionMonth4TrendToolChanged,
    // samplingTemporalResolutionChanged,
    // trendToolDataUpdated,
    // selectedIndex4TrendToolChanged,
    // queryLocation4TrendToolChanged,
    // trendToolOptionChanged,
    acquisitionYear4TrendToolChanged,
} from '@shared/store/TrendTool/reducer';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';

/**
 * This custom hook update the `acquisitionMonth` and `acquisitionMonth` property of the Trend Tool State
 * to keep it in sync with the acquisition date of selected imagery scene
 */
export const useSyncSelectedYearAndMonth4TemporalProfileTool = () => {
    const dispatch = useDispatch();

    const { rasterFunctionName, acquisitionDate, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    useEffect(() => {
        // remove query location when selected acquisition date is removed
        if (!acquisitionDate) {
            dispatch(updateQueryLocation4TrendTool(null));
            return;
        }

        const month = getMonthFromFormattedDateString(acquisitionDate);

        const year = getYearFromFormattedDateString(acquisitionDate);

        batch(() => {
            dispatch(acquisitionMonth4TrendToolChanged(month));
            dispatch(acquisitionYear4TrendToolChanged(year));
        });
    }, [acquisitionDate]);
};
