type Sentinel2MissionId = 'S2A' | 'S2B';

type Sentinel2ProductInfo = {
    /**
     * the mission ID
     */
    missionID: Sentinel2MissionId;
    /**
     * Relative Orbit number
     */
    relativeOrbit: string;
    /**
     * Tile Number field
     */
    tileNumber: string;
    /**
     * Processing Baseline number
     */
    processingBaselineNumber: string;
};

/**
 * Parse Info of a Sentinel-2 Scene using its Product ID/Name.
 *
 * @example S2B_MSIL2A_20240701T182919_N0510_R027_T11SMT_20240702T012050
 * @see https://sentiwiki.copernicus.eu/web/s2-products
 */
export const parseSentinel2ProductInfo = (
    productId: string
): Sentinel2ProductInfo => {
    const [
        MMM, // the mission ID(S2A/S2B)
        MSIXXX, // MSIL1C denotes the Level-1C product level/ MSIL2A denotes the Level-2A product level
        YYYYMMDDHHMMSS, // the datatake sensing start time
        Nxxyy, // the Processing Baseline number (e.g. N0204)
        ROOO, // Relative Orbit number (R001 - R143),
        Txxxxx, // Tile Number field
    ] = productId.split('_');

    return {
        missionID: MMM as Sentinel2MissionId,
        relativeOrbit: ROOO,
        tileNumber: Txxxxx,
        processingBaselineNumber: Nxxyy,
    };
};
