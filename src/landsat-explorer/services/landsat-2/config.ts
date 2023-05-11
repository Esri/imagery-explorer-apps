/**
 * Field Names Look-up table for LandsatC2L2 (ImageServer)
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer
 */
export const FIELD_NAMES = {
    OBJECTID: 'objectid',
    NAME: 'name',
    MINPS: 'minps',
    MAXPS: 'maxps',
    LOWPS: 'lowps',
    HIGHPS: 'highps',
    CATEGORY: 'category',
    PRODUCT_NAME: 'productname',
    BEST: 'best',
    /**
     * The Landsat product identifier includes the Collection processing levels, processing date,
     * collection number, and collection tier category: `LXSS_LLLL_PPPRRR_YYYYMMDD_yyyymmdd_CC_TX`
     *
     * Where:
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
    LANDSAT_PRODUCT_ID: 'landsat_product_id',
    PRODUCT_ID_L1: 'product_id_l1',
    CLOUD_COVER: 'cloudcover',
    ACQUISITION_DATE: 'acquisitiondate',
    SUNAZIMUTH: 'sunazimuth',
    SUNELEVATION: 'sunelevation',
    SENSORNAME: 'sensorname',
    WRS_PATH: 'wrs_path',
    WRS_ROW: 'wrs_row',
    PR: 'pr',
    DAYOFYEAR: 'dayofyear',
    MONTH: 'month',
    DATASET_ID: 'dataset_id',
    SHAPE: 'shape',
    LANDSAT_SCENE_ID: 'landsat_scene_id',
};
