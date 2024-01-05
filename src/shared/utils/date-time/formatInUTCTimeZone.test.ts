import {
    formatFormattedDateStrInUTCTimeZone,
    formatInUTCTimeZone,
} from './formatInUTCTimeZone';

describe('test formatInUTCTimeZone', () => {
    it('should return formatted date in UTC time zone', () => {
        expect(formatInUTCTimeZone(1704067200000)).toBe('Jan 01, 2024');
    });
});

describe('test formatFormattedDateStrInUTCTimeZone', () => {
    it('should return formatted date in UTC time zone', () => {
        expect(formatFormattedDateStrInUTCTimeZone('2024-01-01')).toBe(
            'Jan 01, 2024'
        );
    });
});
