import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { TrendToolControls } from '@shared/components/TrendToolControls';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { TrendChart } from '.';
import { batch } from 'react-redux';
import { debounce } from '@shared/utils/snippets/debounce';

export const TrendToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4TrendTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4TrendTool);

    const acquisitionYear = useSelector(selectAcquisitionYear4TrendTool);

    const selectedTrendToolOption = useSelector(selectTrendToolOption);

    const temporalProfileData = useSelector(selectTrendToolData);

    const spectralIndex = useSelector(selectSpectralIndex4TrendTool);

    const { rasterFunctionName, acquisitionDate, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    const updateTrendToolDataDebounced = useCallback(
        debounce(async () => {
            await dispatch(updateTrendToolData());
        }, 200),
        []
    );

    useEffect(() => {
        if (rasterFunctionName) {
            return;
        }

        // when user selects a different renderer for the selected landsat scene,
        // we want to try to sync the selected spectral index for the profile tool because
        // that is probably what the user is interested in seeing
        let spectralIndex: SpectralIndex = null;

        if (/Temperature/i.test(rasterFunctionName)) {
            spectralIndex = 'temperature farhenheit';
        } else if (/NDVI/.test(rasterFunctionName)) {
            spectralIndex = 'vegetation';
        }

        if (spectralIndex) {
            dispatch(spectralIndex4TrendToolChanged(spectralIndex));
        }
    }, [rasterFunctionName]);

    useEffect(() => {
        if (!acquisitionDate) {
            return;
        }

        const month = getMonthFromFormattedDateString(acquisitionDate);

        const year = getYearFromFormattedDateString(acquisitionDate);

        batch(() => {
            dispatch(acquisitionMonth4TrendToolChanged(month));
            dispatch(acquisitionYear4TrendToolChanged(year));
        });
    }, [acquisitionDate]);

    // triggered when user selects a new acquisition month that will be used to draw the "year-to-year" trend data
    useEffect(() => {
        (async () => {
            if (tool !== 'trend') {
                return;
            }

            // console.log('calling updateTrendToolData')
            updateTrendToolDataDebounced();
        })();
    }, [
        queryLocation,
        tool,
        acquisitionMonth,
        acquisitionYear,
        selectedTrendToolOption,
        missionsToBeExcluded,
        objectIdOfSelectedScene,
    ]);

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

            <TrendToolControls
                acquisitionMonth={acquisitionMonth}
                acquisitionYear={acquisitionYear}
                selectedTrendOption={selectedTrendToolOption}
                shouldShowCloseButton={
                    temporalProfileData.length > 0 ? true : false
                }
                trendOptionOnChange={(data) => {
                    dispatch(trendToolOptionChanged(data));
                }}
                // acquisitionMonthOnChange={(month) => {
                //     dispatch(acquisitionMonth4TrendToolChanged(month));
                // }}
                // acquisitionYearOnChange={(year) => {
                //     dispatch(acquisitionYear4TrendToolChanged(year));
                // }}
                closeButtonOnClick={() => {
                    dispatch(trendToolDataUpdated([]));
                    dispatch(queryLocation4TrendToolChanged(null));
                }}
            />
        </div>
    );
};
