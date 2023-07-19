import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { ProfileToolControls } from '@shared/components/ProfileTool';
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

    const [isLoading, setIsLoading] = useState<boolean>();

    useEffect(() => {
        (async () => {
            if (tool !== 'profile') {
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
                title="Profile Index"
                data={[
                    {
                        value: 'moisture',
                        label: '',
                    },
                    {
                        value: 'water',
                        label: '',
                    },
                    {
                        value: 'vegetation',
                        label: '',
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
