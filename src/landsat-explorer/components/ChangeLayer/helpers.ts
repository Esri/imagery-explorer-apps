import { hexToRgb } from '@shared/utils/snippets/hex2rgb';

const ColorRamps = ['#511C02', '#A93A03', '#FFE599', '#0084A8', '#004053'];

const ColorRampsInRGB = ColorRamps.map((hex) => {
    return hexToRgb(hex);
});

/**
 * return the color ramp as css gradient
 * @returns css gradient string (e.g. `linear-gradient(90deg, rgba(0,132,255,1) 0%, rgba(118,177,196,1) 25%, rgba(173,65,9,1) 100%)`)
 */
export const getChangeCompareLayerColorrampAsCSSGradient = () => {
    const stops = ColorRamps.map((color, index) => {
        const pos = (index / (ColorRamps.length - 1)) * 100;
        return `${color} ${pos}%`;
    });

    const output = `linear-gradient(90deg, ${stops.join(', ')})`;

    return output;
};

export const getPixelColor = (value: number): number[] => {
    // -2 - -1.2
    if (value <= -1.2) {
        return ColorRampsInRGB[0];
    }

    // -1.2 - 0.4
    if (value <= -0.4) {
        return ColorRampsInRGB[1];
    }

    if (value <= 0.4) {
        return ColorRampsInRGB[2];
    }

    if (value <= 1.2) {
        return ColorRampsInRGB[3];
    }

    return ColorRampsInRGB[4];
};
