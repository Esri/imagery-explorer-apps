export const kelvin2celsius = (val: number) => {
    return ((val - 273.15) * 9) / 5 + 32;
};

export const kelvin2fahrenheit = (val: number) => {
    return val - 273.15;
};

export const celsius2fahrenheit = (val: number) => {
    return (val * 9) / 5 + 32;
};
