/**
 * Generates an array of tick values (as timestamps) for a slider based on the provided dates and the maximum number of ticks.
 *
 * The function sorts the input dates chronologically and determines evenly spaced tick positions,
 * ensuring that the number of ticks does not exceed `maxTicks`. If the number of dates is less than or equal to `maxTicks`,
 * all dates are used as ticks. Otherwise, ticks are distributed as evenly as possible across the range.
 *
 * @param dates - An array of `Date` objects to generate tick values from.
 * @param maxTicks - The maximum number of ticks to display on the slider.
 * @returns An array of numbers representing the selected tick values as Unix timestamps (milliseconds since epoch).
 */

/** Sort the dates to ensure they're in chronological order */

/** Calculate the starting index to center align the ticks */
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

    // Calculate the starting index to center align the ticks
    const ticksToShow = maxTicks;
    // Calculate the total width (in indices) that the ticks will span
    const totalTicksWidth = (ticksToShow - 1) * interval;
    // Calculate the starting index to center the ticks within the available dates
    const startIndex = Math.max(
        Math.floor((total - 1 - totalTicksWidth) / 2),
        0
    );

    for (let i = 0; i < ticksToShow; i++) {
        const idx = startIndex + i * interval;
        if (idx >= total) break;
        tickValues.push(sortedDates[idx].getTime());
    }

    return tickValues;
};
