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

import {
    calcSpectralIndex,
    getValFromThermalBand,
} from '@shared/services/landsat-level-2/helpers';
import Point from '@arcgis/core/geometry/Point';

// export const getLoadingIndicator = () => {
//     const popupDiv = document.createElement('div');
//     popupDiv.innerHTML = `<calcite-loader scale="s"></calcite-loader>`;
//     return popupDiv;
// };

export const getMainContent = (values: number[], mapPoint: Point) => {
    const lat = Math.round(mapPoint.latitude * 1000) / 1000;
    const lon = Math.round(mapPoint.longitude * 1000) / 1000;

    // const popupDiv = document.createElement('div');

    let surfaceTempInfo = 'No Data';

    // only update surface temp info if the thermal band does not contain bad data
    if (getValFromThermalBand(values) !== null) {
        /**
         * Degree Symbol for Farhenheit: ℉
         */
        const farhenheitSign = `&#176;F`;

        /**
         * Degree Symbol for Celcius: C
         */
        const celciusSign = `&#176;C`;

        const surfaceTempFarhenheit =
            calcSpectralIndex('temperature farhenheit', values).toFixed(0) +
            farhenheitSign;

        const surfaceTempCelcius =
            calcSpectralIndex('temperature celcius', values).toFixed(0) +
            celciusSign;

        surfaceTempInfo = `${surfaceTempFarhenheit} / ${surfaceTempCelcius}`;
    }

    const vegetationIndex = calcSpectralIndex('vegetation', values).toFixed(3);

    const waterIndex = calcSpectralIndex('water', values).toFixed(3);

    return `
        <div class='text-custom-light-blue text-xs'>
            <div class='mb-2'>
                <span><span class='text-custom-light-blue-50'>Surface Temp:</span> ${surfaceTempInfo}</span><br />
                <span><span class='text-custom-light-blue-50'>NDVI:</span> ${vegetationIndex}</span>
                <span class='ml-2'><span class='text-custom-light-blue-50'>MNDWI:</span> ${waterIndex}</span>
            </div>
            <div class='flex'>
                <p><span class='text-custom-light-blue-50'>x</span> ${lon}</p>
                <p class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</p>
            </div>
        </div>
    `;
};
