export const hexToRgb = (hex: string): number[] => {
    // Remove the "#" symbol if it's included in the hex code
    hex = hex.replace(/^#/, '');

    // Parse the hex value into its red, green, and blue components
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return [r, g, b];
};
