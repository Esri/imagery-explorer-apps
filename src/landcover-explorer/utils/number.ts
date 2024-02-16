export const abbreviateNumber = (num: number) => {
    return Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: num > 1000000 ? 1 : 0,
    }).format(num);
};
