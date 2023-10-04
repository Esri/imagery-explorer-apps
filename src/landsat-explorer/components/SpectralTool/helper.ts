import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { SpectralProfileDataByFeatureOfInterest } from './config';

/**
 * given an array of band values, find the feature of interest that is most similar to it
 * @param bandValues
 * @returns
 */
export const findMostSimilarFeatureOfInterest = (
    bandValues: number[]
): SpectralProfileFeatureOfInterest => {
    let minSumOfDifferences = Infinity;
    let output: SpectralProfileFeatureOfInterest = null;

    for (const [key, value] of Object.entries(
        SpectralProfileDataByFeatureOfInterest
    )) {
        let sumOfDiff = 0;

        const len = Math.min(bandValues.length, value.length);

        for (let i = 0; i < len; i++) {
            const diff = Math.abs(bandValues[i] - value[i]);
            sumOfDiff += diff;
        }

        if (sumOfDiff < minSumOfDifferences) {
            minSumOfDifferences = sumOfDiff;
            output = key as SpectralProfileFeatureOfInterest;
        }
    }

    return output;
};
