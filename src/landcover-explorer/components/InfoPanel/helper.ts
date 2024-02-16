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

import { HistoricalLandCoverData } from '@shared/services/sentinel-2-10m-landcover/computeHistograms';

export const saveHistoricalLandCoverDataAsCSV = (
    data: HistoricalLandCoverData[]
) => {
    const headers = ['Land Cover Class', 'Year', 'Area in Acres'];

    const lines = ['data:text/csv;charset=utf-8,' + headers.join(',')];

    for (const item of data) {
        const { areaByYear, landCoverClassificationData } = item;

        for (const d of areaByYear) {
            const { year, area } = d;

            const row = [landCoverClassificationData.ClassName, year, area];

            lines.push(row.join(','));
        }
    }

    const csvData = lines.join('\r\n');

    const link = document.createElement('a');
    link.download = 'land-cover-in-acres.csv';
    link.href = encodeURI(csvData);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
