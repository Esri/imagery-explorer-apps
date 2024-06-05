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

import Point from '@arcgis/core/geometry/Point';
import { calcRadarIndex } from '@shared/services/sentinel-1/helper';

// export const getLoadingIndicator = () => {
//     const popupDiv = document.createElement('div');
//     popupDiv.innerHTML = `<calcite-loader scale="s"></calcite-loader>`;
//     return popupDiv;
// };

export const getMainContent = (values: number[], mapPoint: Point) => {
    const lat = Math.round(mapPoint.latitude * 1000) / 1000;
    const lon = Math.round(mapPoint.longitude * 1000) / 1000;

    const waterIndex = calcRadarIndex('water', values).toFixed(3);

    const waterAnomalyIndex = calcRadarIndex('water anomaly', values).toFixed(
        3
    );

    return `
        <div class='text-custom-light-blue text-xs'>
            <div class='mb-2'>
                <span>${values[0]}, ${values[1]}</span><br />
                <span><span class='text-custom-light-blue-50'>Water Index:</span> ${waterIndex}</span><br />
                <span><span class='text-custom-light-blue-50'>Water Anomaly:</span> ${waterAnomalyIndex}</span>
            </div>
            <div class='flex'>
                <p><span class='text-custom-light-blue-50'>x</span> ${lon}</p>
                <p class='ml-2'><span class='text-custom-light-blue-50'>y</span> ${lat}</p>
            </div>
        </div>
    `;
};
