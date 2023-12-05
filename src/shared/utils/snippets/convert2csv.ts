/**
 * Convert an array of strings to CSV format.
 * @param headers - An array of strings representing the CSV header row.
 * @param rows - An array of arrays of strings representing the data rows.
 * @returns A string in CSV format.
 */
export const convert2csv = (headers: string[], rows: string[][]): string => {
    let str = '';

    // set csv headers
    str += headers.join(',');
    str += '\r\n';

    // Iterate through each row and convert to CSV format
    for (const row of rows) {
        const rowStr = row.join(',');
        str += rowStr + '\r\n';
    }

    return str;
};
