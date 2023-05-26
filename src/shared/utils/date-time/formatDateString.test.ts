import { getFormatedDateString } from './formatDateString';

describe('test getFormatedDateString', () => {
    it('should return formated date string when input year, month, day are defined', () => {
        expect(
            getFormatedDateString({
                year: 2023,
                month: 3,
                day: 15,
            })
        ).toBe('2023-03-15');
    });

    it('should return formated date string when input date is defined', () => {
        expect(
            getFormatedDateString({
                date: 1683028800000,
            })
        ).toBe('2023-05-02');
    });
});
