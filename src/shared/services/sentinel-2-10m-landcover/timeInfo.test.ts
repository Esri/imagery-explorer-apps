import * as timeInfoModule from './timeInfo';
const { getTimeExtentByYear } = timeInfoModule;

describe('getTimeExtentByYear', () => {
    const mockTimeInfo = {
        timeExtent: [
            1483228800000, // 2017-01-01T00:00:00.000Z
            1735689599000, // 2024-12-31T23:59:59.000Z
        ],
    };

    beforeAll(() => {
        global.fetch = jest.fn().mockImplementation(async () => ({
            json: async () => ({
                timeInfo: mockTimeInfo,
            }),
        }));
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    const imageryServiceURL = 'https://mocked-url.com';

    it('should return the start year in service time info if input year is before the start year', async () => {
        const { start, end } = await getTimeExtentByYear(
            2016,
            imageryServiceURL
        );
        expect(start).toBe(mockTimeInfo.timeExtent[0]);
        expect(end).toBe(mockTimeInfo.timeExtent[0]);
        expect(new Date(start).getUTCFullYear()).toBe(2017);
        expect(new Date(end).getUTCFullYear()).toBe(2017);
    });

    it('should return the end year in service time info if input year is after the end year', async () => {
        const { start, end } = await getTimeExtentByYear(
            2025,
            imageryServiceURL
        );
        expect(start).toBe(mockTimeInfo.timeExtent[1]);
        expect(end).toBe(mockTimeInfo.timeExtent[1]);
        expect(new Date(start).getUTCFullYear()).toBe(2024);
        expect(new Date(end).getUTCFullYear()).toBe(2024);
    });

    // Test for each year in the range 2017 to 2024
    // This will ensure that the function returns the correct start and end timestamps for each year
    const yearsToTest = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    it.each(yearsToTest)(
        'returns correct unix timestamp for year %i',
        async (year) => {
            const { start, end } = await getTimeExtentByYear(
                year,
                imageryServiceURL
            );

            // Both start and end should be in the input year
            const startYear = new Date(start).getUTCFullYear();
            const endYear = new Date(end).getUTCFullYear();

            expect(startYear).toBe(year);
            expect(endYear).toBe(year);
            expect(start).toBe(end);
        }
    );
});
