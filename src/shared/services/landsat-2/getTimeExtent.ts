import { ImageryServiceTimeExtentData } from '@typing/imagery-service';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';

let timeExtentData: ImageryServiceTimeExtentData = null;

/**
 * Get Landsat layer's time extent
 * @returns TimeExtentData
 *
 * @example
 * Usage
 * ```
 * getTimeExtent()
 * ```
 *
 * Returns
 * ```
 * {
 *   start: 1363622294000,
 *   end: 1683500585000
 * }
 * ```
 */
export const getTimeExtent =
    async (): Promise<ImageryServiceTimeExtentData> => {
        if (timeExtentData) {
            return timeExtentData;
        }

        try {
            const res = await fetch(`${LANDSAT_LEVEL_2_SERVICE_URL}?f=json`);

            if (!res.ok) {
                throw new Error('failed to fetch JSON for Landsat-2 service');
            }

            const data = await res.json();

            const [start, end] = data?.timeInfo?.timeExtent || [];

            return (timeExtentData = {
                start,
                end,
            });
        } catch (error) {
            console.error(error);
        }
    };
