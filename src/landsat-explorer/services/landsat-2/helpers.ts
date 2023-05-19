/**
 * Parse Landsat Product ID and get information about this Landsat Scene
 *
 * The Landsat product identifier includes the Collection processing levels, processing date,
 * collection number, and collection tier category: `LXSS_LLLL_PPPRRR_YYYYMMDD_yyyymmdd_CC_TX`:
 *
 * - L = Landsat
 * - X = Sensor (“C”=OLI/TIRS combined, “O”=OLI-only, “T”=TIRS-only, “E”=ETM+, “T”=“TM, “M”=MSS)
 * - SS = Satellite (”07”=Landsat 7, “08”=Landsat 8)
 * - LLL = Processing correction level (L1TP/L1GT/L1GS)
 * - PPP = WRS path
 * - RRR = WRS row
 * - YYYYMMDD = Acquisition year, month, day
 * - yyyymmdd - Processing year, month, day
 * - CC = Collection number (01, 02, …)
 * - TX = Collection category (“RT”=Real-Time, “T1”=Tier 1, “T2”=Tier 2)
 *
 * @example LC08_L1GT_029030_20151209_20160131_01_RT
 * @see https://www.usgs.gov/faqs/what-naming-convention-landsat-collections-level-1-scenes
 */
const parseLandsatProductId = (productId: string) => {
    const [
        LXSS,
        CORRECTION_LEVEL,
        PPPRRR,
        ACQUISITION_DATE_YYYYMMDD,
        PROCESSING_DATE_YYYYMMDD,
        COLLECTION_NUMBER,
        COLLECTION_CATEGORY,
    ] = productId.split('_');
};
