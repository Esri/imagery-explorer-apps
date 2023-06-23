import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { ProfileToolControls } from '@shared/components/ProfileTool';
import { BarLineCombined } from '@shared/components/QuickD3Chart';
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
    selectProfileData,
    selectQueryLocation4ProfileTool,
    selectSpectralIndex4ProfileTool,
} from '@shared/store/Analysis/selectors';
import { updateTemporalProfileData } from '@shared/store/Analysis/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ProfileToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4ProfileTool);

    const profileData = useSelector(selectProfileData);

    const spectralIndex = useSelector(selectSpectralIndex4ProfileTool);

    const samplingTemporalResolution = useSelector(
        selectSamplingTemporalResolution
    );

    const [isLoading, setIsLoading] = useState<boolean>();

    const getLineChart = () => {
        if (!profileData.length || isLoading) {
            return (
                <div className="h-full w-full flex items-center justify-center text-center">
                    {isLoading && <calcite-loader inline />}
                    <p className="text-sm">
                        {isLoading
                            ? 'fetching temporal profile data'
                            : 'Click on map to get the temporal profile'}
                    </p>
                </div>
            );
        }

        const data = profileData.map((d) => {
            const [B1, B2, B3, B4, B5, B6] = d.values;

            let value = 0;

            if (spectralIndex === 'moisture') {
                value = (B5 - B6) / (B5 + B6);
            } else if (spectralIndex === 'vegetation') {
                value = (B5 - B4) / (B5 + B4);
            } else if (spectralIndex === 'urban') {
                value = (B6 - B5) / (B6 + B5);
            }

            return {
                key: d.acquisitionYear.toString(),
                value,
            };
        });

        // console.log(data);

        return <BarLineCombined data4Line={data} yDomain={[-1, 1]} />;
    };

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
                        value: 'urban',
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
            />

            <div className="relative w-full h-[120px] my-2">
                {getLineChart()}
            </div>

            <ProfileToolControls
                acquisitionMonth={acquisitionMonth}
                shouldShowCloseButton={profileData.length > 0 ? true : false}
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
