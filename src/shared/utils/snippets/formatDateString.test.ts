import { unixtimestamp2FormattedDateString } from './formatDateString';

describe('test formatDateString', () => {
    it('should return formatted date string', () => {
        expect(unixtimestamp2FormattedDateString(1684527920842)).toBe(
            '2023-05-19'
        );
    });
});
