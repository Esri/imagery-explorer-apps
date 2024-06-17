import { deduplicateListOfImageryScenes } from './deduplicateListOfScenes';

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
