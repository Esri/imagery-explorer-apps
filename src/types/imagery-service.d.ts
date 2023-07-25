/**
 * A raster function information for the image services, including the name, description, help, function type,
 * and a thumbnail of preconfigured raster function templates.
 */
export type RasterFunctionInfo = {
    /**
     * name of the raster function (e.g. `Agriculture with DRA`)
     */
    name: string;
    /**
     * description of raster function (e.g. `Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied on apparent reflectance...`)
     */
    description: string;
    /**
     * label of the raster function that will be displayed in UI
     */
    label?: string;
    /**
     * datauri of the thumbnail image
     */
    thumbnail?: string;
};

export type LandsatScene = {
    objectId: number;
    /**
     * Landsat product name
     * @example LC08_L1GT_029030_20151209_20160131_01_RT
     */
    name: string;
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisitionDate in unix timestamp
     */
    acquisitionDate: number;
    /**
     * year when this scene was acquired
     */
    acquisitionYear: number;
    /**
     * month when this scene was acquired
     */
    acquisitionMonth: number;
    /**
     * percent of cloud cover
     */
    cloudCover: number;
    // /**
    //  * if true, this scene was acquired during a cloudy day
    //  */
    // isCloudy: boolean;
    /**
     * name of the satellite (e.g. 'Landsat 8')
     */
    satellite: string;
    /**
     * Landsat path number
     * @see https://landsat.gsfc.nasa.gov/about/the-worldwide-reference-system/
     */
    path: number;
    /**
     * Landsat Row number
     */
    row: number;
    /**
     * name of the sensor:
     * - OLI/TIRS combined
     * - OLI-only
     * - TIRS-only
     * - ETM+
     * - MSS
     */
    sensor: string;
    // /**
    //  * Collection category:
    //  * - Real-Time
    //  * - Tier 1
    //  * - Tier 2
    //  */
    // collectionCategory: string;
    // /**
    //  * Collection number (01, 02, …)
    //  */
    // collectionNumber: string;
    /**
     * Processing correction level (L1TP/L1GT/L1GS)
     */
    correctionLevel: string;
    /**
     * processing date in unix timestamp
     */
    processingDate: number;
    // category: number;
    // name: string;
    // best: number;
    sunElevation: number;
    sunAzimuth: number;
};

/**
 * Temporal Profile Data sampled at user selected location
 */
export type TemporalProfileData = {
    /**
     * object id of imagery scene gets sampled
     */
    objectId: number;
    /**
     * acquisitionDate of imagery scene in unix timestamp
     */
    acquisitionDate: number;
    /**
     * acquisition year of imagery scene
     */
    acquisitionYear: number;
    /**
     * acquisition month of imagery scene
     */
    acquisitionMonth: number;
    /**
     * sampled values for each band
     */
    values: number[];
};
