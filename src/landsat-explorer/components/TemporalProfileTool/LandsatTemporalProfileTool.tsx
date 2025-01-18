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
import {
    TemporalProfileToolControls,
    TemporalProfileToolHeader,
} from '@shared/components/TemproalProfileTool';
// import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import {
    // acquisitionMonth4TrendToolChanged,
    // // samplingTemporalResolutionChanged,
    // trendToolDataUpdated,
    selectedIndex4TrendToolChanged,
    // queryLocation4TrendToolChanged,
    // trendToolOptionChanged,
    // acquisitionYear4TrendToolChanged,
} from '@shared/store/TrendTool/reducer';
// import {
//     selectAcquisitionMonth4TrendTool,
//     // selectActiveAnalysisTool,
//     // selectSamplingTemporalResolution,
//     selectTrendToolData,
//     selectQueryLocation4TrendTool,
//     selectSelectedIndex4TrendTool,
//     selectAcquisitionYear4TrendTool,
//     selectTrendToolOption,
// } from '@shared/store/TrendTool/selectors';
// import {
//     resetTrendToolData,
//     updateQueryLocation4TrendTool,
//     updateTrendToolData,
// } from '@shared/store/TrendTool/thunks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useSelector } from 'react-redux';
// import {
//     // getFormatedDateString,
//     getMonthFromFormattedDateString,
//     getYearFromFormattedDateString,
// } from '@shared/utils/date-time/formatDateString';
import {
    selectActiveAnalysisTool,
    // selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { SpectralIndex, TemporalProfileData } from '@typing/imagery-service';
// import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { TrendChart } from '.';
// import { batch } from 'react-redux';
// import { debounce } from '@shared/utils/snippets/debounce';
import { useUpdateTemporalProfileToolData } from '@shared/components/TemproalProfileTool/useUpdateTemporalProfileToolData';
import { useSyncSelectedYearAndMonth4TemporalProfileTool } from '@shared/components/TemproalProfileTool/useSyncSelectedYearAndMonth';
import {
    FetchTemporalProfileDataFunc,
    IntersectWithImagerySceneFunc,
} from '@shared/store/TrendTool/thunks';
import { Point } from '@arcgis/core/geometry';
import { intersectWithLandsatScene } from '@shared/services/landsat-level-2/getLandsatScenes';
import { getDataForTrendTool } from '@shared/services/landsat-level-2/getTemporalProfileData';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { selectError4TemporalProfileTool } from '@shared/store/TrendTool/selectors';
import { TEMPROAL_PROFILE_TOOL_TOOLTIP_TEXT } from '@shared/components/TemproalProfileTool/constants';

export const LandsatTemporalProfileTool = () => {
    const dispatch = useAppDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    const { rasterFunctionName, acquisitionDate, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    /**
     * this function will be invoked by the updateTemporalProfileToolData thunk function
     * to check if the query location intersects with the selected landsat scene using the input object ID.
     */
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

    /**
     * this function will be invoked by the updateTemporalProfileToolData thunk function
     * to retrieve the temporal profile data from landsat service
     */
    const fetchTemporalProfileData: FetchTemporalProfileDataFunc = useCallback(
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

    /**
     * This custom hook triggers updateTemporalProfileToolData thunk function to get temporal profile data when query location, acquisition date or other options are changed.
     */
    useUpdateTemporalProfileToolData(
        fetchTemporalProfileData,
        intersectWithImageryScene
    );

    /**
     * This custom hook update the `acquisitionMonth` and `acquisitionMonth` property of the Trend Tool State
     * to keep it in sync with the acquisition date of selected imagery scene
     */
    useSyncSelectedYearAndMonth4TemporalProfileTool();

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
            dispatch(selectedIndex4TrendToolChanged(spectralIndex));
        }
    }, [rasterFunctionName]);

    if (tool !== 'trend') {
        return null;
    }

    return (
        <div className="w-full h-full">
            <TemporalProfileToolHeader
                options={[
                    {
                        value: 'moisture' as SpectralIndex,
                        label: 'moisture',
                    },
                    {
                        value: 'water' as SpectralIndex,
                        label: 'water',
                    },
                    {
                        value: 'vegetation' as SpectralIndex,
                        label: 'vegetation',
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
                tooltipText={TEMPROAL_PROFILE_TOOL_TOOLTIP_TEXT}
            />

            <div className="w-full h-[120px] my-2">
                <TrendChart />
            </div>

            <TemporalProfileToolControls />
        </div>
    );
};
