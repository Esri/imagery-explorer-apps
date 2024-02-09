/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
