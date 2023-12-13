/**
 * Calculate the trend line for the input vals array, that uses the equation of `y = mx + b`.
 *
 * @param vals input values that will be used to calculate the trend line
 * @returns [y1, y2] y values of the starting and ending points that can be used to plot the trend line
 */
export const calcTrendLine = (vals: number[]): number[] => {
    const indice: number[] = [];

    for (let i = 0; i < vals.length; i++) {
        indice.push(i);
    }

    // Step 1: Calculate the means for x and y axis
    const xMean = indice.reduce((acc, val) => acc + val, 0) / indice.length;
    const yMean = vals.reduce((acc, val) => acc + val, 0) / vals.length;

    /**
     * Step 2: Calculate the slope (m)
     * The letter 'm' in the equation represents the slope of the line.
     * The slope is a measure of how steep the line is. It tells you how much y changes for a given change in x.
     * Mathematically, the slope is the ratio of the change in y to the change in x
     */
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < indice.length; i++) {
        numerator += (indice[i] - xMean) * (vals[i] - yMean);
        denominator += (indice[i] - xMean) ** 2;
    }

    const slope = numerator / denominator;

    /**
     * Step 3: Calculate the y-intercept (b)
     * The letter 'b' represents the y-intercept. The y-intercept is the point at which the line intersects the y-axis (where x = 0).
     * In other words, it is the value of y when x is zero.
     */
    const yIntercept = yMean - slope * xMean;

    return [yIntercept, indice[indice.length - 1] * slope + yIntercept];
};
