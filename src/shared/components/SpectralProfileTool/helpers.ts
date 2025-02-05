import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { LandCoverType, SpectralProfileDataByLandCoverType } from './config';

type FormatBandValuesAsLineChartDataItemsParams = {
    /**
     * An array of numeric values representing the imagery band values.
     */
    bandValues: number[];
    /**
     * The title for this series of LineChartDataItem objects.
     * If provided, the title will appear in the tooltip text.
     */
    title?: string;
    /**
     * The maximum number of band values to include in the output array.
     * If not specified, all band values will be used.
     */
    length?: number;
};

const FILL_COLOR_BY_LAND_COVER_TYPE: Record<LandCoverType, string> = {
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
const FILL_COLOR_BY_LAND_COVER_TYPE_RGBA: Record<LandCoverType, string> = {
    Cloud: 'rgba(136, 136, 136,opacity)',
    'Clear Water': 'rgba(0, 121, 242,{{opacity}})',
    'Turbid Water': 'rgba(118, 181, 226,{{opacity}})',
    'Snow and Ice': 'rgba(255, 255, 255,{{opacity}})',
    Sand: 'rgba(237, 198, 146,{{opacity}})',
    'Bare Soil': 'rgba(238, 151, 32,{{opacity}})',
    'Paved Surface': 'rgba(235, 126, 224,{{opacity}})',
    Trees: 'rgba(10, 197, 192,{{opacity}})',
    'Healthy Vegetation': 'rgba(27, 228, 62,{{opacity}})',
    'Dry Vegetation': 'rgba(202, 215, 40,{{opacity}})',
};
/**
 * Get fill color that will be used to render the stroke line by land cover type.
 * @param {LandCoverType} landCoverType user selected land cover type
 * @returns hex color string
 */
export const getFillColorByLandCoverType = (
    landCoverType: LandCoverType,
    opacity: number = 1
): string => {
    if (opacity === 1) {
        return (
            FILL_COLOR_BY_LAND_COVER_TYPE[landCoverType] ||
            'var(--custom-light-blue-90)'
        );
    }

    const color = FILL_COLOR_BY_LAND_COVER_TYPE_RGBA[landCoverType];

    if (!color) {
        return 'var(--custom-light-blue-90)';
    }

    return color.replace('{{opacity}}', opacity.toString());
};

/**
 * Get normalized band value to ensure it fits into the range of lower and upper end
 * @param value band value to normalize
 * @param lowerEnd min value of the value range
 * @param upperEnd max value of the value range
 * @returns {number} normalized value
 */
export const normalizeBandValue = (
    value: number,
    lowerEnd: number,
    upperEnd: number
): number => {
    // band value should never go above upperEnd
    value = Math.min(value, upperEnd);
    // band value should never go below lowerEnd
    value = Math.max(value, lowerEnd);
    return value;
};

/**
 * Given an array of band values from a user-selected location and a spectral data lookup table,
 * find the land cover type that is most similar to the provided band values.
 *
 * The function compares the band values against typical spectral profiles for different land cover types.
 * It uses the sum of squared differences between the band values and each spectral profile to determine similarity.
 * The land cover type with the smallest sum of squared differences is returned as the most similar match.
 *
 * @param {number[]} bandValues - Array of band values from the user-selected location.
 * @param {SpectralProfileDataByLandCoverType} spectralProfileData - Lookup table providing typical spectral profiles for different land cover types.
 * @returns {LandCoverType} The land cover type that has the spectral profile most similar to the input band values.
 */
export const findMostSimilarLandCoverType = (
    bandValues: number[],
    spectralProfileData: SpectralProfileDataByLandCoverType
): LandCoverType => {
    // let minSumOfDifferences = Infinity;
    let minSumOfSquaredDifferences = Infinity;
    let output: LandCoverType = null;

    for (const [landCoverType, value] of Object.entries(spectralProfileData)) {
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
            output = landCoverType as LandCoverType;
        }
    }

    return output;
};

/**
 * Converts an array of band values into an array of LineChartDataItem objects.
 *
 * This function processes an array of numeric band values, optionally limiting the number
 * of values based on the specified length. It normalizes each value to a range between 0 and 1,
 * and maps each value to a LineChartDataItem object, where the `x` property represents the band's index
 * and the `y` property represents the normalized value. Optionally includes a title in the tooltip text.
 *
 * @param {FormatBandValuesAsLineChartDataItemsParams} params - The input parameters, including band values and optional title and length.
 * @returns {LineChartDataItem[]} An array of LineChartDataItem objects with `x`, `y` coordinates and tooltips.
 */
export const formatBandValuesAsLineChartDataItems = ({
    bandValues,
    title,
    length,
}: FormatBandValuesAsLineChartDataItemsParams) => {
    if (!bandValues || !bandValues.length) {
        return [];
    }

    if (length !== undefined) {
        bandValues = bandValues.slice(0, length);
    }

    return bandValues.map((val, index) => {
        const normalizedY = normalizeBandValue(val, 0, 1);

        const tooltipText = title
            ? `${title}: ${normalizedY.toFixed(3)}`
            : normalizedY.toFixed(3);

        return {
            x: index,
            y: normalizedY,
            tooltip: tooltipText,
        } as LineChartDataItem;
    });
};
