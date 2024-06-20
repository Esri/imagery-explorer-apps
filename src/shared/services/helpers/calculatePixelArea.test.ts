import { calculatePixelArea } from './calculatePixelArea';

describe('test calculatePixelArea', () => {
    // Constants for pixel width and height
    const pixelWidth = 10; // in meters
    const pixelHeight = 10; // in meters

    test.each([
        [0, 100.0], // Latitude 0 degrees
        [10, 98.48], // Latitude 10 degrees
        [20, 93.97], // Latitude 20 degrees
        [30, 86.6], // Latitude 30 degrees
        [40, 76.6], // Latitude 40 degrees
        [50, 64.28], // Latitude 50 degrees
        [60, 50.0], // Latitude 60 degrees
        [70, 34.2], // Latitude 70 degrees
        [80, 17.36], // Latitude 80 degrees
        [90, 0.0], // Latitude 90 degrees (cosine of 90 degrees is zero)
    ])(
        'at latitude %d degrees, the pixel area should be approximately %f square meters',
        (latitude, expectedArea) => {
            const area = calculatePixelArea(pixelWidth, pixelHeight, latitude);
            expect(area).toBeCloseTo(expectedArea, 2);
        }
    );
});
