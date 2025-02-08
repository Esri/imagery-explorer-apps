/**
 * Shortens the Sentinel-2 scene ID.
 *
 * @param sceneId - The full Sentinel-2 scene ID.
 * @returns The shortened Sentinel-2 scene ID containing only the satellite, processing level, acquisition date, and relative orbit number.
 *
 * The Sentinel-2 product name S2B_MSIL2A_20240212T183509_N0510_R027_T11SMT_20240212T224007 follows a standardized naming convention.
 * Here's a breakdown of each component:
 *
 * S2B: Refers to the satellite that captured the data. In this case:
 * - S2A or S2B are the two satellites in the Sentinel-2 mission.
 * - S2B means this image was captured by Sentinel-2B.
 *
 * MSIL2A: Describes the processing level and product type.
 * - MSI stands for MultiSpectral Instrument.
 * - L2A means it's a Level-2A product, which includes bottom-of-atmosphere (BOA) reflectance after atmospheric correction (useful for analysis).
 *
 * 20240212T183509: The sensing date and time when the data was acquired.
 * - 20240212 = 12th February 2024.
 * - T183509 = 18:35:09 UTC (time of data acquisition).
 *
 * N0510: The processing baseline number.
 * - N0510 indicates the version of the processing software or algorithm used.
 *
 * R027: The relative orbit number.
 * - R027 means the image was taken on the 27th orbit in the satellite's 10-day repeat cycle.
 *
 * T11SMT: The tile identifier.
 * - T11SMT refers to the specific UTM grid tile (based on the MGRS - Military Grid Reference System) that the image covers.
 * - 11S: UTM zone 11, northern hemisphere.
 * - MT: 100 km grid square identifier.
 *
 * 20240212T224007: The product generation date and time.
 * - 20240212 = 12th February 2024.
 * - T224007 = 22:40:07 UTC (time the product was generated).
 *
 */
export const shortenSentinel2SceneId = (sceneId: string): string => {
    if (!sceneId) {
        return '';
    }
    const [
        satellite,
        processingLevel,
        acquisitionDate,
        processingBaseline,
        relativeOrbitNumber,
        tileId,
        productGenerationDate,
    ] = sceneId.split('_');

    const parts2Keep = [
        satellite,
        processingLevel,
        acquisitionDate,
        relativeOrbitNumber,
    ].filter((part) => part !== undefined);

    return parts2Keep.join('_');
};
