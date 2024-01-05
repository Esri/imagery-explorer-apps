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
                acquisitiondate: 1644344560000,
                cloudcover: 0.3,
                name: 'LC08_L2SP_040037_20220208_20220222_02_T1',
                best: 20960037,
            },
        },
        {
            attributes: {
                objectid: 2466756,
                acquisitiondate: 1645035740000,
                cloudcover: 0.5,
                name: 'LC09_L2SP_040036_20220216_20220225_02_T1',
                best: 32960036,
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
});
