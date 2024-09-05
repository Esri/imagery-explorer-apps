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
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
    selectIsLoadingData4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    SpectralProfileChart,
    SpectralProfileChartLegend,
    LandCoverType,
    useGenerateSpectralProfileChartData,
} from '@shared/components/SpectralProfileTool';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import {
    getFillColorByLandCoverType,
    findMostSimilarLandCoverType,
} from '@shared/components/SpectralProfileTool/helpers';
import { ListOfLandCoverTypes } from '@shared/components/SpectralProfileTool/config';
import { LandsatSpectralProfileData } from './config';
import { Point } from '@arcgis/core/geometry';
import { getLandsatPixelValues } from '@shared/services/landsat-level-2/getLandsatPixelValues';
import { useFetchSpectralProfileToolData } from '@shared/components/SpectralProfileTool/useUpdateSpectralProfileToolData';
import { FetchPixelValuesFuncParams } from '@shared/store/SpectralProfileTool/thunks';

export const SpectralToolContainer = () => {
    const tool = useSelector(selectActiveAnalysisTool);

    const isLoading = useSelector(selectIsLoadingData4SpectralProfileTool);

    const spectralProfileData = useSelector(selectData4SpectralProfileTool);

    const error4SpectralProfileTool = useSelector(
        selectError4SpectralProfileTool
    );

    const [selectedLandCoverType, setSelectedLandCoverType] =
        useState<LandCoverType>();

    const chartData = useGenerateSpectralProfileChartData(
        spectralProfileData,
        LandsatSpectralProfileData[selectedLandCoverType],
        selectedLandCoverType
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

    const fetchLandsatPixelValuesFunc = useCallback(
        async ({
            point,
            objectIds,
            abortController,
        }: FetchPixelValuesFuncParams) => {
            const res: number[] = await getLandsatPixelValues({
                point,
                objectIds,
                abortController,
            });

            return res;
        },
        []
    );

    useFetchSpectralProfileToolData(fetchLandsatPixelValuesFunc);

    useEffect(() => {
        if (!spectralProfileData || !spectralProfileData.length) {
            return;
        }

        const mostSimilarLandCoverType = findMostSimilarLandCoverType(
            spectralProfileData,
            LandsatSpectralProfileData
        );

        setSelectedLandCoverType(mostSimilarLandCoverType);
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
                dropdownListOptions={ListOfLandCoverTypes.map(
                    (landCoverType) => {
                        return {
                            value: landCoverType,
                        };
                    }
                )}
                selectedValue={selectedLandCoverType}
                tooltipText={`The spectral reflectance of different materials on the Earth's surface is variable. Spectral profiles can be used to identify different land cover types.`}
                dropdownMenuSelectedItemOnChange={(val) => {
                    setSelectedLandCoverType(val as LandCoverType);
                }}
            />

            {shouldShowChart && (
                <>
                    <div className="w-full h-[120px] my-2">
                        <SpectralProfileChart
                            chartData={chartData}
                            bottomAxisTickText={LANDSAT_BAND_NAMES.slice(0, 7)}
                        />
                    </div>

                    <SpectralProfileChartLegend
                        featureOfInterestName={selectedLandCoverType}
                        featureOfInterestFillColor={getFillColorByLandCoverType(
                            selectedLandCoverType
                        )}
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
