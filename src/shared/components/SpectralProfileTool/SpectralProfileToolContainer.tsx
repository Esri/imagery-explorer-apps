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
import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
    selectIsLoadingData4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import classNames from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
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
import { ExpandedSpectralProfileChart } from './ExpandedChart';
import { set } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { CalciteIcon } from '@esri/calcite-components-react';

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
    const tool = useAppSelector(selectActiveAnalysisTool);

    const isLoading = useAppSelector(selectIsLoadingData4SpectralProfileTool);

    const spectralProfileData = useAppSelector(selectData4SpectralProfileTool);

    const error4SpectralProfileTool = useAppSelector(
        selectError4SpectralProfileTool
    );

    const [selectedLandCoverType, setSelectedLandCoverType] =
        useState<LandCoverType>();

    const [showExpandedChart, setShowExpandedChart] = useState(false);

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

    const { t } = useTranslation();

    if (tool !== 'spectral') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            <AnalysisToolHeader
                title={t('spectral_profile')}
                dropdownListOptions={ListOfLandCoverTypes.map(
                    (landCoverType) => {
                        return {
                            value: landCoverType,
                            label: t(landCoverType),
                        };
                    }
                )}
                selectedValue={selectedLandCoverType}
                tooltipText={t('spectral_profile_info')}
                dropdownMenuSelectedItemOnChange={(val) => {
                    setSelectedLandCoverType(val as LandCoverType);
                }}
            >
                <CalciteIcon
                    icon="zoom-out-fixed"
                    scale="s"
                    class={classNames('ml-1 cursor-pointer', {
                        'is-disabled':
                            !spectralProfileData ||
                            !spectralProfileData?.length,
                    })}
                    onClick={setShowExpandedChart.bind(null, true)}
                />
            </AnalysisToolHeader>

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

            {showExpandedChart && (
                <ExpandedSpectralProfileChart
                    spectralProfileDataByLandCoverTypes={
                        spectralProfileDataByLandCoverTypes
                    }
                    bandNames={bandNames}
                    closeButtonClickHandler={setShowExpandedChart.bind(
                        null,
                        false
                    )}
                />
            )}

            <SpectralProfileToolMessage />
        </div>
    );
};
