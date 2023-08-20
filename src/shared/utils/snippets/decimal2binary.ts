export const decimal2binary = (decimal: number): string => {
    if (!decimal) {
        return '0';
    }

    let binary = '';

    while (decimal > 0) {
        binary = (decimal % 2).toString() + binary;
        decimal = Math.floor(decimal / 2);
    }

    return binary;
};
