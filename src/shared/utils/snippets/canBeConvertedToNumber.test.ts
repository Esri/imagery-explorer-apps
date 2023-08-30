import { canBeConvertedToNumber } from './canBeConvertedToNumber';

test('test decimal2binary', () => {
    expect(canBeConvertedToNumber('123')).toBeTruthy();
    expect(canBeConvertedToNumber('3.14')).toBeTruthy();
    expect(canBeConvertedToNumber('NoData')).toBeFalsy();
    expect(canBeConvertedToNumber('abc')).toBeFalsy();
    expect(canBeConvertedToNumber('123abc')).toBeFalsy();
});
