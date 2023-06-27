import { isMobileDevice } from 'helper-toolkit-ts';

/**
 * default format that will be used to format datetime info in the app.
 *
 * Here is an example of a formatted datetime using this format
 * @example
 * `Feb 03, 2023`
 */
export const DATE_FORMAT = `MMM dd, yyyy`;

/**
 * if true, user is using this app via a mobile device
 */
export const IS_MOBILE_DEVICE = isMobileDevice();
