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

import { Point } from '@arcgis/core/geometry';

/**
 * Check and see if user clicked on the left side of the swipe widget
 * @param swipePosition position of the swipe handler, value should be bewteen 0 - 100
 * @param mapViewWidth width of the map view container
 * @param mouseX x position of the mouse click event
 * @returns boolean indicates if clicked on left side
 */
export const didClickOnLeftSideOfSwipeWidget = (
    swipePosition: number,
    mapViewWidth: number,
    mouseX: number
) => {
    const widthOfLeftHalf = mapViewWidth * (swipePosition / 100);
    return mouseX <= widthOfLeftHalf;
};

export const getLoadingIndicator = () => {
    const popupDiv = document.createElement('div');
    popupDiv.innerHTML = `<calcite-loader scale="s"></calcite-loader>`;
    return popupDiv;
};

/**
 * Get HTML Div Element that will be used as content of Map Popup.
 * The popup location information will be added to the bottom of the this Div Element.
 * @param mapPoint
 * @param popupContent
 * @returns
 */
export const getPopUpContentWithLocationInfo = (
    mapPoint: Point,
    popupContent = ''
): HTMLDivElement => {
    const lat = Math.round(mapPoint.latitude * 1000) / 1000;
    const lon = Math.round(mapPoint.longitude * 1000) / 1000;

    const popupDiv = document.createElement('div');

    const coordinatesHTML = `
        <span><span class='text-custom-light-blue-50'>x</span> ${lon}</span>
        <span class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</span>
    `;

    const locationInfoHTML = `
        <div 
            class='popup-location-info-container text-custom-light-blue text-xs cursor-pointer' 
            title="Click to copy the coordinates of this location"
        >
            <div class='popup-location-info-content'>
                ${coordinatesHTML}
            </div>
        </div>
    `;

    popupDiv.innerHTML = popupContent + locationInfoHTML;

    const locationInfoContainer = popupDiv.querySelector(
        '.popup-location-info-container'
    );
    const locationInfoContent = popupDiv.querySelector(
        '.popup-location-info-content'
    );

    locationInfoContainer.addEventListener('click', async () => {
        // console.log('clicked on popup location info')
        await navigator.clipboard.writeText(
            `x: ${mapPoint.longitude.toFixed(5)} y: ${mapPoint.latitude.toFixed(
                5
            )}`
        );

        locationInfoContent.innerHTML =
            '<span>Cooridnates copied to clipboard</span>';

        setTimeout(() => {
            locationInfoContent.innerHTML = coordinatesHTML;
        }, 2000);
    });

    return popupDiv;
};
