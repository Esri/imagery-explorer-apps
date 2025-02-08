/**
 * Shortens a Landsat scene ID by extracting and joining specific parts.
 *
 * @param sceneId - The full Landsat scene ID.
 * @returns The shortened Landsat scene ID.
 *
 * The Landsat product name LC08_L2SP_125039_20240321_20240403_02_T1 follows a standardized naming convention.
 * Here's a breakdown of each component:
 *
 * 1. LC08
 *    - L: Refers to the Landsat mission.
 *    - C: Indicates the Operational Land Imager (OLI) and Thermal Infrared Sensor (TIRS) instruments on board.
 *    - 08: Specifies Landsat 8 as the satellite that acquired this image.
 * 2. L2SP
 *    - L2: This is a Level-2 product, meaning it includes surface reflectance and surface temperature data (corrected for atmospheric effects).
 *    - SP: Stands for Standard Product, indicating the processing level and format.
 * 3. 125039
 *    - This is the path/row number in the Worldwide Reference System-2 (WRS-2), which is used to map Landsat imagery:
 *      - 125: The path number (satellite's orbit path).
 *      - 039: The row number (latitude position on Earth within that path).
 * 4. 20240321
 *    - The acquisition date when the image was captured:
 *      - 2024-03-21 = March 21, 2024.
 * 5. 20240403
 *    - The processing date when the image was processed and made available:
 *      - 2024-04-03 = April 3, 2024.
 * 6. 02
 *    - The processing version of the product:
 *      - 02 indicates it’s the second processing version, meaning the data has been reprocessed with updated algorithms or corrections.
 * 7. T1
 *    - T1 stands for Tier 1 data, which indicates:
 *      - The image meets the highest radiometric and geometric quality standards.
 *      - It is suitable for time-series analysis and scientific applications.
 *      - If the label were T2 (Tier 2), the data would have lower geometric accuracy and might need additional corrections.
 *
 * @param sceneId - The full Landsat scene ID to be shortened.
 * @returns The shortened Landsat scene ID containing only the satellite, product level, path/row, and acquisition date.
 */
export const shortenLandsatSceneId = (sceneId: string): string => {
    if (!sceneId) {
        return '';
    }

    const [satellite, productLevel, pathRow, acquisitionDate] =
        sceneId.split('_');

    const parts2Keep = [
        satellite,
        productLevel,
        pathRow,
        acquisitionDate,
    ].filter((part) => part !== undefined);

    return parts2Keep.join('_');
};
