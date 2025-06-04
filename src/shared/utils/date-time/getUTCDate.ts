export const getUTCDate = (year: number, month: number, day: number): Date => {
    if (month <= 0) {
        month = 0;
    }

    if (month > 12) {
        month = 12;
    }

    return new Date(Date.UTC(year, month - 1, day));
};
