/**
 * Adds leading zeros to a number to match the specified size.
 * @param {number} num - The number to which leading zeros will be added.
 * @param {number} size - The desired size of the output string (including leading zeros).
 * @returns {string} - The string representation of the number with leading zeros.
 */
export const addLeadingZero = (num: number, size: number): string => {
    let output = num.toString();

    while (output.length < size) {
        output = '0' + output;
    }

    return output;
};
