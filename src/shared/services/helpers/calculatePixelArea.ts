/**
 * Calculate the area of a pixel in Web Mercator projection
 * @param {number} pixelSize - The size of the pixel in map units (meters)
 * @param {number} latitude - The latitude at the center of the pixel in degrees
 * @returns {number} The area of the pixel in square meters
 */
export const calculatePixelArea = (pixelSize: number, latitude: number) => {
    // Convert latitude from degrees to radians
    const latitudeInRadians = (latitude * Math.PI) / 180;

    // Correct the size of pixel using the cosine of the latitude
    const correctedPixelSize = pixelSize * Math.cos(latitudeInRadians);

    // return the Calculated pixel area
    return correctedPixelSize ** 2;
};
