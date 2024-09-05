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
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LandCoverType } from '@shared/components/SpectralProfileTool';
import {
    getFillColorByLandCoverType,
    findMostSimilarLandCoverType,
} from '@shared/components/SpectralProfileTool/helpers';
import {
    ListOfLandCoverTypes,
    SpectralProfileDataByLandCoverType,
} from '@shared/components/SpectralProfileTool/config';
import { useGenerateSpectralProfileChartData } from './useGenerateSpectralProfileChartData';
import { SpectralProfileChartLegend } from './SpectralProfileChartLegend';
import { SpectralProfileToolMessage } from './SpectralProfileToolMessage';
import { SpectralProfileChart } from './SpectralProfileChart';

type Props = {
    /**
     * A lookup table containing spectral profile data for various land cover types.
     */
    spectralProfileDataByLandCoverTypes: SpectralProfileDataByLandCoverType;
    /**
     * A list of descriptive names for each spectral band. These names will be
     * used as labels for the bottom axis of the chart.
     */
    bandNames: string[];
};

export const SpectralProfileToolContainer: FC<Props> = ({
    spectralProfileDataByLandCoverTypes,
    bandNames,
}) => {
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
        spectralProfileDataByLandCoverTypes,
        selectedLandCoverType
    );

    const shouldShowChart = useMemo(() => {
        if (isLoading || error4SpectralProfileTool) {
            return false;
        }

        if (!spectralProfileData || !spectralProfileData.length) {
            return false;
        }

        return true;
    }, [isLoading, error4SpectralProfileTool, spectralProfileData]);

    useEffect(() => {
        if (!spectralProfileData || !spectralProfileData.length) {
            return;
        }

        const mostSimilarLandCoverType = findMostSimilarLandCoverType(
            spectralProfileData,
            spectralProfileDataByLandCoverTypes
        );

        setSelectedLandCoverType(mostSimilarLandCoverType);
    }, [spectralProfileData]);

    if (tool !== 'spectral') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
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
                            bottomAxisTickText={bandNames}
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

            <SpectralProfileToolMessage />
        </div>
    );
};
