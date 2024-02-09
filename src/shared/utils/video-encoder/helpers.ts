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

// type GetImageBlobParams = {
//     /**
//      * image element to be used for this animation frame
//      */
//     image: HTMLImageElement;
//     /**
//      * Information and metadata about this animation frame.
//      */
//     imageInfo: string;
//     /**
//      * The content type of the output blob object (e.g., `image/jpeg`).
//      */
//     outputContentType: string;
//     /**
//      * The width of the output image.
//      */
//     outputWidth: number;
//     /**
//      * The height of the output image.
//      */
//     outputHeight: number;
//     /**
//      * The height of the input source image.
//      */
//     sourceImageWidth: number;
//     /**
//      * The width of the input source image.
//      */
//     sourceImageHeight: number;
//     /**
//      * title of the authoring app
//      */
//     authoringApp: string;
// };
// /**
//  * Generates a filename for image with leading zero padding to ensure a consistent
//  * file name length. If the length of the file name is shorter than the input
//  * length, it adds padding zeros to the left of the index.
//  *
//  * @param index - The index or identifier for the image.
//  * @param length - The desired length of the output name.
//  * @param extension - The desired extension of the output file name.
//  *
//  * @returns The formatted image name as a string.
//  *
//  * @example
//  * ```js
//  * getFileName(0, 3, 'jpg') // returns `000.jpg`
//  * ```
//  */
// export const getFileName = (
//     index: number,
//     length: number,
//     extension: string
// ) => {
//     let name = index.toString();

//     while (name.length < length) {
//         name = '0' + name;
//     }

//     return name + '.' + extension;
// };

// /**
//  * This function converts an `HTMLImageElement` object into a Blob object,
//  * It takes an image, resizes it to specified dimensions, converts it to a JPEG blob
//  *
//  * @returns A Promise that resolves to a blob object containing the output image data.
//  */
// export const getImageBlob = async ({
//     image,
//     imageInfo,
//     outputContentType,
//     outputHeight,
//     outputWidth,
//     sourceImageWidth,
//     sourceImageHeight,
//     authoringApp,
// }: GetImageBlobParams) => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     // Set the canvas dimensions to match the desired output dimensions.
//     canvas.width = outputWidth;
//     canvas.height = outputHeight;

//     const aspectRatio = outputWidth / outputHeight;

//     // Calculate the dimensions of the portion to be selected from the source image.
//     let sWidth = sourceImageHeight * aspectRatio;
//     let sHeight = sourceImageHeight;

//     // re-calculate sWidth and sHeight if sWidth calculated from previous step is wider that the width of the actual source image
//     if (sWidth > sourceImageWidth) {
//         sWidth = sourceImageWidth;
//         sHeight = sourceImageWidth * (1 / aspectRatio);
//     }

//     sWidth = Math.floor(sWidth);
//     sHeight = Math.floor(sHeight);

//     // Calculate the starting point (sx, sy) for selecting the portion from the source image.
//     // we should always select the center portion of it
//     const sx = Math.floor(Math.abs(sWidth - sourceImageWidth) / 2);
//     const sy = Math.floor(Math.abs(sHeight - sourceImageHeight) / 2);

//     context.drawImage(
//         image,
//         sx,
//         sy,
//         sWidth,
//         sHeight,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//     );

//     addHeaderText(canvas, authoringApp, imageInfo);

//     // Export the canvas content as a JPEG blob.
//     const blob: Blob = await new Promise((resolveBlob, rejectBlob) => {
//         canvas.toBlob(resolveBlob, outputContentType);
//     });

//     return blob;
// };

// const addHeaderText = (
//     canvas: HTMLCanvasElement,
//     /**
//      * name of the authoring app, this will be added to the left side of header
//      */
//     appTitle: string,
//     /**
//      * image metatdata to be added to the right side of the header
//      */
//     imageInfo: string
// ): void => {
//     if (!appTitle || !imageInfo) {
//         return;
//     }

//     const { width } = canvas;

//     const context = canvas.getContext('2d');

//     // draw the gradient background rect
//     const gradientRectHeight = 24;

//     context.fillStyle = 'rgba(0,0,0,.3)';

//     context.rect(0, 0, width, gradientRectHeight);

//     context.fill();

//     // draw the watermark text
//     context.shadowColor = 'black';
//     context.shadowBlur = 5;
//     context.fillStyle = 'rgba(255,255,255,.9)';
//     context.font = '1rem Avenir Next';

//     const metrics4ImageInfo = context.measureText(imageInfo);

//     context.fillText(appTitle, 10, 18);
//     context.fillText(imageInfo, width - metrics4ImageInfo.width - 10, 18);
// };
