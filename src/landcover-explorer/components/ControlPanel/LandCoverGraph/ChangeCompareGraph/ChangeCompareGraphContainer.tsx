import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    formatAreaPercentage,
    getLandCoverChangeInAcres,
    LandCoverChangeInAcres,
} from '@landcover-explorer/services/sentinel-2-10m-landcover/computeHistograms';
import { getLandCoverClassificationShortName } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import {
    selectMapCenterAndZoom,
    selectMapExtent,
    selectMapMode,
    selectMapResolution,
    selectYearsForSwipeWidgetLayers,
} from '@landcover-explorer/store/Map/selectors';
// import { showInfoPanelToggled } from '@landcover-explorer/store/UI/reducer';
import { updateTooltipData } from '@landcover-explorer/store/UI/thunks';
// import {
//     QuickD3ChartData,
//     QuickD3ChartDataItem,
// } from '@landcover-explorer/QuickD3Chart/types';
import ChangeCompareGraph from './ChangeCompareGraph';
// import { numberFns } from 'helper-toolkit-ts';
import {
    // DEFAULT_MAP_ZOOM,
    MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM,
} from '@landcover-explorer/constants/map';
import { TooltipData } from '@landcover-explorer/store/UI/reducer';
import { DivergingBarChartDataItem } from '@vannizhang/react-d3-charts/dist/DivergingBarChart/types';
// import { abbreviateNumber } from '@landcover-explorer/utils/number';

const ChangeCompareGraphContainer = () => {
    const dispatch = useDispatch();

    const { zoom } = useSelector(selectMapCenterAndZoom);

    const resolution = useSelector(selectMapResolution);

    const extent = useSelector(selectMapExtent);

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
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

                const { ClassName, Description, Color } =
                    landcoverClassificationData;

                const [R, G, B] = Color;

                // const formatedDiffInAcres = abbreviateNumber(differenceInAcres);

                return {
                    x: getLandCoverClassificationShortName(ClassName),
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

        const tooltipData = {
            title: ClassName,
            content: `${formatAreaPercentage(
                earlierYearAreaInPercentage
            )}% in ${year4LeadingLayer} and ${formatAreaPercentage(
                laterYearAreaInPercentage
            )}% in ${year4TrailingLayer}, a change of ${
                differenceInPercentage >= 0 ? '+' : ''
            }${formatAreaPercentage(
                differenceInPercentage
            )}%  of the total area.`,
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
