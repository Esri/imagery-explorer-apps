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

// import { AnimationFrameData } from '.';
// import { getFileName, getImageBlob } from './helpers';

// type Props = {
//     /**
//      * array of animation frame data to be used to create video file
//      */
//     data: AnimationFrameData[];
//     /**
//      * animation speed in millisecond
//      */
//     animationSpeed: number;
//     /**
//      * width of the output video file
//      */
//     width: number;
//     /**
//      * height of the output video file
//      */
//     height: number;
//     /**
//      * width of the original animation frame image that will be used to encode the output video file
//      */
//     widthOfOriginalAnimationFrame: number;
//     /**
//      * height of the original animation frame image that will be used to encode the output video file
//      */
//     heightOfOriginalAnimationFrame: number;
// };

// /**
//  * This function converts an `AnimationFrameData` object into a MEMFS object,
//  * which is the format expected by `FFMPEG.js` for processing. It takes an image,
//  * resizes it to specified dimensions, converts it to a JPEG blob, and then
//  * creates a MEMFS object containing the image data.
//  *
//  * @param data - The `AnimationFrameData` object representing the input image.
//  * @param outputName - The name to assign to the resulting MEMFS object.
//  * @param height - The height of the input image.
//  * @param width - The width of the input image.
//  * @returns A Promise that resolves to a MEMFS object containing the image data.
//  */
// const getImageAsMEMFS = async (params: {
//     data: AnimationFrameData;
//     outputName: string;
//     outputWidth: number;
//     outputHeight: number;
//     sourceImageWidth: number;
//     sourceImageHeight: number;
// }) => {
//     const {
//         data,
//         outputName,
//         outputHeight,
//         outputWidth,
//         sourceImageWidth,
//         sourceImageHeight,
//     } = params;

//     const blob = await getImageBlob({
//         image: data.image,
//         outputContentType: 'image/jpeg',
//         outputHeight,
//         outputWidth,
//         sourceImageWidth,
//         sourceImageHeight,
//     });

//     const arrayBuffer = await blob.arrayBuffer();

//     return {
//         name: outputName,
//         data: arrayBuffer,
//     };
// };

// /**
//  * make a video (in MP4 format) using FFMPEG
//  * @param param0
//  * @returns
//  */
// export const createVideoViaFFMPEG = async ({
//     data,
//     animationSpeed,
//     width,
//     height,
//     widthOfOriginalAnimationFrame,
//     heightOfOriginalAnimationFrame,
// }: Props): Promise<Blob> => {
//     const inputImages = await Promise.all(
//         data.map((d, index) => {
//             const name = getFileName(index, 3, 'jpg');
//             return getImageAsMEMFS({
//                 data: d,
//                 outputName: name,
//                 outputHeight: height,
//                 outputWidth: width,
//                 sourceImageWidth: widthOfOriginalAnimationFrame,
//                 sourceImageHeight: heightOfOriginalAnimationFrame,
//             });
//         })
//     );
//     // console.log(inputImages)

//     const worker = new Worker('./public/lib/ffmpeg-worker-mp4-v3.1.9001.js');

//     return new Promise((resolve, reject) => {
//         worker.onmessage = function (e) {
//             const msg = e.data;
//             let blob: Blob = null;
//             switch (msg.type) {
//                 case 'stdout':
//                 case 'stderr':
//                     console.log('stderr' + msg.data);
//                     break;
//                 case 'exit':
//                     console.log('Process exited with code ' + msg.data);
//                     //worker.terminate();
//                     break;
//                 case 'done':
//                     blob = new Blob([msg.data.MEMFS[0].data], {
//                         type: 'video/mp4',
//                     });

//                     resolve(blob);
//                     break;
//             }
//         };

//         worker.postMessage({
//             type: 'run',
//             TOTAL_MEMORY: 16e8, // 16G
//             // ALLOW_MEMORY_GROWTH: 1,
//             arguments: [
//                 '-r',
//                 '1',
//                 '-i',
//                 '%03d.jpg',
//                 '-c:v',
//                 'libx264',
//                 '-r',
//                 '16',
//                 'out.mp4',
//             ],
//             MEMFS: inputImages,
//         });
//     });
// };
