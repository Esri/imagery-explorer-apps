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

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import {
    formatAreaPercentage,
    getLandCoverChangeInAcres,
    LandCoverChangeInAcres,
} from '@shared/services/sentinel-2-10m-landcover/computeHistograms';
// import { getLandCoverClassificationShortName } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    // selectMapCenterAndZoom,
    // selectMapExtent,
    // selectMapMode,
    // selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
// import { showInfoPanelToggled } from '@landcover-explorer/store/UI/reducer';
import { updateTooltipData } from '@shared/store/UI/thunks';
// import {
//     QuickD3ChartData,
//     QuickD3ChartDataItem,
// } from '@landcover-explorer/QuickD3Chart/types';
import ChangeCompareGraph from './ChangeCompareGraph';
// import { numberFns } from 'helper-toolkit-ts';
// import {
//     // DEFAULT_MAP_ZOOM,
//     MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM,
// } from '@landcover-explorer/constants/map';
import { TooltipData } from '@shared/store/UI/reducer';
import { DivergingBarChartDataItem } from '@vannizhang/react-d3-charts/dist/DivergingBarChart/types';
import {
    selectMapExtent,
    selectMapResolution,
    selectMapZoom,
} from '@shared/store/Map/selectors';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
// import { abbreviateNumber } from '@landcover-explorer/utils/number';

export const ChangeCompareGraphContainer = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    // const { zoom } = useAppSelector(selectMapCenterAndZoom);
    const zoom = useAppSelector(selectMapZoom);

    const resolution = useAppSelector(selectMapResolution);

    const extent = useAppSelector(selectMapExtent);

    const { year4LeadingLayer, year4TrailingLayer } = useAppSelector(
        selectYearsForSwipeWidgetLayers
    );

    const [chartData, setChartData] = useState<DivergingBarChartDataItem[]>();

    const [landCoverChangeData, setLandCoverChangeData] =
        useState<LandCoverChangeInAcres[]>();

    const landCoverChangeDataRef = useRef<LandCoverChangeInAcres[]>();

    const fetchData = async (): Promise<void> => {
        if (
            !resolution ||
            !extent ||
            !year4LeadingLayer ||
            !year4TrailingLayer
        ) {
            return undefined;
        }

        const res = await getLandCoverChangeInAcres({
            extent,
            resolution,
            earlierYear: year4LeadingLayer,
            laterYear: year4TrailingLayer,
        });

        setLandCoverChangeData(res);
    };

    const getChartData = () => {
        const data: DivergingBarChartDataItem[] = landCoverChangeData.map(
            (d) => {
                const {
                    differenceInAcres,
                    differenceInPercentage,
                    landcoverClassificationData,
                } = d;

                const { ClassName, Description, Color, shortName } =
                    landcoverClassificationData;

                const [R, G, B] = Color;

                // const formatedDiffInAcres = abbreviateNumber(differenceInAcres);

                return {
                    x: shortName, //getLandCoverClassificationShortName(ClassName),
                    label: ClassName,
                    y: differenceInPercentage,
                    fill: `rgb(${R}, ${G}, ${B})`,
                    labelOnTop:
                        differenceInAcres > 0
                            ? `+${differenceInPercentage}%`
                            : `${differenceInPercentage}%`,
                };
            }
        );

        setChartData(data);
    };

    const openTooltipForItemOnHover = (idx: number) => {
        if (
            !landCoverChangeDataRef.current ||
            !landCoverChangeDataRef.current[idx]
        ) {
            dispatch(updateTooltipData(null));
            return;
        }

        const data = landCoverChangeDataRef.current[idx];

        const {
            landcoverClassificationData,
            // laterYearAreaInAcres,
            laterYearAreaInPercentage,
            // earlierYearAreaInAcres,
            earlierYearAreaInPercentage,
            // differenceInAcres,
            differenceInPercentage,
        } = data;

        const { ClassName } = landcoverClassificationData;

        const classNameTranslated = t(ClassName, {
            ns: APP_NAME,
        });

        const content = t('change_compare_graph_tooltip_template', {
            ns: APP_NAME, // Use the namespace for translation
            pctEarlierYear: formatAreaPercentage(earlierYearAreaInPercentage),
            pctLaterYear: formatAreaPercentage(laterYearAreaInPercentage),
            plusOrMinusSign: differenceInPercentage >= 0 ? '+' : '',
            pctChange: formatAreaPercentage(differenceInPercentage),
            fromYear: year4LeadingLayer,
            toYear: year4TrailingLayer,
        });

        const tooltipData = {
            title: classNameTranslated,
            content,
            // content: `${formatAreaPercentage(
            //     earlierYearAreaInPercentage
            // )}% in ${year4LeadingLayer} and ${formatAreaPercentage(
            //     laterYearAreaInPercentage
            // )}% in ${year4TrailingLayer}, a change of ${
            //     differenceInPercentage >= 0 ? '+' : ''
            // }${formatAreaPercentage(
            //     differenceInPercentage
            // )}%  of the total area.`,
        } as TooltipData;

        dispatch(updateTooltipData(tooltipData));
    };

    useEffect(() => {
        if (landCoverChangeData) {
            getChartData();
        }

        landCoverChangeDataRef.current = landCoverChangeData;
    }, [landCoverChangeData]);

    useEffect(() => {
        // if (zoom < MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM) {
        //     return;
        // }

        fetchData();
    }, [resolution, extent, year4LeadingLayer, year4TrailingLayer, zoom]);

    return (
        <ChangeCompareGraph
            data={chartData}
            itemOnHover={openTooltipForItemOnHover}
        />
    );
};

export default ChangeCompareGraphContainer;
