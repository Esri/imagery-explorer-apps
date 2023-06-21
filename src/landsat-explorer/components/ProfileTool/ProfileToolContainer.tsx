import { BarLineCombined } from '@shared/components/QuickD3Chart';
import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    selectAcquisitionMonth4ProfileTool,
    selectActiveAnalysisTool,
    selectProfileData,
    selectQueryLocation4ProfileTool,
} from '@shared/store/Analysis/selectors';
import { updateProfileData } from '@shared/store/Analysis/thunks';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const ProfileToolContainer = () => {
    const dispacth = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const queryLocation = useSelector(selectQueryLocation4ProfileTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4ProfileTool);

    const profileData = useSelector(selectProfileData);

    const [isLoading, setIsLoading] = useState<boolean>();

    const getLineChart = () => {
        if (!profileData.length) {
            return null;
        }

        const data = profileData.map((d) => {
            const [B1, B2, B3, B4, B5] = d.values;

            return {
                key: d.acquisitionYear.toString(),
                value: (B5 - B4) / (B5 + B4),
            };
        });

        console.log(data);

        return (
            <div className="relative w-full h-[120px]">
                <BarLineCombined
                    data4Line={data}
                    yDomain={[-1, 1]}
                    numOfTicksOnXAxisToHide={2}
                />
            </div>
        );
    };

    useEffect(() => {
        (async () => {
            if (tool !== 'profile') {
                return;
            }

            try {
                setIsLoading(true);

                await dispacth(updateProfileData());

                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [queryLocation, tool, acquisitionMonth]);

    if (tool !== 'profile') {
        return null;
    }

    return (
        <div className="w-analysis-tool-container-width h-full">
            {isLoading && <span>loading data...</span>}
            {getLineChart()}
        </div>
    );
};
