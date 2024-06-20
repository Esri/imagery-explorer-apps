/**
 * Calculate the area of a pixel in Web Mercator projection
 * @param {number} pixelWidth - The width of the pixel in map units (meters)
 * @param {number} pixelHeight - The height of the pixel in map units (meters)
 * @param {number} latitude - The latitude at the center of the pixel in degrees
 * @returns {number} The area of the pixel in square meters
 */
export const calculatePixelArea = (
    pixelWidth: number,
    pixelHeight: number,
    latitude: number
) => {
    // Convert latitude from degrees to radians
    const latitudeInRadians = (latitude * Math.PI) / 180;

    // Correct the height using the cosine of the latitude
    const correctedHeight = pixelHeight * Math.cos(latitudeInRadians);

    // Calculate the area
    const area = pixelWidth * correctedHeight;

    return area;
};
