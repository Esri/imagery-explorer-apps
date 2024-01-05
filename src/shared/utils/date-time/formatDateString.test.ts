import {
    formattedDateString2Unixtimestamp,
    getFormatedDateString,
} from './formatDateString';

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

    it('should return formated date in UTC time zone', () => {
        expect(
            getFormatedDateString({
                date: 1704067200000,
            })
        ).toBe('2024-01-01');
    });
});

describe('test formattedDateString2Unixtimestamp', () => {
    it('should return unix timestamp of the formatted date in UTC time zome', () => {
        expect(formattedDateString2Unixtimestamp('2024-01-01')).toBe(
            1704067200000
        );
    });
});
