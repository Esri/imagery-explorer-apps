// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import {
    FeatureOfInterests,
    SpectralProfileDataByFeatureOfInterest,
    SpectralProfileFeatureOfInterest,
} from './config';

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

export const FILL_COLOR_BY_FEATURE_OF_INTEREST: Record<
    SpectralProfileFeatureOfInterest,
    string
> = {
    Cloud: '#888888',
    'Clear Water': '#0079F2',
    'Turbid Water': '#76B5E2',
    'Snow and Ice': '#FFFFFF',
    Sand: '#EDC692',
    'Bare Soil': '#EE9720',
    'Paved Surface': '#EB7EE0',
    Trees: '#0AC5C0',
    'Healthy Vegetation': '#1BE43E',
    'Dry Vegetation': '#CAD728',
};

/**
 * Get fill color that will be used to render the stroke line by featureOfInterest.
 * @param FeatureOfInterests
 * @returns hex color string
 */
export const getFillColorByFeatureOfInterest = (
    FeatureOfInterests: SpectralProfileFeatureOfInterest
): string => {
    return (
        FILL_COLOR_BY_FEATURE_OF_INTEREST[FeatureOfInterests] ||
        'var(--custom-light-blue-90)'
    );
};
