import { QuickD3ChartDataItem } from '@shared/components/QuickD3Chart/types';
import { SpectralIndex } from '@shared/store/Analysis/reducer';
import { TemporalProfileData } from '@typing/imagery-service';

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
        const [B1, B2, B3, B4, B5, B6] = d.values;

        let value = 0;

        // Calculate the value based on the specified spectral index
        if (spectralIndex === 'moisture') {
            value = (B5 - B6) / (B5 + B6);
        } else if (spectralIndex === 'vegetation') {
            value = (B5 - B4) / (B5 + B4);
        } else if (spectralIndex === 'urban') {
            value = (B6 - B5) / (B6 + B5);
        }

        return {
            key: d.acquisitionYear.toString(),
            value,
        };
    });

    return data;
};
