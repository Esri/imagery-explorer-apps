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

// import Point from '@arcgis/core/geometry/Point';

// export const getPopUpContent = (mapPoint: Point) => {
//     const lat = Math.round(mapPoint.latitude * 1000) / 1000;
//     const lon = Math.round(mapPoint.longitude * 1000) / 1000;

//     const popupDiv = document.createElement('div');

//     popupDiv.innerHTML = `
//         <div
//             class='popup-location-info text-custom-light-blue text-xs cursor-pointer'
//             title="click to copy the coordinates of this location"
//         >
//             <div class='flex'>
//                 <p><span class='text-custom-light-blue-50'>x</span> ${lon}</p>
//                 <p class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</p>
//             </div>
//         </div>
//     `;

//     const locationInfo = popupDiv.querySelector('.popup-location-info');

//     if (locationInfo) {
//         locationInfo.addEventListener('click', async () => {
//             // console.log('clicked on popup location info')
//             await navigator.clipboard.writeText(
//                 `x: ${mapPoint.longitude.toFixed(
//                     5
//                 )} y: ${mapPoint.latitude.toFixed(5)}`
//             );
//         });
//     }

//     return popupDiv;
// };
