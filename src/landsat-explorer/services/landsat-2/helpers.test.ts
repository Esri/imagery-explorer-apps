import { parseLandsatInfo } from './helpers';

describe('test parseLandsatInfo', () => {
    it('should return parsed info about a Landsat scene', () => {
        const {
            sensor,
            collectionCategory,
            collectionNumber,
            correctionLevel,
            processingDate,
        } = parseLandsatInfo('LC08_L1GT_029030_20151209_20160131_01_RT');

        expect(sensor).toBe('OLI/TIRS combined');
        expect(collectionCategory).toBe('Real-Time');
        expect(collectionNumber).toBe('01');
        expect(correctionLevel).toBe('L1GT');

        expect(new Date(processingDate).getFullYear()).toBe(2016);
        expect(new Date(processingDate).getMonth()).toBe(0);
        expect(new Date(processingDate).getDate()).toBe(31);
    });
});
