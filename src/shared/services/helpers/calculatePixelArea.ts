/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
