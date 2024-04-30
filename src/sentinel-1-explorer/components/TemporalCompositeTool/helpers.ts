const THRESHOLD = (255 / 3) * 2;

export type ColorGroup =
    | 'Red'
    | 'Green'
    | 'Blue'
    | 'Yellow'
    | 'Magenta'
    | 'Cyan';

export const getColorGroup = (r: number, g: number, b: number): ColorGroup => {
    // Check if the color is Red
    if (r > THRESHOLD && r > g && r > b && g < THRESHOLD && b < THRESHOLD) {
        return 'Red';
    }

    // Check if the color is Green
    if (g > THRESHOLD && g > r && g > b && r < THRESHOLD && b < THRESHOLD) {
        return 'Green';
    }

    // Check if the color is Blue
    if (b > THRESHOLD && b > r && b > g && r < THRESHOLD && g < THRESHOLD) {
        return 'Blue';
    }

    // Check if the color is Yellow
    if (r > THRESHOLD && g > THRESHOLD && r > b && g > b && b < THRESHOLD) {
        return 'Yellow';
    }

    // Check if the color is Magenta
    if (r > THRESHOLD && b > THRESHOLD && r > g && b > g && g < THRESHOLD) {
        return 'Magenta';
    }

    // Check if the color is Cyan
    if (g > THRESHOLD && g > THRESHOLD && g > r && b > r && r < THRESHOLD) {
        return 'Cyan';
    }

    // If none of the above conditions are met, return 'null'
    return null;
};
