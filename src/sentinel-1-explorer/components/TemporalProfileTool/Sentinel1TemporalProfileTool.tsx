/* Copyright 2025 Esri
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
// import {
//     // acquisitionMonth4TrendToolChanged,
//     // // samplingTemporalResolutionChanged,
//     // trendToolDataUpdated,
//     selectedIndex4TrendToolChanged,
//     // queryLocation4TrendToolChanged,
//     // trendToolOptionChanged,
//     // acquisitionYear4TrendToolChanged,
// } from '@shared/store/TrendTool/reducer';
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
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import {
    RadarIndex,
    SpectralIndex,
    TemporalProfileData,
} from '@typing/imagery-service';
import { useUpdateTemporalProfileToolData } from '@shared/components/TemproalProfileTool/useUpdateTemporalProfileToolData';
import { useSyncSelectedYearAndMonth4TemporalProfileTool } from '@shared/components/TemproalProfileTool/useSyncSelectedYearAndMonth';
import {
    FetchTemporalProfileDataFunc,
    IntersectWithImagerySceneFunc,
} from '@shared/store/TrendTool/thunks';
import Point from '@arcgis/core/geometry/Point';
import { selectError4TemporalProfileTool } from '@shared/store/TrendTool/selectors';
import { intersectWithSentinel1Scene } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { getSentinel1TemporalProfileData } from '@shared/services/sentinel-1/getTemporalProfileData';
import { selectSentinel1OrbitDirection } from '@shared/store/Sentinel1/selectors';
import { Sentinel1TemporalProfileChart } from './Sentinel1TemporalProfileChart';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

export const Sentinel1TemporalProfileTool = () => {
    // const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const tool = useAppSelector(selectActiveAnalysisTool);

    // const orbitDirection = useAppSelector(selectSentinel1OrbitDirection);

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    // const error = useAppSelector(selectError4TemporalProfileTool);

    /**
     * this function will be invoked by the updateTemporalProfileToolData thunk function
     * to check if the query location intersects with the selected sentinel-1 scene using the input object ID.
     */
    const intersectWithImageryScene: IntersectWithImagerySceneFunc =
        useCallback(
            async (
                queryLocation: Point,
                objectId: number,
                abortController: AbortController
            ) => {
                const res = await intersectWithSentinel1Scene(
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
     * to retrieve the temporal profile data from sentinel-1 service
     */
    const fetchTemporalProfileData: FetchTemporalProfileDataFunc = useCallback(
        async (
            queryLocation: Point,
            acquisitionMonth: number,
            acquisitionYear: number,
            abortController: AbortController
        ) => {
            const data: TemporalProfileData[] =
                await getSentinel1TemporalProfileData({
                    queryLocation,
                    objectId: objectIdOfSelectedScene,
                    acquisitionMonth,
                    acquisitionYear,
                    abortController,
                });

            return data;
        },
        [objectIdOfSelectedScene]
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

    if (tool !== 'trend') {
        return null;
    }

    return (
        <div className="w-full h-full">
            <TemporalProfileToolHeader
                options={[
                    {
                        value: 'water' as RadarIndex,
                        label: t('water'),
                    },
                    {
                        value: 'water anomaly' as RadarIndex,
                        label: t('water_anomaly'),
                    },
                ]}
                tooltipText={t('temproal_profile_header_tooltip', {
                    ns: APP_NAME,
                })}
            />

            <div className="w-full h-[120px] my-2">
                <Sentinel1TemporalProfileChart />
            </div>

            <TemporalProfileToolControls />
        </div>
    );
};
