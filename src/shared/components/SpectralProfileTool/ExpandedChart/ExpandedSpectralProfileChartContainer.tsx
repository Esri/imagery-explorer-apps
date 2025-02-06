import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import React, { FC, useMemo, useState } from 'react';
import {
    LandCoverType,
    ListOfLandCoverTypes,
    SpectralProfileDataByLandCoverType,
} from '../config';
import {
    formatBandValuesAsLineChartDataItems,
    getFillColorByLandCoverType,
} from '../helpers';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { ExpandedSpectralProfileChart } from './ExpandedSpectralProfileChart';
import { ExpandedSpectralProfileChartLegend } from './ExpandedSpectralProfileChartLegend';
import { CloseButton } from '@shared/components/CloseButton';
import { ExpandedSpectralProfileChartHeader } from './ExpandedSpectralProfileChartHeader';

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

    const [excludedLandCoverTypes, setExcludedLandCoverTypes] = useState<
        Set<LandCoverType>
    >(new Set());

    const [landCoverTypeOnHover, setLandCoverTypeOnHover] =
        useState<LandCoverType | null>(null);

    const toggleExcludedLandCoverType = (type: LandCoverType) => {
        setExcludedLandCoverTypes((prev) => {
            const newSet = new Set(prev);

            if (newSet.has(type)) {
                newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    const chartData = useMemo(() => {
        if (
            !spectralProfileData?.length ||
            !spectralProfileDataByLandCoverTypes
        ) {
            return [];
        }

        const length = Math.min(
            spectralProfileData.length,
            spectralProfileDataByLandCoverTypes.Cloud.length
        );

        const output: LineGroupData[] = ListOfLandCoverTypes.filter(
            (landCoverType) => !excludedLandCoverTypes.has(landCoverType)
        ).map((landCoverType: LandCoverType) => {
            const bandValuesFromSelectedLandCoverType =
                spectralProfileDataByLandCoverTypes[landCoverType];

            const lineChartData4SelectedLandCoverType =
                formatBandValuesAsLineChartDataItems({
                    bandValues: bandValuesFromSelectedLandCoverType,
                    title: landCoverType,
                    length,
                });

            const opacity =
                landCoverTypeOnHover && landCoverTypeOnHover !== landCoverType
                    ? 0.25
                    : 1;

            return {
                fill: getFillColorByLandCoverType(landCoverType, opacity), //'var(--custom-light-blue-70)',
                key: landCoverType,
                values: lineChartData4SelectedLandCoverType,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData;
        });

        const lineChartData4SelectedLocation =
            formatBandValuesAsLineChartDataItems({
                bandValues: spectralProfileData,
                title: 'Selected Value',
                length,
            });

        output.push({
            fill: '#fff',
            key: 'selected-location',
            values: lineChartData4SelectedLocation,
        } as LineGroupData);

        return output;
    }, [spectralProfileData, excludedLandCoverTypes, landCoverTypeOnHover]);

    if (!chartData.length) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-custom-background-90 z-50 flex items-center justify-center">
            <CloseButton onClick={closeButtonClickHandler} />

            <div className="mx-auto w-4/5 max-w-7xl overflow-x-auto fancy-scrollbar">
                <div className="w-full flex items-center">
                    <div className="flex-grow w-3/4 min-w-[500px] pb-4 h-full">
                        <div className="w-full mb-8">
                            <ExpandedSpectralProfileChartHeader />
                        </div>

                        <div className="w-full  h-[400px]">
                            <ExpandedSpectralProfileChart
                                chartData={chartData}
                                bottomAxisTickText={bandNames}
                            />
                        </div>
                    </div>

                    <div className="w-1/4 h-full shrink-0">
                        <ExpandedSpectralProfileChartLegend
                            excludedLandCoverTypes={excludedLandCoverTypes}
                            landCoverTypeOnClick={toggleExcludedLandCoverType}
                            landCoverTypeOnHover={setLandCoverTypeOnHover}
                            toggleSelectAll={() =>
                                setExcludedLandCoverTypes((prev) => {
                                    if (prev.size) {
                                        return new Set();
                                    }
                                    return new Set(ListOfLandCoverTypes);
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
