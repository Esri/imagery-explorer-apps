import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import { Sentinel2Scene, SpectralIndex } from '@typing/imagery-service';

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

/**
 * Sentinel-2 Band Index by Spectral Index
 *
 * Here is the list of Sentinel-2 Bands:
 * - Band 1: Coastal aerosol (0.433 - 0.453 µm)
 * - Band 2: Blue (0.458 - 0.523 µm)
 * - Band 3: Green (0.543 - 0.578 µm)
 * - Band 4: Red (0.650 - 0.680 µm)
 * - Band 5: Vegetation Red Edge (0.698 - 0.713 µm)
 * - Band 6: Vegetation Red Edge (0.733 - 0.748 µm)
 * - Band 7: Vegetation Red Edge (0.773 - 0.793 µm)
 * - Band 8: Near-Infrared (0.785 - 0.900 µm)
 * - Band 8A: Narrow NIR (0.855 - 0.875 µm)
 * - Band 9: Water vapour (0.935 - 0.955 µm)
 * - Band 10: SWIR – Cirrus (1.365 - 1.385 µm)
 * - Band 11: SWIR-1 (1.565 - 1.655 µm)
 * - Band 12: SWIR-2 (2.100 - 2.280 µm)
 *
 * @see https://pro.arcgis.com/en/pro-app/3.0/help/analysis/raster-functions/band-arithmetic-function.htm
 * @see https://www.esri.com/about/newsroom/arcuser/spectral-library/
 */
const BandIndexesLookup: Partial<Record<SpectralIndex, string>> = {
    /**
     * The Normalized Difference Moisture Index (NDMI) is sensitive to the moisture levels in vegetation.
     * It is used to monitor droughts as well as monitor fuel levels in fire-prone areas.
     * It uses NIR and SWIR bands to create a ratio designed to mitigate illumination and atmospheric effects.
     *
     * NDMI = (NIR - SWIR1)/(NIR + SWIR1)
     * - NIR = pixel values from the near-infrared band
     * - SWIR1 = pixel values from the first shortwave infrared band
     */
    moisture: '(B5-B12)/(B5+B12)',
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
    vegetation: '(B8-B4)/(B8+B4)',
    /**
     * The Modified Normalized Difference Water Index (MNDWI) uses green and SWIR bands for the enhancement of open water features.
     *
     * MNDWI = (Green - SWIR) / (Green + SWIR)
     * - Green = pixel values from the green band
     * - SWIR = pixel values from the shortwave infrared band
     */
    water: '(B3-B12)/(B3+B12)',
    /**
     * The Normalized Difference Built-up Index (NDBI) uses the NIR and SWIR bands to emphasize man-made built-up areas.
     * It is ratio based to mitigate the effects of terrain illumination differences as well as atmospheric effects.
     *
     * NDBI = (SWIR - NIR) / (SWIR + NIR)
     * - SWIR = pixel values from the shortwave infrared band
     * - NIR = pixel values from the near-infrared band
     */
    urban: '(B12-B8)/(B12+B8)',
    /**
     * The Normalized Burn Ratio Index (NBRI) uses the NIR and SWIR bands to emphasize burned areas, while mitigating illumination and atmospheric effects.
     *
     * NBR = (NIR - SWIR) / (NIR+ SWIR)
     * - NIR = pixel values from the near-infrared band
     * - SWIR = pixel values from the shortwave infrared band
     */
    burn: '(B13-B8)/(B13+B8)',
};

export const getBandIndexesBySpectralIndex = (
    spectralIndex: SpectralIndex
): string => {
    return BandIndexesLookup[spectralIndex];
};

/**
 * Converts a Sentinel-2 scene object to an ImageryScene object.
 *
 * @param {Sentinel2Scene} sentinel2Scene - The Sentinel-2 scene object to convert.
 * @returns {ImageryScene} The converted ImageryScene object.
 */
export const convertSentinel2SceneToImageryScene = (
    sentinel2Scene: Sentinel2Scene
): ImageryScene => {
    const {
        objectId,
        name,
        formattedAcquisitionDate,
        acquisitionDate,
        acquisitionYear,
        acquisitionMonth,
        cloudCover,
    } = sentinel2Scene;

    const imageryScene: ImageryScene = {
        objectId,
        sceneId: name,
        formattedAcquisitionDate,
        acquisitionDate,
        acquisitionYear,
        acquisitionMonth,
        cloudCover,
        satellite: 'Sentinel-2',
        customTooltipText: [`${Math.ceil(cloudCover * 100)}% Cloudy`],
    };

    return imageryScene;
};
