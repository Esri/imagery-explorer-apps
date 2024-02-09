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
// };

// /**
//  * make a video (in webm format) using the media recorder
//  * @param param0
//  * @returns
//  */
// export const createVideoViaMediaRecorder = async ({
//     data,
//     animationSpeed,
//     width,
//     height,
// }: Props): Promise<Blob> => {
//     return new Promise((resolve, reject) => {
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');

//         canvas.width = width;
//         canvas.height = height;

//         const canvasStream = canvas.captureStream(30); // frames per second
//         // console.log('Started stream capture from canvas element: ', stream);

//         const chunks: Blob[] = [];

//         const mediaRecorder = new MediaRecorder(canvasStream, {
//             mimeType: 'video/webm',
//             /**
//              * use 40000000 for 4K video
//              * @see https://stackoverflow.com/questions/65800159/how-do-you-determine-bitspersecond-for-media-recording
//              */
//             bitsPerSecond: 40000000,
//         });

//         // Record data in chunks array when data is available
//         mediaRecorder.addEventListener('dataavailable', (evt: BlobEvent) => {
//             chunks.push(evt.data);
//         });

//         // return blob once media recorder stops recording
//         mediaRecorder.addEventListener('stop', () => {
//             // downloadBlob(new Blob(chunks, { type: 'video/webm' }), 'output.webm');
//             resolve(new Blob(chunks, { type: 'video/webm' }));
//         });

//         const drawCanvas = () => {
//             context.clearRect(0, 0, canvas.width, canvas.height);

//             const { image } = data[indexOfCurrFrame];

//             context.drawImage(image, 0, 0, canvas.width, canvas.height);

//             // if (textLabel) {
//             //     // Define the text properties
//             //     const text = textLabel.text;
//             //     const fontSize = textLabel.fontSize || 24;
//             //     const fontFamily = 'Arial';
//             //     const x = 50; // X-coordinate
//             //     const y = 50; // Y-coordinate

//             //     // Set the text font style
//             //     context.font = fontSize + 'px ' + fontFamily;

//             //     // Set the text color
//             //     context.fillStyle = '#fff';

//             //     context.shadowColor = 'black'; // Shadow color
//             //     context.shadowBlur = 8; // Shadow blur
//             //     context.shadowOffsetX = 0; // Shadow offset X
//             //     context.shadowOffsetY = 0; // Shadow offset Y

//             //     // Add the text to the canvas on top of the background
//             //     context.fillText(text, x, y);
//             // }
//         };

//         let indexOfCurrFrame = 0;

//         let timeLastFrameWasRendered: number = null;

//         const animate = () => {
//             if (
//                 timeLastFrameWasRendered !== null &&
//                 performance.now() - timeLastFrameWasRendered < animationSpeed
//             ) {
//                 requestAnimationFrame(animate);
//                 return;
//             }

//             // no more frames to add, stop recording
//             if (indexOfCurrFrame === data.length) {
//                 mediaRecorder.stop();
//                 return;
//             }

//             drawCanvas();

//             indexOfCurrFrame = indexOfCurrFrame + 1;

//             timeLastFrameWasRendered = performance.now();

//             requestAnimationFrame(animate);
//         };

//         drawCanvas();

//         mediaRecorder.start();

//         requestAnimationFrame(animate);
//     });
// };
