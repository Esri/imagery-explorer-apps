import { celsius2fahrenheit } from '@shared/utils/temperature-conversion';

/**
 * min value in celcius degree (-30) of the y scale domain for surface temp chart
 */
export const SURFACE_TEMP_MIN_CELSIUS = -30;
/**
 * max value in celcius degree (100) of the y scale domain for surface temp chart
 */
export const SURFACE_TEMP_MAX_CELSIUS = 90;

export const SURFACE_TEMP_MIN_FAHRENHEIT = celsius2fahrenheit(
    SURFACE_TEMP_MIN_CELSIUS
);

export const SURFACE_TEMP_MAX_FAHRENHEIT = celsius2fahrenheit(
    SURFACE_TEMP_MAX_CELSIUS
);
