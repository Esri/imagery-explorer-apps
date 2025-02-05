import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import React, { FC, useMemo, useState } from 'react';
import { LandCoverType, SpectralProfileDataByLandCoverType } from '../config';
import { useGenerateSpectralProfileChartData } from '../useGenerateSpectralProfileChartData';
import {
    formatBandValuesAsLineChartDataItems,
    getFillColorByLandCoverType,
} from '../helpers';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { ExpandedSpectralProfileChart } from './ExpandedSpectralProfileChart';
import { ExpandedSpectralProfileChartLegend } from './ExpandedSpectralProfileChartLegend';
import { CloseButton } from '@shared/components/CloseButton';

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
    /**
     * Emit when the close button is clicked
     * @returns void
     */
    closeButtonClickHandler: () => void;
};

export const ExpandedSpectralProfileChartContainer: FC<Props> = ({
    spectralProfileDataByLandCoverTypes,
    bandNames,
    closeButtonClickHandler,
}) => {
    const spectralProfileData = useAppSelector(selectData4SpectralProfileTool);

    const [selectedLandCoverType, setSelectedLandCoverType] =
        useState<LandCoverType>();

    const chartData = useMemo(() => {
        if (
            !spectralProfileData?.length ||
            !spectralProfileDataByLandCoverTypes
        ) {
            return [];
        }

        const output: LineGroupData[] = Object.keys(
            spectralProfileDataByLandCoverTypes
        ).map((landCoverType: LandCoverType) => {
            const bandValuesFromSelectedLandCoverType =
                spectralProfileDataByLandCoverTypes[landCoverType];

            const length = Math.min(
                spectralProfileData.length,
                bandValuesFromSelectedLandCoverType.length
            );

            const lineChartData4SelectedLandCoverType =
                formatBandValuesAsLineChartDataItems({
                    bandValues: bandValuesFromSelectedLandCoverType,
                    title: landCoverType,
                    length,
                });

            return {
                fill: getFillColorByLandCoverType(landCoverType), //'var(--custom-light-blue-70)',
                key: landCoverType,
                values: lineChartData4SelectedLandCoverType,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData;
        });

        return output;
    }, [spectralProfileData, selectedLandCoverType]);

    if (!chartData.length) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-custom-background-90 z-50 flex items-center justify-center">
            <CloseButton onClick={closeButtonClickHandler} />

            <div className="flex items-center justify-center w-4/5 max-w-7xl h-[400px]">
                <div className="flex-grow w-3/4 h-full">
                    <ExpandedSpectralProfileChart
                        chartData={chartData}
                        bottomAxisTickText={bandNames}
                    />
                </div>

                <div className="w-1/4 h-full shrink-0">
                    <ExpandedSpectralProfileChartLegend />
                </div>
            </div>
        </div>
    );
};
