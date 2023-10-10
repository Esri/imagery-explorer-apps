const ColorRamps = [
    [199, 234, 255], // #c7eaff,
    [206, 245, 244], // #cef5f4,
    [189, 242, 196], // #bdf2c4,
    [229, 247, 180], // #e5f7b4,
    [255, 247, 204], // #fff7cc,
    [255, 226, 191], // #ffe2bf,
    [255, 216, 191], // #ffd8bf,
    [255, 199, 179], // #ffc7b3,
    [255, 198, 191], // #ffc6bf,
];

export const getPixelColor = (value: number): number[] => {
    if (value <= -1.5) {
        return ColorRamps[0];
    }

    if (value > -1.5 && value <= -1) {
        return ColorRamps[1];
    }

    if (value > -1 && value <= -0.5) {
        return ColorRamps[2];
    }

    if (value > -0.5 && value <= 0) {
        return ColorRamps[3];
    }

    if (value > 0 && value <= 0.5) {
        return ColorRamps[4];
    }

    if (value > 0.5 && value <= 1) {
        return ColorRamps[5];
    }

    if (value > 1 && value <= 1.5) {
        return ColorRamps[6];
    }

    if (value > 1.5 && value <= 2) {
        return ColorRamps[7];
    }
};
