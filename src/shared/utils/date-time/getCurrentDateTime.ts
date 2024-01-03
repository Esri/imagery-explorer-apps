import { APP_NAME } from '@shared/config';

/**
 * Get current year using local date
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentYear = () => {
    return new Date().getFullYear();
};

/**
 * Get current month using local date
 * @returns current year in format of `yyyy`, e.g., 2023
 */
export const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
};
