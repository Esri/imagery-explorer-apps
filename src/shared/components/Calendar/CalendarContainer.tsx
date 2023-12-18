import React, { useEffect, useMemo, useState } from 'react';
import Calendar, { FormattedImageryScene } from './Calendar';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '@shared/components/Dropdown';
// import { useMonthOptions } from './useMonthOptions';
import { useAcquisitionYearsAsDropdownMenuOptions } from '@shared/hooks/useAcquisitionYearsAsDropdownMenuOptions';
import { useDispatch } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { useQueryAvailableLandsatScenes } from './useAvailableScenes';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    // updateCloudCover,
} from '@shared/store/ImageryScene/thunks';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import classNames from 'classnames';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { CloudFilter } from '@shared/components/CloudFilter';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import { cloudCoverChanged } from '@shared/store/ImageryScene/reducer';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';
import { LandsatMissionFilter } from '../LandsatMissionFilter';
import { APP_NAME } from '@shared/config';
import { useFindSelectedSceneByDate } from './useFindSelectedSceneByDate';
import { useAcquisitionDateFromSelectedScene } from './useAcquisitionDateFromSelectedScene';
import { useFormattedScenes } from './useFormattedScenes';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const acquisitionDate = queryParams?.acquisitionDate;

    const cloudCoverThreshold = useSelector(selectCloudCover);

    const isChangeCompareLayerOn = useSelector(selectChangeCompareLayerIsOn);

    const [acquisitionYear, setAcquisitionYear] = useState<number>();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes
     */
    useQueryAvailableLandsatScenes(acquisitionYear);

    /**
     * This custom hook gets invoked whenever the available scenes and acquisition date changes,
     * it tries to find the selected imagery scene that was acquired from the selected acquisition date
     */
    useFindSelectedSceneByDate();

    /**
     * The acquisition date of the selected scene to highlight it on the calendar.
     *
     * This hook finds the scene from the available scenes list that has the acquisition date matching the user-selected acquisition date.
     *
     * If no scene is found in the available scenes list, the user-selected date won't be returned so it does not get highlighted in the calendar,
     * indicating that they need to select another date to choose a scene.
     * If a scene is found, its acquisition date is returned for highlighting.
     */
    const selectedAcquisitionDate: string =
        useAcquisitionDateFromSelectedScene();

    /**
     * This custom hook retrieves a list of available imagery scenes that intersect with the map center and were acquired during the input year.
     * It formats these scenes into `FormattedImageryScene[]` format suitable for populating the Calendar component.
     */
    const formattedScenes: FormattedImageryScene[] = useFormattedScenes();

    /**
     * options that will be used to populate the Dropdown Menu for year
     */
    const yearOptions =
        useAcquisitionYearsAsDropdownMenuOptions(acquisitionYear);

    const shouldBeDisabled = useMemo(() => {
        if (!queryParams || isAnimationPlaying) {
            return true;
        }

        // calendar should be disabled when user is viewing change compare layer
        if (mode === 'analysis' && analysisTool === 'change') {
            return isChangeCompareLayerOn;
        }

        return false;
    }, [
        queryParams,
        isAnimationPlaying,
        mode,
        analysisTool,
        isChangeCompareLayerOn,
    ]);

    useEffect(() => {
        // const year = acquisitionDate
        //     ? getYearFromFormattedDateString(acquisitionDate)
        //     : getCurrentYear();

        // setAcquisitionYear(year);

        let year = getCurrentYear();

        if (acquisitionDate) {
            // try to use the year from acquisition date first
            year = getYearFromFormattedDateString(acquisitionDate);
        } else if (
            mode === 'animate' &&
            queryParams?.inheritedAcquisitionYear
        ) {
            // if animation mode, when a new frame is added it won't have acquisition date by default,
            // however, we will want use the acquistion year from the previous frame
            year = queryParams.inheritedAcquisitionYear;
        }

        setAcquisitionYear(year);
    }, [acquisitionDate]);

    return (
        <div
            className={classNames('select-none', {
                'is-disabled': shouldBeDisabled,
            })}
        >
            <div className="text-center mb-2">
                <span className="uppercase text-sm">Scene Selection</span>
            </div>

            <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center flex-grow">
                    <Dropdown
                        data={yearOptions}
                        onChange={(year) => {
                            // select year
                            // dispatch(updateAcquisitionYear(+year));
                            setAcquisitionYear(+year);
                        }}
                    />

                    <AcquisitionDateLabel
                        acquisitionDate={acquisitionDate}
                        closeBtnOnClick={() => {
                            dispatch(updateAcquisitionDate(''));
                        }}
                    />
                </div>

                {APP_NAME === 'landsat' && <LandsatMissionFilter />}

                <CloudFilter
                    cloudCoverage={cloudCoverThreshold}
                    disabled={
                        cloudCoverThreshold === undefined || isAnimationPlaying
                    }
                    onChange={(newValue) => {
                        dispatch(cloudCoverChanged(newValue));
                    }}
                />
            </div>

            <Calendar
                year={acquisitionYear}
                // selectedAcquisitionDate={acquisitionDate}
                selectedAcquisitionDate={selectedAcquisitionDate}
                availableScenes={formattedScenes}
                onSelect={(formattedAcquisitionDate) => {
                    // console.log(formattedAcquisitionDate)
                    dispatch(updateAcquisitionDate(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
