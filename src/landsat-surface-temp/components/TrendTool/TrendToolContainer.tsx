/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
// import { ProfileToolControls } from '@shared/components/ProfileToolControls';
// import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    acquisitionMonth4TrendToolChanged,
    // samplingTemporalResolutionChanged,
    // trendToolDataUpdated,
    selectedIndex4TrendToolChanged,
    // queryLocation4TrendToolChanged,
    // trendToolOptionChanged,
    acquisitionYear4TrendToolChanged,
} from '@shared/store/TrendTool/reducer';
import {
    selectAcquisitionMonth4TrendTool,
    // selectActiveAnalysisTool,
    // selectSamplingTemporalResolution,
    // selectTrendToolData,
    selectQueryLocation4TrendTool,
    selectSelectedIndex4TrendTool,
    // selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
    // selectIsLoadingData4TrendingTool,
} from '@shared/store/TrendTool/selectors';
import { updateTemporalProfileToolData } from '@shared/store/TrendTool/thunks';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { TemporalProfileChart } from './TrendChart';
// import { updateAcquisitionDate } from '@shared/store/ImageryScene/thunks';
import {
    // getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
// import { centerChanged } from '@shared/store/Map/reducer';
// import { batch } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '@shared/store/ImageryScene/selectors';
import { SpectralIndex, TemporalProfileData } from '@typing/imagery-service';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { TrendChart } from '@landsat-explorer/components/TemporalProfileTool';
import { useUpdateTemporalProfileToolData } from '@shared/components/TemproalProfileTool/useUpdateTemporalProfileToolData';
import { Point } from '@arcgis/core/geometry';
import { getDataForTrendTool } from '@shared/services/landsat-level-2/getTemporalProfileData';
import { intersectWithLandsatScene } from '@shared/services/landsat-level-2/getLandsatScenes';
import { useSyncSelectedYearAndMonth4TemporalProfileTool } from '@shared/components/TemproalProfileTool/useSyncSelectedYearAndMonth';

export const TrendToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    // const queryLocation = useSelector(selectQueryLocation4TrendTool);

    // const acquisitionMonth = useSelector(selectAcquisitionMonth4TrendTool);

    // const acquisitionYear = useSelector(selectAcquisitionYear4TrendTool);

    // const selectedTrendToolOption = useSelector(selectTrendToolOption);

    // const temporalProfileData = useSelector(selectTrendToolData);

    const spectralIndex = useSelector(selectSelectedIndex4TrendTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    // const isLoading = useSelector(selectIsLoadingData4TrendingTool);

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    // const trendToolOption = useSelector(selectTrendToolOption);

    const intersectWithImageryScene = useCallback(
        async (
            queryLocation: Point,
            objectId: number,
            abortController: AbortController
        ) => {
            const res = await intersectWithLandsatScene(
                queryLocation,
                objectId,
                abortController
            );

            return res;
        },
        []
    );

    const fetchTemporalProfileData = useCallback(
        async (
            queryLocation: Point,
            acquisitionMonth: number,
            acquisitionYear: number,
            abortController: AbortController
        ) => {
            // console.log('calling fetchTemporalProfileData for landsat')

            const data: TemporalProfileData[] = await getDataForTrendTool({
                queryLocation,
                acquisitionMonth,
                acquisitionYear,
                abortController,
                missionsToBeExcluded,
            });

            return data;
        },
        [missionsToBeExcluded]
    );

    // useEffect(() => {
    //     if (!queryParams4MainScene?.acquisitionDate) {
    //         return;
    //     }

    //     const month = getMonthFromFormattedDateString(
    //         queryParams4MainScene?.acquisitionDate
    //     );

    //     const year = getYearFromFormattedDateString(
    //         queryParams4MainScene?.acquisitionDate
    //     );

    //     dispatch(acquisitionMonth4TrendToolChanged(month));

    //     dispatch(acquisitionYear4TrendToolChanged(year));
    // }, [queryParams4MainScene?.acquisitionDate]);

    // // triggered when user selects a new acquisition month that will be used to draw the "year-to-year" trend data
    // useEffect(() => {
    //     (async () => {
    //         if (tool !== 'trend') {
    //             return;
    //         }

    //         if (selectedTrendToolOption !== 'year-to-year') {
    //             return;
    //         }

    //         // try {
    //         //     await dispatch(updateTemporalProfileToolData());
    //         // } catch (err) {
    //         //     console.log(err);
    //         // }
    //     })();
    // }, [
    //     queryLocation,
    //     tool,
    //     acquisitionMonth,
    //     selectedTrendToolOption,
    //     missionsToBeExcluded,
    // ]);

    useSyncSelectedYearAndMonth4TemporalProfileTool();

    useUpdateTemporalProfileToolData(
        fetchTemporalProfileData,
        intersectWithImageryScene
    );

    if (tool !== 'trend') {
        return null;
    }

    return (
        <div className="w-[400px] h-full">
            <AnalysisToolHeader
                title="Profile"
                dropdownListOptions={[
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
                        selectedIndex4TrendToolChanged(val as SpectralIndex)
                    );
                }}
                tooltipText={`The least-cloudy scene from the selected month will be sampled across all years of the imagery archive.`}
            />

            <div className="w-full h-[150px] my-2">
                <TrendChart />
            </div>
        </div>
    );
};
