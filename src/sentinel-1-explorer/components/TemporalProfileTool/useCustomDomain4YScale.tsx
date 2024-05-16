// import { getSentinel1PixelValueRangeByRadarIndex } from '@shared/services/sentinel-1/helper';
// import { selectSelectedIndex4TrendTool } from '@shared/store/TrendTool/selectors';
// import { RadarIndex, SpectralIndex } from '@typing/imagery-service';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * This custom hook returns the custom domain for Y Scale that will be used to render the Sentinel-1 Temporal Profile Chart
 * @param chartData
 * @returns
 */
export const useCustomDomain4YScale = (chartData: LineChartDataItem[]) => {
    // const selectedIndex: RadarIndex = useSelector(
    //     selectSelectedIndex4TrendTool
    // ) as RadarIndex;

    const customDomain4YScale = useMemo(() => {
        const yValues = chartData.map((d) => d.y);

        // boundary of y axis, for spectral index, the boundary should be -1 and 1
        // const [yLowerLimit, yUpperLimit]  = getSentinel1PixelValueRangeByRadarIndex(selectedIndex);

        // get min and max from the data
        let ymin = Math.min(...yValues);
        let ymax = Math.max(...yValues);

        // get range between min and max from the data
        const yRange = ymax - ymin;

        ymin = ymin - yRange * 0.1; //Math.max(yLowerLimit, ymin - (yRange * 0.1));
        ymax = ymax + yRange * 0.1; //Math.min(yUpperLimit, ymax + (yRange * 0.1));

        return [ymin, ymax];
    }, [chartData]);

    return customDomain4YScale;
};
