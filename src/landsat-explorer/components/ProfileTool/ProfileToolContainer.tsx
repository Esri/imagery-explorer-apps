import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { ProfileToolControls } from '@shared/components/ProfileToolControls';
// import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    acquisitionMonth4ProfileToolChanged,
    samplingTemporalResolutionChanged,
    temporalProfileDataUpdated,
    spectralIndex4ProfileToolChanged,
    queryLocation4ProfileToolChanged,
} from '@shared/store/Analysis/reducer';
import {
    selectAcquisitionMonth4ProfileTool,
    selectActiveAnalysisTool,
    selectSamplingTemporalResolution,
    selectTemporalProfileData,
    selectQueryLocation4ProfileTool,
    selectSpectralIndex4ProfileTool,
} from '@shared/store/Analysis/selectors';
import { updateTemporalProfileData } from '@shared/store/Analysis/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TemporalProfileChart } from './TemporalProfileChart';
import { updateAcquisitionDate } from '@shared/store/Landsat/thunks';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';
import { centerChanged } from '@shared/store/Map/reducer';
import { batch } from 'react-redux';
import { selectQueryParams4MainScene } from '@shared/store/Landsat/selectors';
import { SpectralIndex } from '@typing/imagery-service';

export const ProfileToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4ProfileTool);

    const temporalProfileData = useSelector(selectTemporalProfileData);

    const spectralIndex = useSelector(selectSpectralIndex4ProfileTool);

    const samplingTemporalResolution = useSelector(
        selectSamplingTemporalResolution
    );

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const [isLoading, setIsLoading] = useState<boolean>();

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
            dispatch(spectralIndex4ProfileToolChanged(spectralIndex));
        }
    }, [queryParams4MainScene?.rasterFunctionName]);

    useEffect(() => {
        (async () => {
            if (tool !== 'profile' || !acquisitionMonth) {
                return;
            }

            try {
                setIsLoading(true);

                await dispatch(updateTemporalProfileData());

                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [queryLocation, tool, acquisitionMonth, samplingTemporalResolution]);

    if (tool !== 'profile') {
        return null;
    }

    return (
        <div className="w-analysis-tool-container-width h-full">
            <AnalysisToolHeader
                title="Profile"
                data={[
                    {
                        value: 'moisture',
                        label: 'moisture index',
                    },
                    {
                        value: 'water',
                        label: 'water index',
                    },
                    {
                        value: 'vegetation',
                        label: 'vegetation index',
                    },
                    {
                        value: 'temperature farhenheit',
                        label: 'surface temp °F',
                    },
                    {
                        value: 'temperature celcius',
                        label: 'surface temp °C',
                    },
                ]}
                selectedSpectralIndex={spectralIndex}
                selectedSpectralIndexOnChange={(val) => {
                    dispatch(spectralIndex4ProfileToolChanged(val));
                }}
                tooltipText={`Select an index to see its values over time. The currently selected scene's time is marked, as a reference.`}
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
                shouldShowCloseButton={
                    temporalProfileData.length > 0 ? true : false
                }
                annualSamplingResolution={samplingTemporalResolution}
                annualSamplingResolutionOnChange={(resolution) => {
                    dispatch(samplingTemporalResolutionChanged(resolution));
                }}
                acquisitionMonthOnChange={(month) => {
                    dispatch(acquisitionMonth4ProfileToolChanged(month));
                }}
                closeButtonOnClick={() => {
                    dispatch(temporalProfileDataUpdated([]));
                    dispatch(queryLocation4ProfileToolChanged(null));
                }}
            />
        </div>
    );
};
