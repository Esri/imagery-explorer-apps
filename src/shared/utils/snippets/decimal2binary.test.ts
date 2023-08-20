import { decimal2binary } from './decimal2binary';

test('test decimal2binary', () => {
    expect(decimal2binary(0)).toBe('0');
    expect(decimal2binary(1)).toBe('1');
    expect(decimal2binary(10)).toBe('1010');
    expect(decimal2binary(100)).toBe('1100100');
    expect(decimal2binary(521)).toBe('1000001001');
    expect(decimal2binary(5000)).toBe('1001110001000');
});
