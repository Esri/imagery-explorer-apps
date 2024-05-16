import { RadarIndex } from '@typing/imagery-service';

export const calcRadarIndex = (
    indexName: RadarIndex,
    bandValues: number[]
): number => {
    const [VV, VH] = bandValues;

    let value = 0;

    // Calculate the value based on the input radar index
    if (indexName === 'water') {
        value =
            0.1747 * VV +
            0.0082 * VH * VV +
            ((0.0023 * VV) ^ 2) -
            ((0.0015 * VH) ^ 2) +
            0.1904;
    } else if (indexName === 'water anomaly') {
        value = 0.01 / (0.01 + VV * 2);
    }

    return value;
};

export const getSentinel1PixelValueRangeByRadarIndex = (
    indexName: RadarIndex
) => {
    if (indexName === 'water anomaly') {
        return [-2, 0];
    }

    if (indexName === 'water') {
        return [-0.5, 1];
    }

    return [0, 0];
};
