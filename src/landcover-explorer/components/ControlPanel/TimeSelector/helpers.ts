export const getSliderTickValues = (dates: Date[], maxTicks: number) => {
    if (dates.length === 0) {
        return [];
    }

    // Sort the dates to ensure they're in chronological order
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());

    // const maxTicks = 10;
    const total = sortedDates.length;

    if (total <= maxTicks) {
        return sortedDates.map((date) => date.getTime());
    }

    const interval = Math.floor(total / (maxTicks - 1));
    const tickValues = [];

    for (let i = 0; i < maxTicks; i++) {
        tickValues.push(sortedDates[i * interval].getTime());
    }

    return tickValues;
};
