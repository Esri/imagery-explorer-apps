import { getAcquisitionDates } from './getAcquisitionDates';

const mockedData = {
    objectIdFieldName: 'objectid',
    features: [
        {
            attributes: {
                objectid: 2461078,
                acquisitiondate: 1644344536000,
                cloudcover: 0.0053,
                name: 'LC08_L2SP_040036_20220208_20220222_02_T1',
                best: 26960036,
            },
        },
        {
            attributes: {
                objectid: 2461079,
                acquisitiondate: 1644344560000,
                cloudcover: 0.057000000000000002,
                name: 'LC08_L2SP_040037_20220208_20220222_02_T1',
                best: 20960037,
            },
        },
        {
            attributes: {
                objectid: 2466756,
                acquisitiondate: 1645035740000,
                cloudcover: 0.031300000000000001,
                name: 'LC09_L2SP_040036_20220216_20220225_02_T1',
                best: 32960036,
            },
        },
    ],
    exceededTransferLimit: true,
};

describe('test getAcquisitionDates', () => {
    it('should return acquisition date data', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockedData),
        });

        const response = await getAcquisitionDates({
            year: 2022,
            cloudCover: 0.1,
            mapExtent: {
                xmin: -13064000.625930952,
                ymin: 4028616.606602813,
                xmax: -13017087.399820989,
                ymax: 4040521.6737582134,
                spatialReference: { wkid: 102100 },
            },
        });

        expect(response.length).toBe(3);

        expect(response[0]).toMatchObject({
            acquisitionDate: 1644344536000,
            formattedAcquisitionDate: '2022-02-08',
            cloudCover: 0.0053,
            name: 'LC08_L2SP_040036_20220208_20220222_02_T1',
            best: 26960036,
        });
    });
});
