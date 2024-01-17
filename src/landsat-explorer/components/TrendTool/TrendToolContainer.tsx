import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { ProfileToolControls } from '@shared/components/ProfileToolControls';
// import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    acquisitionMonth4TrendToolChanged,
    // samplingTemporalResolutionChanged,
    trendToolDataUpdated,
    spectralIndex4TrendToolChanged,
    queryLocation4TrendToolChanged,
    trendToolOptionChanged,
    acquisitionYear4TrendToolChanged,
} from '@shared/store/TrendTool/reducer';
import {
    selectAcquisitionMonth4TrendTool,
    // selectActiveAnalysisTool,
    // selectSamplingTemporalResolution,
    selectTrendToolData,
    selectQueryLocation4TrendTool,
    selectSpectralIndex4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
} from '@shared/store/TrendTool/selectors';
import { updateTrendToolData } from '@shared/store/TrendTool/thunks';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    // getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { TrendChart } from '.';

export const TrendToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4TrendTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4TrendTool);

    const acquisitionYear = useSelector(selectAcquisitionYear4TrendTool);

    const selectedTrendToolOption = useSelector(selectTrendToolOption);

    const temporalProfileData = useSelector(selectTrendToolData);

    const spectralIndex = useSelector(selectSpectralIndex4TrendTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    useEffect(() => {
        if (!queryParams4MainScene?.rasterFunctionName) {
            return;
        }

        // when user selects a different renderer for the selected landsat scene,
        // we want to try to sync the selected spectral index for the profile tool because
        // that is probably what the user is interested in seeing
        let spectralIndex: SpectralIndex = null;

        if (/Temperature/i.test(queryParams4MainScene?.rasterFunctionName)) {
            spectralIndex = 'temperature farhenheit';
        } else if (/NDVI/.test(queryParams4MainScene?.rasterFunctionName)) {
            spectralIndex = 'vegetation';
        }

        if (spectralIndex) {
            dispatch(spectralIndex4TrendToolChanged(spectralIndex));
        }
    }, [queryParams4MainScene?.rasterFunctionName]);

    useEffect(() => {
        if (!queryParams4MainScene?.acquisitionDate) {
            return;
        }

        const month = getMonthFromFormattedDateString(
            queryParams4MainScene?.acquisitionDate
        );

        const year = getYearFromFormattedDateString(
            queryParams4MainScene?.acquisitionDate
        );

        dispatch(acquisitionMonth4TrendToolChanged(month));

        dispatch(acquisitionYear4TrendToolChanged(year));
    }, [queryParams4MainScene?.acquisitionDate]);

    // triggered when user selects a new acquisition month that will be used to draw the "year-to-year" trend data
    useEffect(() => {
        (async () => {
            if (tool !== 'trend') {
                return;
            }

            if (selectedTrendToolOption !== 'year-to-year') {
                return;
            }

            try {
                await dispatch(updateTrendToolData());
            } catch (err) {
                console.log(err);
            }
        })();
    }, [
        queryLocation,
        tool,
        acquisitionMonth,
        selectedTrendToolOption,
        missionsToBeExcluded,
    ]);

    // triggered when user selects a new acquisition year that will be used to draw the "month-to-month" trend data
    useEffect(() => {
        (async () => {
            if (tool !== 'trend') {
                return;
            }

            if (selectedTrendToolOption !== 'month-to-month') {
                return;
            }

            try {
                await dispatch(updateTrendToolData());
            } catch (err) {
                console.log(err);
            }
        })();
    }, [queryLocation, tool, acquisitionYear, selectedTrendToolOption]);

    if (tool !== 'trend') {
        return null;
    }

    return (
        <div className="w-full h-full">
            <AnalysisToolHeader
                title="Trend"
                dropdownListOptions={[
                    {
                        value: 'moisture' as SpectralIndex,
                        label: 'moisture index',
                    },
                    {
                        value: 'water' as SpectralIndex,
                        label: 'water index',
                    },
                    {
                        value: 'vegetation' as SpectralIndex,
                        label: 'vegetation index',
                    },
                    {
                        value: 'temperature farhenheit' as SpectralIndex,
                        label: 'surface temp °F',
                    },
                    {
                        value: 'temperature celcius' as SpectralIndex,
                        label: 'surface temp °C',
                    },
                ]}
                selectedValue={spectralIndex}
                dropdownMenuSelectedItemOnChange={(val) => {
                    dispatch(
                        spectralIndex4TrendToolChanged(val as SpectralIndex)
                    );
                }}
                tooltipText={`The least cloudy scenes from the selected time interval will be sampled to show a temporal trend for the selected point and category.`}
            />

            <div className="w-full h-[120px] my-2">
                <TrendChart />
            </div>

            <ProfileToolControls
                acquisitionMonth={acquisitionMonth}
                acquisitionYear={acquisitionYear}
                selectedTrendOption={selectedTrendToolOption}
                shouldShowCloseButton={
                    temporalProfileData.length > 0 ? true : false
                }
                trendOptionOnChange={(data) => {
                    dispatch(trendToolOptionChanged(data));
                }}
                acquisitionMonthOnChange={(month) => {
                    dispatch(acquisitionMonth4TrendToolChanged(month));
                }}
                acquisitionYearOnChange={(year) => {
                    dispatch(acquisitionYear4TrendToolChanged(year));
                }}
                closeButtonOnClick={() => {
                    dispatch(trendToolDataUpdated([]));
                    dispatch(queryLocation4TrendToolChanged(null));
                }}
            />
        </div>
    );
};
