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

import { getDateRangeForYear } from '@shared/utils/date-time/getTimeRange';
import { getLandsatScenes } from './getLandsatScenes';

const mockedData = {
    objectIdFieldName: 'objectid',
    features: [
        {
            attributes: {
                objectid: 2461078,
                acquisitiondate: 1644344536000,
                cloudcover: 0.1,
                name: 'LC08_L2SP_040036_20220208_20220222_02_T1',
                best: 26960036,
            },
        },
        {
            attributes: {
                objectid: 2461079,
                /**
                 * Date and time (GMT): Monday, January 1, 2024 12:00:00 AM
                 * Date and time (PST): Sunday, December 31, 2023 4:00:00 PM GMT-08:00
                 */
                acquisitiondate: 1704067200000,
                cloudcover: 0.3,
                name: 'LC08_L2SP_040037_20220208_20220222_02_T1',
                best: 20960037,
            },
        },
        {
            attributes: {
                objectid: 8596293,
                /**
                 * Date and time (GMT): Monday, January 1, 2024 12:00:00 AM
                 * Date and time (PST): Sunday, December 31, 2023 4:00:00 PM GMT-08:00
                 */
                acquisitiondate: 1673247395000,
                cloudcover: 0.142,
                name: 'LC09_L2SP_162036_20230109_20230111_02_T1',
                best: 8067.7,
            },
        },
    ],
    exceededTransferLimit: true,
};

describe('test getLandsatScenes', () => {
    it('should return formatted landsat scenes', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockedData),
        });

        const response = await getLandsatScenes({
            acquisitionDateRange: getDateRangeForYear(2022),
            // cloudCover: 0.1,
            mapPoint: [-105, 40],
            abortController: new AbortController(),
        });

        expect(response.length).toBe(3);

        expect(response[0]).toMatchObject({
            formattedAcquisitionDate: '2022-02-08',
            // isCloudy: false,
        });
    });

    it('should return formatted acquisition date in GMT Time Zone', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockedData),
        });

        const response = await getLandsatScenes({
            acquisitionDateRange: getDateRangeForYear(2022),
            // cloudCover: 0.1,
            mapPoint: [-105, 40],
            abortController: new AbortController(),
        });

        expect(response[1]).toMatchObject({
            formattedAcquisitionDate: '2024-01-01',
            // isCloudy: false,
        });

        expect(response[2]).toMatchObject({
            formattedAcquisitionDate: '2023-01-09',
            // isCloudy: false,
        });
    });
});
