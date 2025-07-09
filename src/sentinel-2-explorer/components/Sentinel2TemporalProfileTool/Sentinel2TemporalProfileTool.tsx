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
import {
    TemporalProfileToolControls,
    TemporalProfileToolHeader,
} from '@shared/components/TemproalProfileTool';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { SpectralIndex, TemporalProfileData } from '@typing/imagery-service';
import { useUpdateTemporalProfileToolData } from '@shared/components/TemproalProfileTool/useUpdateTemporalProfileToolData';
import { useSyncSelectedYearAndMonth4TemporalProfileTool } from '@shared/components/TemproalProfileTool/useSyncSelectedYearAndMonth';
import {
    FetchTemporalProfileDataFunc,
    IntersectWithImagerySceneFunc,
} from '@shared/store/TrendTool/thunks';
import Point from '@arcgis/core/geometry/Point';
import { selectError4TemporalProfileTool } from '@shared/store/TrendTool/selectors';
import { selectSentinel1OrbitDirection } from '@shared/store/Sentinel1/selectors';
import { Sentinel2TemporalProfileChart } from './Sentinel2TemporalProfileChart';
import { intersectWithSentinel2Scene } from '@shared/services/sentinel-2/getSentinel2Scenes';
import { getSentinel2TemporalProfileData } from '@shared/services/sentinel-2/getSentinel2TemporalProfileData';
// import { TEMPROAL_PROFILE_TOOL_TOOLTIP_TEXT } from '@shared/components/TemproalProfileTool/constants';
import { useTranslation } from 'react-i18next';

export const Sentinel2TemporalProfileTool = () => {
    const tool = useAppSelector(selectActiveAnalysisTool);

    const { t } = useTranslation();

    /**
     * this function will be invoked by the updateTemporalProfileToolData thunk function
     * to check if the query location intersects with the selected sentinel-2 scene using the input object ID.
     */
    const intersectWithImageryScene: IntersectWithImagerySceneFunc =
        useCallback(
            async (
                queryLocation: Point,
                objectId: number,
                abortController: AbortController
            ) => {
                const res = await intersectWithSentinel2Scene(
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
     * to retrieve the temporal profile data from sentinel-2 service
     */
    const fetchTemporalProfileData: FetchTemporalProfileDataFunc = useCallback(
        async (
            queryLocation: Point,
            acquisitionMonth: number,
            acquisitionYear: number,
            abortController: AbortController
        ) => {
            const data: TemporalProfileData[] =
                await getSentinel2TemporalProfileData({
                    queryLocation,
                    acquisitionMonth,
                    acquisitionYear,
                    abortController,
                });
            console.log(
                'calling fetchTemporalProfileData for sentinel-2',
                data
            );
            return data;
        },
        []
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
                        value: 'moisture' as SpectralIndex,
                        label: t('moisture'),
                    },
                    {
                        value: 'water' as SpectralIndex,
                        label: t('water'),
                    },
                    {
                        value: 'vegetation' as SpectralIndex,
                        label: t('vegetation'),
                    },
                ]}
                tooltipText={t('temporal_profile_tooltip')}
            />

            <div className="w-full h-[120px] my-2">
                <Sentinel2TemporalProfileChart />
            </div>

            <TemporalProfileToolControls />
        </div>
    );
};
