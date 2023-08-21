import { decimal2binary } from '@shared/utils/snippets/decimal2binary';
import {
    kelvin2fahrenheit,
    kelvin2celsius,
} from '@shared/utils/temperature-conversion';
import { SpectralIndex } from '@typing/imagery-service';

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
 * Landsat Band Index by Spectral Index
 *
 * Here is the list of Landsat Bands:
 * - Band 1: Coastal aerosol (0.43 - 0.45 µm)
 * - Band 2: Blue (0.450 - 0.51 µm)
 * - Band 3: Green (0.53 - 0.59 µm)
 * - Band 4: Red (0.64 - 0.67 µm)
 * - Band 5: Near-Infrared (0.85 - 0.88 µm)
 * - Band 6: SWIR 1 (1.57 - 1.65 µm)
 * - Band 7: SWIR 2 (2.11 - 2.29 µm)
 * - Band 8: QA Band
 * - Band 8: Surface Temp
 *
 * @see https://pro.arcgis.com/en/pro-app/3.0/help/analysis/raster-functions/band-arithmetic-function.htm
 * @see https://www.esri.com/about/newsroom/arcuser/spectral-library/
 */
const BandIndexesLookup: Record<SpectralIndex, string> = {
    /**
     * The Normalized Difference Moisture Index (NDMI) is sensitive to the moisture levels in vegetation.
     * It is used to monitor droughts as well as monitor fuel levels in fire-prone areas.
     * It uses NIR and SWIR bands to create a ratio designed to mitigate illumination and atmospheric effects.
     *
     * NDMI = (NIR - SWIR1)/(NIR + SWIR1)
     * - NIR = pixel values from the near-infrared band
     * - SWIR1 = pixel values from the first shortwave infrared band
     */
    moisture: '(B5-B6)/(B5+B6)',
    /**
     * The Green Normalized Difference Vegetation Index (GNDVI) method is a vegetation index for estimating photo synthetic activity
     * and is a commonly used vegetation index to determine water and nitrogen uptake into the plant canopy.
     *
     * GNDVI = (NIR-Green)/(NIR+Green)
     * - NIR = pixel values from the near-infrared band
     * - Green = pixel values from the green band
     *
     * This index outputs values between -1.0 and 1.0.
     */
    vegetation: '(B5-B4)/(B5+B4)',
    /**
     * The Modified Normalized Difference Water Index (MNDWI) uses green and SWIR bands for the enhancement of open water features.
     *
     * MNDWI = (Green - SWIR) / (Green + SWIR)
     * - Green = pixel values from the green band
     * - SWIR = pixel values from the shortwave infrared band
     */
    water: '(B3-B6)/(B3+B6)',
    /**
     * When convert Kelvin to Farhenheit, the server returns `Invalid or missing input parameters.` error.
     * Therefore we will just use temperature in farhenheit for now
     */
    'temperature farhenheit': '(B9 - 273.15)', //'((B9 − 273.15) × 1.8) + 32',
    /**
     * convert Kelvin to Celcius
     */
    'temperature celcius': '(B9 - 273.15)',
};

export const calcSpectralIndex = (
    spectralIndex: SpectralIndex,
    bandValues: number[]
): number => {
    const [B1, B2, B3, B4, B5, B6, B7, B8, B9] = bandValues;

    let value = 0;

    // Calculate the value based on the input spectral index
    if (spectralIndex === 'moisture') {
        value = (B5 - B6) / (B5 + B6);
    } else if (spectralIndex === 'vegetation') {
        value = (B5 - B4) / (B5 + B4);
    } else if (spectralIndex === 'water') {
        value = (B3 - B6) / (B3 + B6);
    } else if (spectralIndex === 'temperature farhenheit') {
        value = kelvin2fahrenheit(B9);
    } else if (spectralIndex === 'temperature celcius') {
        value = kelvin2celsius(B9);
    }

    return value;
};

/**
 * Check if a pixel is clear via the QA Band
 *
 * The Pixel QA Band contains decimal values that represent bit-packed combinations of surface, atmosphere,
 * and sensor conditions that can affect the usefulness of a pixel.
 *
 * The QA band is coded in 16-bit, so a pixel lies within the range between 0-65,535. The QA band lets the end user identify "bad" pixels more easily.
 *
 * @param bandValues
 * @returns true if this pixel is clear without cloud
 */
export const checkClearFlagInQABand = (bandValues: number[]): boolean => {
    const [B1, B2, B3, B4, B5, B6, B7, PixelQABand, B9] = bandValues;

    // convert the decimal number to binary number to get bits
    const bits: string[] = decimal2binary(PixelQABand).split('');

    /**
     * get the value of Clear Flag, which is the seventh bit from the right
     * - 0 if Cloud or Dilated Cloud bits are set
     * - 1 if Cloud and Dilated Cloud bits are not set
     *
     * For detailed bit assignments, check page 13 of the doc below:
     * @see https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/media/files/LSDS-1619_Landsat-8-9-C2-L2-ScienceProductGuide-v4.pdf
     */
    const clearFlag = bits[bits.length - 7];

    return clearFlag === '1';
};

/**
 * Parse Info of a Landsat Scene using its Product ID/Name.
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

export const getBandIndexesBySpectralIndex = (
    spectralIndex: SpectralIndex
): string => {
    return BandIndexesLookup[spectralIndex];
};

export const getRasterFunctionBySpectralIndex = (
    spectralIndex: SpectralIndex
) => {
    return {
        rasterFunction: 'BandArithmetic',
        rasterFunctionArguments: {
            Method: 0,
            BandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
        },
        outputPixelType: 'F32',
    };
};
