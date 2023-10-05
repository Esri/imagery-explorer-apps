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
    selectAcquisitionMonth4ProfileTool,
    // selectActiveAnalysisTool,
    // selectSamplingTemporalResolution,
    selectTemporalProfileData,
    selectQueryLocation4ProfileTool,
    selectSpectralIndex4ProfileTool,
    selectAcquisitionYear4ProfileTool,
    selectTrendToolOption,
    selectIsLoadingData4TrendingTool,
} from '@shared/store/TrendTool/selectors';
import { updateTrendToolData } from '@shared/store/TrendTool/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TemporalProfileChart } from './TrendChart';
import { updateAcquisitionDate } from '@shared/store/Landsat/thunks';
import {
    // getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import { centerChanged } from '@shared/store/Map/reducer';
import { batch } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '@shared/store/Landsat/selectors';
import { SpectralIndex } from '@typing/imagery-service';

export const TrendToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4ProfileTool);

    const acquisitionYear = useSelector(selectAcquisitionYear4ProfileTool);

    const selectedTrendToolOption = useSelector(selectTrendToolOption);

    const temporalProfileData = useSelector(selectTemporalProfileData);

    const spectralIndex = useSelector(selectSpectralIndex4ProfileTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const isLoading = useSelector(selectIsLoadingData4TrendingTool);

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
    }, [queryLocation, tool, acquisitionMonth, selectedTrendToolOption]);

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
        <div className="w-analysis-tool-container-width h-full">
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
                tooltipText={`The least-cloudy scene from the selected month will be sampled across all years of the imagery archive.`}
            />

            <div className="w-full h-[120px] my-2">
                {!temporalProfileData.length || isLoading ? (
                    <div className="h-full w-full flex items-center justify-center text-center">
                        {isLoading && <calcite-loader inline />}
                        <p className="text-sm opacity-80">
                            {isLoading
                                ? 'fetching temporal profile data'
                                : 'Click on map to get the temporal profile'}
                        </p>
                    </div>
                ) : (
                    <TemporalProfileChart
                        data={temporalProfileData}
                        spectralIndex={spectralIndex}
                        onClickHandler={(index) => {
                            // select user clicked temporal profile chart data element
                            const clickedDataItem = temporalProfileData[index];

                            if (!clickedDataItem) {
                                return;
                            }

                            // use has selected a acquisition date from the temporal profile chart,
                            // to find and display the landsat scene that was acquired on use selected date
                            // at the query location, we will need to update both of them
                            batch(() => {
                                dispatch(
                                    centerChanged([
                                        queryLocation.x,
                                        queryLocation.y,
                                    ])
                                );

                                dispatch(
                                    updateAcquisitionDate(
                                        clickedDataItem.formattedAcquisitionDate
                                    )
                                );
                            });
                        }}
                    />
                )}
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
