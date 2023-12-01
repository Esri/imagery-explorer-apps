// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import {
    SpectralProfileDataByFeatureOfInterest,
    SpectralProfileFeatureOfInterest,
} from './config';

// Function to calculate similarity between two arrays
function calculateSimilarity(arr1: number[], arr2: number[]) {
    // Calculate Pearson correlation coefficient
    const mean1 = arr1.reduce((acc, val) => acc + val, 0) / arr1.length;
    const mean2 = arr2.reduce((acc, val) => acc + val, 0) / arr2.length;

    let numerator = 0;
    let denom1 = 0;
    let denom2 = 0;

    for (let i = 0; i < arr1.length; i++) {
        const diff1 = arr1[i] - mean1;
        const diff2 = arr2[i] - mean2;

        numerator += diff1 * diff2;
        denom1 += diff1 ** 2;
        denom2 += diff2 ** 2;
    }

    const denominator = Math.sqrt(denom1) * Math.sqrt(denom2);

    if (denominator === 0) return 0; // Avoid division by zero

    return numerator / denominator;
}
/**
 * given an array of band values, find the feature of interest that is most similar to it
 * @param bandValues
 * @returns
 */
export const findMostSimilarFeatureOfInterest = (
    bandValues: number[]
): SpectralProfileFeatureOfInterest => {
    // let minSumOfDifferences = Infinity;
    let minSumOfSquaredDifferences = Infinity;
    let output: SpectralProfileFeatureOfInterest = null;

    for (const [key, value] of Object.entries(
        SpectralProfileDataByFeatureOfInterest
    )) {
        // let sumOfDiff = 0;
        let sumOfSquaredDiff = 0;

        const len = Math.min(bandValues.length, value.length);

        for (let i = 0; i < len; i++) {
            const diff = Math.abs(bandValues[i] - value[i]);
            // sumOfDiff += diff;

            // By squaring the differences, larger deviations from the expected values will have a
            // more significant impact on the total difference.
            // Therefore, it might provide a more accurate measure of similarity between spectral profiles.
            sumOfSquaredDiff += diff * diff;
        }

        if (sumOfSquaredDiff < minSumOfSquaredDifferences) {
            minSumOfSquaredDifferences = sumOfSquaredDiff;
            output = key as SpectralProfileFeatureOfInterest;
        }
    }

    return output;
};

const normalizeBandValue = (value: number): number => {
    // band value should never go above 1
    value = Math.min(value, 1);
    // band value should never go below 0
    value = Math.max(value, 0);
    return value;
};

/**
 * Converts an array of Landsat Band Values to an array of LineChartDataItem objects.
 *
 * This function takes an array of numeric band values and processes them to create LineChartDataItem objects.
 * It keeps only the first 7 bands and normalizes the values to ensure they fall within the range 0-1.
 *
 * @param bandValues - An array of numeric values representing Landsat band values.
 * @returns An array of LineChartDataItem objects with normalized x and y values.
 */
export const formatLandsatBandValuesAsLineChartDataItems = (
    bandValues: number[]
) => {
    if (!bandValues || !bandValues.length) {
        return [];
    }

    return bandValues.slice(0, 7).map((val, index) => {
        return {
            x: index,
            y: normalizeBandValue(val),
        } as LineChartDataItem;
    });
};
