// /* Copyright 2024 Esri
//  *
//  * Licensed under the Apache License Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// import { hexToRgb } from '@shared/utils/snippets/hex2rgb';

// // const ColorRamps = ['#511C02', '#A93A03', '#FFE599', '#0084A8', '#004053'];
// const ColorRamps = [
//     '#511C02',
//     '#662302',
//     '#7E2B03',
//     '#953303',
//     '#AD430B',
//     '#C47033',
//     '#DB9D5A',
//     '#F3CC83',
//     '#DED89B',
//     '#9BBF9F',
//     '#57A5A3',
//     '#118AA7',
//     '#007797',
//     '#006480',
//     '#005168',
//     '#004053',
// ];

// const ColorRampsInRGB = ColorRamps.map((hex) => {
//     return hexToRgb(hex);
// });

// /**
//  * return the color ramp as css gradient
//  * @returns css gradient string (e.g. `linear-gradient(90deg, rgba(0,132,255,1) 0%, rgba(118,177,196,1) 25%, rgba(173,65,9,1) 100%)`)
//  */
// export const getChangeCompareLayerColorrampAsCSSGradient = () => {
//     const stops = ColorRamps.map((color, index) => {
//         const pos = (index / (ColorRamps.length - 1)) * 100;
//         return `${color} ${pos}%`;
//     });

//     const output = `linear-gradient(90deg, ${stops.join(', ')})`;

//     return output;
// };

// /**
//  * Get the RGB color corresponding to a given value within a predefined pixel value range.
//  *
//  * @param value - The numeric value to map to a color within the range.
//  * @returns An array representing the RGB color value as three integers in the range [0, 255].
//  */
// export const getPixelColor = (value: number): number[] => {
//     // the minimum and maximum values for the pixel value range.
//     const MIN = -2;
//     const MAX = 2;

//     const RANGE = MAX - MIN;

//     // Normalize the input value to be within the [0, RANGE] range.
//     value = value - MIN;

//     const index = Math.floor((value / RANGE) * (ColorRampsInRGB.length - 1));

//     return ColorRampsInRGB[index];
// };
