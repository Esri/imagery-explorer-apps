import React, { useEffect, useMemo, useState } from 'react';
import Calendar from './Calendar';
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
import useAvailableScenes from './useAvailableScenes';
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

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const acquisitionDate = queryParams?.acquisitionDate;

    const cloudCoverThreshold = useSelector(selectCloudCover); //queryParams?.cloudCover;

    const isChangeCompareLayerOn = useSelector(selectChangeCompareLayerIsOn);

    const [acquisitionYear, setAcquisitionYear] = useState<number>();

    /**
     * landsat scenes that intersect with the map center
     */
    const { availableScenes } = useAvailableScenes(acquisitionYear);

    /**
     * options that will be used to populate the Dropdown Menu for year
     */
    const yearOptions =
        useAcquisitionYearsAsDropdownMenuOptions(acquisitionYear);

    const selectedAcquisitionDate = useMemo(() => {
        // If the user has not selected a date or there are no available scenes for the query location,
        // then the selected acquisition date should be empty.
        if (!acquisitionDate || !availableScenes.length) {
            return '';
        }

        // Find the scene from the available scenes list that has the acquisition date matching the user-selected acquisition date.
        const sceneAcquiredOnSelectedDate = availableScenes.find(
            (scene) => scene.formattedAcquisitionDate === acquisitionDate
        );

        // Use the acquisition date of the scene that is found to highlight on the calendar.
        // If no scene is found in the available scenes list, the user-selected date won't be highlighted,
        // indicating that they need to select another date to choose a scene.
        // If a scene is found, its acquisition date is returned for highlighting.
        return sceneAcquiredOnSelectedDate?.formattedAcquisitionDate;
    }, [acquisitionDate, availableScenes]);

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

    const getFormattedAvailableScenes = () => {
        if (isAnimationPlaying) {
            return [];
        }

        return availableScenes.map((scene) => {
            const {
                formattedAcquisitionDate,
                acquisitionDate,
                // isCloudy,
                cloudCover,
                satellite,
                formattedCloudCover,
            } = scene;

            return {
                formattedAcquisitionDate,
                acquisitionDate,
                isCloudy: cloudCover > cloudCoverThreshold,
                cloudCover: formattedCloudCover,
                satellite,
            };
        });
    };

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
            queryParams?.acquisitionYearFromPreviousAnimationFrame
        ) {
            // if animation mode, when a new frame is added it won't have acquisition date by default,
            // however, we will want use the acquistion year from the previous frame
            year = queryParams.acquisitionYearFromPreviousAnimationFrame;
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
                availableScenes={getFormattedAvailableScenes()}
                onSelect={(formattedAcquisitionDate) => {
                    // console.log(formattedAcquisitionDate)
                    dispatch(updateAcquisitionDate(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
