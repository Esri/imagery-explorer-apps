import { celsius2fahrenheit, kelvin2celsius, kelvin2fahrenheit } from '.';

describe('test temperature conversion', () => {
    test('kelvin 2 celsius', () => {
        expect(kelvin2celsius(0)).toBe(-273.15);
        expect(kelvin2celsius(1000)).toBe(726.85);
    });

    test('kelvin 2 fahrenheit', () => {
        expect(Math.trunc(kelvin2fahrenheit(100))).toBe(-279);
        expect(Math.trunc(kelvin2fahrenheit(1000))).toBe(1340);
    });

    test('celsius 2 fahrenheit', () => {
        expect(celsius2fahrenheit(0)).toBe(32);
        expect(celsius2fahrenheit(100)).toBe(212);
    });
});
