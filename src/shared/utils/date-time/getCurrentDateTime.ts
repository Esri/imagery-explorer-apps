import { APP_NAME } from '@shared/config';

/**
 * Get current year using local date
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentYear = () => {
    // USGS has temporarily paused the processing of Landsat Level-1 Product.
    // Therefore we should use 2023 as current year for Landsat Explorer app
    // until USGS has this issue reseoved.
    if (APP_NAME === 'landsat' || APP_NAME === 'landsat-surface-temp') {
        return 2023;
    }

    return new Date().getFullYear();
};

/**
 * Get current month using local date
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
};
