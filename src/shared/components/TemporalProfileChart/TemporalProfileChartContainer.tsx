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
    selectTrendToolData,
    selectQueryLocation4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
    selectIsLoadingData4TrendingTool,
    selectError4TemporalProfileTool,
} from '@shared/store/TrendTool/selectors';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { TemporalProfileChart } from './TemporalProfileChart';
import {
    updateAcquisitionDate,
    updateObjectIdOfSelectedScene,
} from '@shared/store/ImageryScene/thunks';

import { centerChanged } from '@shared/store/Map/reducer';
import { selectQueryParams4MainScene } from '@shared/store/ImageryScene/selectors';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * data that will be used to plot the Line chart for the Temporal Profile Tool
     */
    chartData: LineChartDataItem[];
    /**
     * custom domain for the Y-Scale of the Line chart
     */
    customDomain4YScale: number[];
};

export const TemporalProfileChartContainer: FC<Props> = ({
    chartData,
    customDomain4YScale,
}) => {
    const dispatch = useAppDispatch();

    const queryLocation = useAppSelector(selectQueryLocation4TrendTool);

    const acquisitionYear = useAppSelector(selectAcquisitionYear4TrendTool);

    const temporalProfileData = useAppSelector(selectTrendToolData);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const trendToolOption = useAppSelector(selectTrendToolOption);

    const isLoading = useAppSelector(selectIsLoadingData4TrendingTool);

    const error = useAppSelector(selectError4TemporalProfileTool);

    const { t } = useTranslation();

    const message = useMemo(() => {
        if (isLoading) {
            return t('fetching_temporal_profile_data');
        }

        if (!temporalProfileData.length) {
            return t('select_scene_and_click_location');
        }

        return '';
    }, [temporalProfileData, isLoading]);

    if (message) {
        return (
            <div className="h-full w-full flex items-center justify-center text-center">
                {isLoading && <calcite-loader inline />}
                <p className="text-sm opacity-50">{message}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center pt-8">
                <span className="opacity-50 text-sm">{error}</span>
            </div>
        );
    }

    return (
        <TemporalProfileChart
            chartData={chartData}
            customDomain4YScale={customDomain4YScale}
            trendToolOption={trendToolOption}
            acquisitionYear={acquisitionYear}
            selectedAcquisitionDate={queryParams4MainScene?.acquisitionDate}
            onClickHandler={(index) => {
                // select user clicked temporal profile chart data element
                const clickedDataItem = temporalProfileData[index];

                if (!clickedDataItem) {
                    return;
                }

                // update the center of the map using user selected query location to
                // invoke query that fetches the landsat scenes that intersects with the query location
                dispatch(centerChanged([queryLocation.x, queryLocation.y]));

                // unselect the selected imagery scene so that a new scene can be selected
                dispatch(updateObjectIdOfSelectedScene(null));

                dispatch(
                    updateAcquisitionDate(
                        clickedDataItem.formattedAcquisitionDate,
                        true
                    )
                );
            }}
        />
    );
};
