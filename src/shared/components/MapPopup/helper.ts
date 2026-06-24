/* Copyright 2025 Esri
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

import Point from '@arcgis/core/geometry/Point';
import type MapView from '@arcgis/core/views/MapView';
import type { ArcgisPopup } from '@arcgis/map-components/components/arcgis-popup';
import { t } from 'i18next';

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
    popupDiv.style.width = '100%';
    popupDiv.style.display = 'flex';
    popupDiv.style.justifyContent = 'center';
    popupDiv.style.alignItems = 'center';
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

    // const coordinatesHTML = `
    //     <span><span class='text-custom-light-blue-50'>x</span> ${lon}</span>
    //     <span class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</span>
    // `;

    // const locationInfoHTML = `
    //     <div
    //         class='popup-location-info-container text-custom-light-blue text-xs cursor-pointer'
    //         title="${t('click_to_copy_coordinates')}"
    //     >
    //         <div class='popup-location-info-content'
    //             data-testid='popup-location-info-content'
    //         >
    //             ${coordinatesHTML}
    //         </div>
    //     </div>
    // `;

    const coordinatesHTML = `
        <span><span style='color: var(--custom-light-blue-50);'>x</span> ${lon}</span>
        <span style='margin-left: 0.5rem;'><span style='color: var(--custom-light-blue-50);'>y</span> ${lat}</span>
    `;

    const locationInfoHTML = `
        <div 
            class='popup-location-info-container'
            style='color: var(--custom-light-blue); font-size: 0.75rem; line-height: 1rem; cursor: pointer;'
            title="${t('click_to_copy_coordinates')}"
        >
            <div class='popup-location-info-content'
                data-testid='popup-location-info-content'
            >
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

        locationInfoContent.innerHTML = `<span>${t(
            'coordinates_copied_to_clipboard'
        )}</span>`;

        setTimeout(() => {
            locationInfoContent.innerHTML = coordinatesHTML;
        }, 2000);
    });

    return popupDiv;
};

/**
 * Format the popup elements, such as hide the collapse button and action bar, disable the dock option, etc.
 * @param mapView
 */
export const formatPopupElements = (mapView: MapView): void => {
    mapView.popup.visibleElements = {
        collapseButton: false,
        actionBar: false,
    };

    mapView.popup.dockOptions = {
        buttonEnabled: false,
    };
};

/**
 * Format the popup component, such as hide the collapse button and action bar, disable the dock option, etc.
 * @param popupComponent
 */
export const formatPopupComponent = (popupComponent: ArcgisPopup): void => {
    popupComponent.hideCollapseButton = true;
    popupComponent.hideActionBar = true;
    popupComponent.headingLevel = 3;
    popupComponent.alignment = 'bottom-right';

    popupComponent.dockOptions = {
        buttonEnabled: false,
    };
};
