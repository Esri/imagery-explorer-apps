/**
 * Take a matrix (2D array) as input and averages the values column-wise to produce a single array containing the column-wise averages.
 * @param matrix
 * @returns
 */
export const averageMatrixColumns = (matrix: number[][]): number[] => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    const columnSums = new Array(numCols).fill(0);

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            columnSums[col] += matrix[row][col];
        }
        columnSums[col] /= numRows; // Calculate the average for each column
    }

    return columnSums;
};
