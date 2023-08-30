export const canBeConvertedToNumber = (input: string) => {
    // Use a regular expression to check if the entire string is a valid number format
    return /^-?\d+(\.\d+)?$/.test(input);
};
