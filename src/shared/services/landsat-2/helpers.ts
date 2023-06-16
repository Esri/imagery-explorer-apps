import { SpectralIndex } from '@shared/store/Analysis/reducer';

type LandsatProductInfo = {
    /**
     * name of the sensor:
     * - OLI/TIRS combined
     * - OLI-only
     * - TIRS-only
     * - ETM+
     * - MSS
     */
    sensor: string;
    /**
     * Collection category:
     * - Real-Time
     * - Tier 1
     * - Tier 2
     */
    collectionCategory: string;
    /**
     * Collection number (01, 02, …)
     */
    collectionNumber: string;
    /**
     * Processing correction level (L1TP/L1GT/L1GS)
     */
    correctionLevel: string;
    /**
     * processing date in unix timestamp
     */
    processingDate: number;
};
/**
 * Parse Info of a Landsat Scene using its Product ID.
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
export const parseLandsatInfo = (productId: string): LandsatProductInfo => {
    const [
        LXSS,
        CORRECTION_LEVEL,
        // DO NOT COMMENT THE LINE BELOW OUT, NEED IT TO BE HERE TO MAKE SURE THE ORDER OF OTHER ITEMS BELOW IS CORRECT
        PPPRRR,
        // DO NOT COMMENT THE LINE BELOW OUT, NEED IT TO BE HERE TO MAKE SURE THE ORDER OF OTHER ITEMS BELOW IS CORRECT
        ACQUISITION_DATE_YYYYMMDD,
        PROCESSING_DATE_YYYYMMDD,
        COLLECTION_NUMBER,
        COLLECTION_CATEGORY,
    ] = productId.split('_');

    const sensorNameLookupTable = {
        C: 'OLI/TIRS combined',
        O: 'OLI-only',
        T: 'TIRS-only',
        E: 'ETM+',
        M: 'MSS',
    };

    const collectionCategoryLookupTable = {
        RT: 'Real-Time',
        T1: 'Tier 1',
        T2: 'Tier 2',
    };

    const sensorCode = LXSS[1];

    const processingDate = new Date(
        +PROCESSING_DATE_YYYYMMDD.slice(0, 4), // year
        +PROCESSING_DATE_YYYYMMDD.slice(4, 6) - 1, // month index
        +PROCESSING_DATE_YYYYMMDD.slice(6) // day
    );

    return {
        sensor: sensorNameLookupTable[sensorCode] || 'N/A',
        collectionCategory:
            collectionCategoryLookupTable[COLLECTION_CATEGORY] || 'N/A',
        collectionNumber: COLLECTION_NUMBER,
        correctionLevel: CORRECTION_LEVEL,
        processingDate: processingDate.getTime(),
    };
};

export const getMosaicRuleByObjectId = (objectId: number) => {
    return {
        ascending: false,
        lockRasterIds: [objectId],
        mosaicMethod: 'esriMosaicLockRaster',
        where: `objectid in (${objectId})`,
    };
};

export const getRasterFunctionByMaskMethod = (spectralIndex: SpectralIndex) => {
    return {
        rasterFunction: 'BandArithmetic',
        rasterFunctionArguments: {
            Metho: 0,
            BandIndexes: '0+(1*((B3-B6)/(B3+B6)))',
        },
        outputPixelType: 'F32',
    };
};
