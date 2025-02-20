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

import {
    deduplicateImageryScenes4TemporalProfileTool,
    deduplicateListOfImageryScenes,
} from './deduplicateListOfScenes';

describe('test deduplicateListOfImageryScenes', () => {
    const data = [
        {
            formattedAcquisitionDate: '01-01',
            acquisitionDate: 20240101,
            doesNotMeetCriteria: false,
            objectId: 1,
        },
        {
            formattedAcquisitionDate: '01-01',
            acquisitionDate: 20240101,
            doesNotMeetCriteria: false,
            objectId: 2,
        },
        {
            formattedAcquisitionDate: '01-02',
            acquisitionDate: 20240102,
            doesNotMeetCriteria: false,
            objectId: 3,
        },
        {
            formattedAcquisitionDate: '01-02',
            acquisitionDate: 20240102,
            doesNotMeetCriteria: false,
            objectId: 4,
        },
    ] as any;

    it('should retain one scene per day', () => {
        const output = deduplicateListOfImageryScenes(data, null);

        expect(output.length).toBe(2);
    });

    it('should retain the scene acquired later when there are two scenes acquired on the same day', () => {
        const output = deduplicateListOfImageryScenes(data, null);

        expect(output.find((d) => d.objectId === 2)).toBeDefined();
        expect(output.find((d) => d.objectId === 4)).toBeDefined();
    });

    it('should retain the currently selected scene (even if acquired earlier) when there are two scenes acquired on the same day', () => {
        const output = deduplicateListOfImageryScenes(
            [
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: false,
                    objectId: 1,
                },
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: false,
                    objectId: 2,
                },
            ] as any,
            1
        );

        expect(output.find((d) => d.objectId === 1)).toBeDefined();
    });

    it('should prioritize retaining scenes that meet all filter criteria', () => {
        const output = deduplicateListOfImageryScenes(
            [
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: false,
                    objectId: 1,
                },
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: true,
                    objectId: 2,
                },
            ] as any,
            null
        );

        expect(output.find((d) => d.objectId === 1)).toBeDefined();
    });

    it('should prioritize retaining scenes that meet all filter criteria even if there is a selected scene that was acquired on the same day', () => {
        const output = deduplicateListOfImageryScenes(
            [
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: true,
                    objectId: 1,
                },
                {
                    formattedAcquisitionDate: '01-01',
                    acquisitionDate: 20240101,
                    doesNotMeetCriteria: false,
                    objectId: 2,
                },
            ] as any,
            1
        );

        expect(output.find((d) => d.objectId === 2)).toBeDefined();
    });
});
describe('test deduplicateImageryScenes4TemporalProfileTool', () => {
    const data = [
        {
            acquisitionYear: 2024,
            acquisitionMonth: 1,
            cloudCover: 10,
            objectId: 1,
        },
        {
            acquisitionYear: 2024,
            acquisitionMonth: 1,
            cloudCover: 5,
            objectId: 2,
        },
        {
            acquisitionYear: 2024,
            acquisitionMonth: 2,
            cloudCover: 20,
            objectId: 3,
        },
        {
            acquisitionYear: 2024,
            acquisitionMonth: 2,
            cloudCover: 15,
            objectId: 4,
        },
    ] as any;

    it('should retain one scene per month with the smallest cloud coverage', () => {
        const output = deduplicateImageryScenes4TemporalProfileTool(data);

        expect(output.length).toBe(2);
        expect(output.find((d) => d.objectId === 2)).toBeDefined();
        expect(output.find((d) => d.objectId === 4)).toBeDefined();
    });

    it('should return an empty array if input is empty', () => {
        const output = deduplicateImageryScenes4TemporalProfileTool([]);

        expect(output.length).toBe(0);
    });

    it('should retain the scene with the smallest cloud coverage when there are multiple scenes in the same month', () => {
        const output = deduplicateImageryScenes4TemporalProfileTool(data);

        expect(output.find((d) => d.objectId === 2)).toBeDefined();
        expect(output.find((d) => d.objectId === 4)).toBeDefined();
    });

    it('should retain scenes from different months', () => {
        const output = deduplicateImageryScenes4TemporalProfileTool(data);

        expect(output.length).toBe(2);
        expect(output.find((d) => d.objectId === 2)).toBeDefined();
        expect(output.find((d) => d.objectId === 4)).toBeDefined();
    });

    it('should handle a single scene correctly', () => {
        const singleSceneData = [
            {
                acquisitionYear: 2024,
                acquisitionMonth: 1,
                cloudCover: 10,
                objectId: 1,
            },
        ] as any;

        const output =
            deduplicateImageryScenes4TemporalProfileTool(singleSceneData);

        expect(output.length).toBe(1);
        expect(output.find((d) => d.objectId === 1)).toBeDefined();
    });
});
