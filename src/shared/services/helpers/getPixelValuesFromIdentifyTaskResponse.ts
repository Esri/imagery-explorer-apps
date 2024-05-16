import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';
import { IdentifyTaskResponse } from './identify';

/**
 * Get pixel values from Identify Task Response
 * @param res
 * @returns
 */
export const getPixelValuesFromIdentifyTaskResponse = (
    res: IdentifyTaskResponse
): number[] => {
    let bandValues: number[] = null;

    if (res?.value && res?.value !== 'NoData') {
        // get pixel values from the value property first
        bandValues = res?.value.split(', ').map((d) => +d);
    } else if (res?.properties?.Values[0]) {
        bandValues = res?.properties?.Values[0].split(' ').map((d) => {
            if (canBeConvertedToNumber(d) === false) {
                return null;
            }

            return +d;
        });
    }

    return bandValues;
};
