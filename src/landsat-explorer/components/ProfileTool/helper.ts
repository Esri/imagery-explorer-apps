import { QuickD3ChartDataItem } from '@shared/components/QuickD3Chart/types';
import { SpectralIndex } from '@shared/store/Analysis/reducer';
import { TemporalProfileData } from '@typing/imagery-service';
import { format } from 'date-fns';

/**
 * Converts Landsat temporal profile data to chart data.
 * @param temporalProfileData - Array of temporal profile data.
 * @param spectralIndex - Spectral index to calculate the value for each data point.
 * @returns An array of QuickD3ChartDataItem objects representing the chart data.
 *
 */
export const convertLandsatTemporalProfileData2ChartData = (
    temporalProfileData: TemporalProfileData[],
    spectralIndex: SpectralIndex
): QuickD3ChartDataItem[] => {
    const data = temporalProfileData.map((d) => {
        const { acquisitionYear, acquisitionMonth, acquisitionDate } = d;

        const [B1, B2, B3, B4, B5, B6] = d.values;

        let value = 0;

        // Calculate the value based on the specified spectral index
        if (spectralIndex === 'moisture') {
            value = (B5 - B6) / (B5 + B6);
        } else if (spectralIndex === 'vegetation') {
            value = (B5 - B4) / (B5 + B4);
        } else if (spectralIndex === 'water') {
            value = (B3 - B6) / (B3 + B6);
        }

        const tooltip = `${format(
            acquisitionDate,
            'LLL yyyy'
        )}: ${value.toFixed(2)}`;

        return {
            key: d.acquisitionYear.toString(),
            value,
            tooltip,
        };
    });

    return data;
};
