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

import React, { useEffect, useState } from 'react';
import LandcoverGraph from './LandcoverGraph/LandcoverGraphContainer';
import { useAppSelector } from '@shared/store/configureStore';
import Header from './Header/Header';
import { useAppDispatch } from '@shared/store/configureStore';
import { showInfoPanelToggled } from '@shared/store/LandcoverExplorer/reducer';

import {
    getHistoricalLandCoverDataByMapExtent,
    HistoricalLandCoverData,
} from '@shared/services/sentinel-2-10m-landcover/getHistoricalLandCoverDataByMapExtent';
import {
    selectAvaiableYearsForLandCoverLayer,
    selectShowInfoPanel,
} from '@shared/store/LandcoverExplorer/selectors';
// import { QuickD3ChartData, QuickD3ChartDataItem } from '../QuickD3Chart/types';
import CountrySelector from './Header/CountrySelector';
import SubRegionSelector from './Header/SubRegionSelector';
import { getHistoricalLandCoverDataByRegion } from '@landcover-explorer/services/landcover-statistics/query';
import {
    getRegionFromHashParams,
    saveRegionToHashParams,
} from '@landcover-explorer/utils/URLHashParams';
import { GroupedBarChartGroupData } from '@vannizhang/react-d3-charts/dist/GroupedBarChart/types';
import { CloseButton } from '@shared/components/CloseButton';
import {
    selectMapExtent,
    selectMapResolution,
} from '@shared/store/Map/selectors';
import { DownloadHistoricalData } from './DownloadHistoricalData/DownloadHistoricalData';

// import { numberFns } from 'helper-toolkit-ts';
// import { saveHistoricalLandCoverDataAsCSV } from './helper';
// import { abbreviateNumber } from '@landcover-explorer/utils/number';

const InfoPanel = () => {
    const dispatch = useAppDispatch();

    const showInfoPanel = useAppSelector(selectShowInfoPanel);

    const resolution = useAppSelector(selectMapResolution);

    const extent = useAppSelector(selectMapExtent);

    const [selectedCountryFromHashParam, setSelectedSubReginFromHashParam] =
        getRegionFromHashParams().split(',');

    /**
     * Name of selected country, if selected country is defined (and selectedSubRegion is not defined), show land cover stats for selected country
     */
    const [selectedCountry, setSelectedCountry] = useState<string>(
        selectedCountryFromHashParam || ''
    );

    /**
     * ISO Code of selected region. if selected sub region is defined, show land cover stats for selected sub region
     */
    const [selectedSubRegion, setSelectedSubRegin] = useState<string>(
        setSelectedSubReginFromHashParam || ''
    );

    const [historicalLandCoverData, setHistoricalLandCoverData] =
        useState<HistoricalLandCoverData[]>();

    const [chartData, setChartData] = useState<GroupedBarChartGroupData[]>();

    const availableYears = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    // const [uniqueLandCoverClasses, setUniqueLandCoverClasses] = useState<
    //     string[]
    // >([]);

    const getChartData = () => {
        const data: GroupedBarChartGroupData[] = [];

        const landcoverClassNames: string[] = [];

        for (const item of historicalLandCoverData) {
            const { areaByYear, landCoverClassificationData } = item;

            const numberOfYearsWithoutData = areaByYear.filter(
                (d) => d.area === 0
            ).length;

            if (
                numberOfYearsWithoutData === areaByYear.length ||
                landCoverClassificationData.ClassName === 'No Data'
            ) {
                continue;
            }

            const { ClassName, Color } = landCoverClassificationData;

            const [R, G, B] = Color;

            const dataGroupedByLandcoverClass: GroupedBarChartGroupData = {
                title: ClassName,
                data: [],
            };

            for (const { area, areaInPercentage, year } of areaByYear) {
                dataGroupedByLandcoverClass.data.push({
                    x: `${year}`,
                    y: area,
                    label: `${areaInPercentage}%`, //abbreviateNumber(area),
                    labelOnTop: year.toString(),
                    fill: `rgb(${R}, ${G}, ${B})`,
                });
            }

            data.push(dataGroupedByLandcoverClass);

            // landcoverClassNames.push(ClassName);
        }

        setChartData(data);

        // setUniqueLandCoverClasses(landcoverClassNames);
    };

    useEffect(() => {
        // info panel is closed, clean the chart data
        if (!showInfoPanel) {
            setChartData(undefined);
            // setUniqueLandCoverClasses(undefined);
            return;
        }

        (async () => {
            try {
                let historicalLandCoverData: HistoricalLandCoverData[] = null;

                if (selectedSubRegion || selectedCountry) {
                    historicalLandCoverData =
                        await getHistoricalLandCoverDataByRegion({
                            countryName: selectedCountry,
                            subRegionISOCode: selectedSubRegion,
                        });
                } else if (resolution && extent) {
                    historicalLandCoverData =
                        await getHistoricalLandCoverDataByMapExtent(
                            extent,
                            resolution,
                            availableYears
                        );
                }

                setHistoricalLandCoverData(historicalLandCoverData);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [resolution, extent, showInfoPanel, selectedCountry, selectedSubRegion]);

    useEffect(() => {
        const selectedCountryAndSubRegionAsString = [
            selectedCountry,
            selectedSubRegion,
        ]
            .filter((val) => val !== '')
            .join(',');

        saveRegionToHashParams(
            showInfoPanel && selectedCountryAndSubRegionAsString
                ? selectedCountryAndSubRegionAsString
                : undefined
        );

        if (!showInfoPanel) {
            setSelectedCountry('');
            setSelectedSubRegin('');
        }
    }, [showInfoPanel, selectedCountry, selectedSubRegion]);

    useEffect(() => {
        if (historicalLandCoverData) {
            getChartData();
        }
    }, [historicalLandCoverData]);

    if (!showInfoPanel) {
        return null;
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-custom-background-95 z-20">
            <CloseButton
                onClick={() => {
                    dispatch(showInfoPanelToggled(false));
                }}
            />

            <div
                className="w-full mx-10 pb-6 overflow-y-hidden"
                style={{
                    maxWidth: '90vw',
                }}
            >
                <Header>
                    <CountrySelector
                        selectedCountry={selectedCountry}
                        onChange={(val) => {
                            setSelectedCountry(val);
                            setSelectedSubRegin('');
                        }}
                    />

                    {selectedCountry && (
                        <SubRegionSelector
                            selectedCountry={selectedCountry}
                            selectedSubRegion={selectedSubRegion}
                            onChange={setSelectedSubRegin}
                        />
                    )}

                    <DownloadHistoricalData
                        data={historicalLandCoverData}
                        selectedCountry={selectedCountry}
                        selectedSubRegion={selectedSubRegion}
                    />
                </Header>

                <div className="w-full h-full overflow-y-auto pb-12">
                    <LandcoverGraph
                        chartData={chartData}
                        // uniqueLandCoverClasses={uniqueLandCoverClasses}
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
