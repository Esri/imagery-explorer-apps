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
    selectActiveAnalysisTool,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
    selectIsLoadingData4SpectralProfileTool,
    selectQueryLocation4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import { updateSpectralProfileData } from '@shared/store/SpectralProfileTool/thunks';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { SpectralProfileChart } from './SpectralProfileChart';
import { findMostSimilarFeatureOfInterest } from './helper';
import { SpectralProfileChartLegend } from './SpectralProfileChartLegend';
import { FeatureOfInterests, SpectralProfileFeatureOfInterest } from './config';
import { useSpectralProfileChartData } from './useSpectralProfileChartData';
import { debounce } from '@shared/utils/snippets/debounce';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';

export const SpectralToolContainer = () => {
    const dispatch = useDispatch();

    const tool = useSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const queryLocation = useSelector(selectQueryLocation4SpectralProfileTool);

    const isLoading = useSelector(selectIsLoadingData4SpectralProfileTool);

    const spectralProfileData = useSelector(selectData4SpectralProfileTool);

    const error4SpectralProfileTool = useSelector(
        selectError4SpectralProfileTool
    );

    const [selectedFeatureOfInterest, setSelectedFeatureOfInterest] =
        useState<SpectralProfileFeatureOfInterest>();

    const chartData = useSpectralProfileChartData(
        spectralProfileData,
        selectedFeatureOfInterest
    );

    const spectralProfileToolMessage = useMemo(() => {
        if (isLoading) {
            return 'fetching spectral profile data';
        }

        if (error4SpectralProfileTool) {
            return error4SpectralProfileTool;
        }

        if (!spectralProfileData.length) {
            return 'Select a scene and click on the map to identify the spectral profile for the point of interest.';
        }

        return '';
    }, [isLoading, error4SpectralProfileTool, spectralProfileData]);

    const shouldShowChart = useMemo(() => {
        if (isLoading || error4SpectralProfileTool) {
            return false;
        }

        if (!spectralProfileData || !spectralProfileData.length) {
            return false;
        }

        return true;
    }, [isLoading, error4SpectralProfileTool, spectralProfileData]);

    const updateSpectralProfileDataDebounced = useCallback(
        debounce(async () => {
            dispatch(updateSpectralProfileData());
        }, 200),
        []
    );

    // triggers when user selects a new query location
    useEffect(() => {
        (async () => {
            if (tool !== 'spectral') {
                return;
            }

            // When the user selects a new acquisition date from the calendar,
            // the currently selected imagery scene is deselected first,
            // followed by the selection of a new scene. These two actions occur sequentially,
            // potentially causing `updateSpectralProfileData` to be called twice in rapid succession,
            // resulting in unnecessary network requests being triggered. To mitigate this issue,
            // we need to debounce the `updateSpectralProfileData` function with a 200 ms delay.
            updateSpectralProfileDataDebounced();
        })();
    }, [queryLocation, objectIdOfSelectedScene]);

    useEffect(() => {
        if (!spectralProfileData || !spectralProfileData.length) {
            return;
        }

        const mostSimilarFeatureOfInterest =
            findMostSimilarFeatureOfInterest(spectralProfileData);

        setSelectedFeatureOfInterest(mostSimilarFeatureOfInterest);
    }, [spectralProfileData]);

    if (tool !== 'spectral') {
        return null;
    }

    return (
        <div
            className={classNames(
                'w-full h-full'
                // {
                //     'is-disabled': !objectIdOfSelectedScene || !queryLocation,
                // }
            )}
        >
            <AnalysisToolHeader
                title="Profile"
                dropdownListOptions={FeatureOfInterests.map(
                    (featureOfInterest) => {
                        return {
                            value: featureOfInterest,
                        };
                    }
                )}
                selectedValue={selectedFeatureOfInterest}
                tooltipText={`The spectral reflectance of different materials on the Earth's surface is variable. Spectral profiles can be used to identify different land cover types.`}
                dropdownMenuSelectedItemOnChange={(val) => {
                    setSelectedFeatureOfInterest(
                        val as SpectralProfileFeatureOfInterest
                    );
                }}
            />

            {shouldShowChart && (
                <>
                    <div className="w-full h-[120px] my-2">
                        <SpectralProfileChart
                            // featureOfInterest={selectedFeatureOfInterest}
                            // data={spectralProfileData}
                            chartData={chartData}
                            bottomAxisTickText={LANDSAT_BAND_NAMES.slice(0, 7)}
                        />
                    </div>

                    <SpectralProfileChartLegend
                        featureOfInterest={selectedFeatureOfInterest}
                    />
                </>
            )}

            {spectralProfileToolMessage && (
                <div className="w-full mt-10 flex justify-center text-center">
                    {isLoading && <calcite-loader inline />}
                    <p className="text-sm opacity-50">
                        {spectralProfileToolMessage}
                    </p>
                </div>
            )}
        </div>
    );
};
