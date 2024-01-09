import { Extent } from '@arcgis/core/geometry';

/**
 * Returns an Extent that's been shifted to within +/- 180.
 * The map view's extent can go out of range after the user drags the map
 * across the international date line.
 *
 * Therefore, normalizing the Extent is essential to ensure the coordinates are within the
 * correct range. This function takes an Extent object as input and shifts it to ensure
 * corrdinate values are within the range of -180 to +180 degrees (or equivelant projected values).
 *
 * @param extent - The Extent object representing the geographic area.
 * @returns {Extent} - The normalized Extent object with longitude values within the range of +/- 180 degrees.
 */
export const getNormalizedExtent = (extent: Extent): Extent => {
    return extent.clone().normalize()[0];
};
