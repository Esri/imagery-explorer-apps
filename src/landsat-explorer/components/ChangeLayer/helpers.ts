const ColorRamps = [
    [0, 132, 168],
    [51, 151, 165],
    [118, 177, 161],
    [178, 199, 157],
    [247, 226, 153],
    [235, 190, 119],
    [214, 147, 81],
    [191, 102, 42],
    [173, 65, 9],
].reverse();

/**
 * return the color ramp as css gradient
 * @returns css gradient string (e.g. `linear-gradient(90deg, rgba(0,132,255,1) 0%, rgba(118,177,196,1) 25%, rgba(173,65,9,1) 100%)`)
 */
export const getChangeCompareLayerColorrampAsCSSGradient = () => {
    const stops = ColorRamps.map((color, index) => {
        const [r, g, b] = color;
        const pos = (index / (ColorRamps.length - 1)) * 100;
        return `rgba(${r},${g},${b},1) ${pos}%`;
    });

    const output = `linear-gradient(90deg, ${stops.join(', ')})`;

    return output;
};

export const getPixelColor = (value: number): number[] => {
    if (value <= -1.5) {
        return ColorRamps[0];
    }

    if (value <= -1) {
        return ColorRamps[1];
    }

    if (value <= -0.5) {
        return ColorRamps[2];
    }

    if (value <= 0) {
        return ColorRamps[3];
    }

    if (value <= 0.5) {
        return ColorRamps[4];
    }

    if (value <= 1) {
        return ColorRamps[5];
    }

    if (value <= 1.5) {
        return ColorRamps[6];
    }

    if (value <= 2) {
        return ColorRamps[7];
    }
};
