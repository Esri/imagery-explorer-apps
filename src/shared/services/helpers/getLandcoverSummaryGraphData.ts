import { Extent } from '@arcgis/core/geometry';
import { LandcoverClassificationData } from '@typing/landcover';
import { computeHistograms } from './computeHistograms';

type GetLandCoverChangeParams = {
    /**
     * URL of the Land Cover Image Service
     */
    serviceUrl: string;
    /**
     * Raster Function to be applied to the image service
     */
    rasterFunction: string;
    /**
     * Map Extent to be used as input geomerty
     */
    extent: Extent;
    /**
     * Map resolution
     */
    resolution: number;
    /**
     * the year that is earlier than the later year
     */
    earlierYear: number;
    /**
     * the year that is later than the earlier year
     */
    laterYear: number;
    /**
     * Map of pixel values to land cover classification data
     */
    mapOfLandCoverClassificationPixelValues: Map<
        number,
        LandcoverClassificationData
    >;
};

type GetLandCoverAreaInAcresByYearParams = {
    /**
     * URL of the Land Cover Image Service
     */
    serviceUrl: string;
    /**
     * Raster Function to be applied to the image service
     */
    rasterFunction: string;
    /**
     * Map Extent to be used as input geomerty
     */
    extent: Extent;
    /**
     * Map resolution
     */
    resolution: number;
    /**
     * the year that will be used to query land cover data
     */
    year: number;
    /**
     * Map of pixel values to land cover classification data
     */
    mapOfLandCoverClassificationPixelValues: Map<
        number,
        LandcoverClassificationData
    >;
};

export type LandCoverChangeInAcres = {
    /**
     * Area (in acres) of a specific land cover in earlier year
     */
    earlierYearAreaInAcres: number;
    /**
     * Area (in percentage) of a specific land cover in earlier year
     */
    earlierYearAreaInPercentage: number;
    /**
     * Area (in acres) of a specific land cover in later year
     */
    laterYearAreaInAcres: number;
    /**
     * Area (in percentage) of a specific land cover in later year
     */
    laterYearAreaInPercentage: number;
    /**
     * Difference (in acres) of a specific land cover type between two years
     */
    differenceInAcres: number;
    /**
     * Difference (in percentage) of a specific land cover type between two years
     */
    differenceInPercentage: number;
    /**
     * Detailed Land Cover Classification Data
     */
    landcoverClassificationData: LandcoverClassificationData;
};

export type LandCoverArea = {
    /**
     * area (in acres) of a specific land cover type between two years
     */
    area: number;
    /**
     * area (in percentage) of a specific land cover type between two years
     */
    areaInPercentage: number;
    /**
     * area (in percentage) of a specific land cover type between two years
     * this is the raw value, not formatted, which is used for the CSV download
     */
    areaInPercentageRaw: number;
    /**
     * Detailed Land Cover Classification Data
     */
    landcoverClassificationData: LandcoverClassificationData;
};

/**
 * There are 4046.8564224 square meters in 1 acre
 */
const SQUARE_METERS_IN_ONE_ACRE = 4047;

/**
 * 1 square meter equals to 0.000247105 acre
 */
const ACRE_PER_SQ_METER = 0.000247105;

/**
 * get acres per pxiel based on the current map resolution,
 * and we can then multiple this number by total number of pixels to get the area in acres
 *
 * @param count count of pixels
 * @param pixelSizeInMeters use resolution of map view as pixel size in meters
 * @returns
 */
export const convertNumOfPixel2Acres = (
    count: number,
    pixelSizeInMeters: number
): number => {
    const squareMetersPerPixel = pixelSizeInMeters ** 2;
    const acresPerPixel = squareMetersPerPixel * ACRE_PER_SQ_METER;
    return Math.round(count * acresPerPixel);
};

export const getTotalAreaInAcres = (counts: number[], resolution: number) => {
    const totalNumOfPixels = counts.reduce((total, count) => total + count, 0);
    return convertNumOfPixel2Acres(totalNumOfPixels, resolution);
};

export const formatAreaPercentage = (areaInPercentage: number) => {
    return areaInPercentage > 1
        ? Math.round(areaInPercentage)
        : +areaInPercentage.toFixed(1);
};

/**
 * Computes the area and percentage of each land cover classification for a given year
 * using histogram data from a raster service.
 *
 * @param params - The parameters required to compute land cover area by year.
 * @param params.serviceUrl - The URL of the raster service to query.
 * @param params.rasterFunction - The raster function to apply for processing.
 * @param params.extent - The spatial extent for which to compute the histogram.
 * @param params.resolution - The spatial resolution of the raster data.
 * @param params.year - The year for which to compute the land cover summary.
 * @param params.mapOfLandCoverClassificationPixelValues - A map relating pixel values to land cover classification data.
 * @returns A promise that resolves to an array of `LandCoverArea` objects, each representing the area and percentage of a land cover class.
 * @throws Will throw an error if the histogram computation fails.
 */
export const getLandCoverAreaByYear = async ({
    serviceUrl,
    rasterFunction,
    extent,
    resolution,
    year,
    mapOfLandCoverClassificationPixelValues,
}: GetLandCoverAreaInAcresByYearParams): Promise<LandCoverArea[]> => {
    try {
        const res = await computeHistograms({
            serviceUrl,
            rasterFunction,
            extent,
            resolution,
            year,
        });

        const counts = res?.histograms[0]?.counts || [];

        const totalArea = getTotalAreaInAcres(counts, resolution);

        const output: LandCoverArea[] = [];

        for (let i = 0; i < counts.length; i++) {
            const areaInAcres = convertNumOfPixel2Acres(counts[i], resolution);

            if (areaInAcres < 1) {
                continue;
            }

            const areaInPercentage = (areaInAcres / totalArea) * 100;

            const landcoverClassificationData =
                mapOfLandCoverClassificationPixelValues.get(i) || null;

            if (!landcoverClassificationData) {
                continue;
            }

            output.push({
                area: areaInAcres,
                areaInPercentage: formatAreaPercentage(areaInPercentage),
                areaInPercentageRaw: areaInPercentage,
                landcoverClassificationData,
            });
        }

        return output;
    } catch (err) {
        console.log(err);
        // return null;
        throw err;
    }
};

/**
 * Compute histograms for ealier and later years, then calculate difference in each land cover classification
 * between these two years and convert the number in acres.
 */
export const getLandCoverChangeInAcres = async ({
    extent,
    resolution,
    earlierYear,
    laterYear,
    serviceUrl,
    rasterFunction,
    mapOfLandCoverClassificationPixelValues,
}: GetLandCoverChangeParams): Promise<LandCoverChangeInAcres[]> => {
    try {
        const histograms4EarlierYear = await computeHistograms({
            serviceUrl,
            rasterFunction,
            extent,
            resolution,
            year: earlierYear,
        });

        const histograms4LaterYear = await computeHistograms({
            serviceUrl,
            rasterFunction,
            extent,
            resolution,
            year: laterYear,
        });

        const countsFromEarlierYear =
            histograms4EarlierYear?.histograms[0]?.counts || [];
        const countsFromLaterYear =
            histograms4LaterYear?.histograms[0]?.counts || [];

        const totalAreaEarlierYear = getTotalAreaInAcres(
            countsFromEarlierYear,
            resolution
        );
        const totalAreaLaterYear = getTotalAreaInAcres(
            countsFromLaterYear,
            resolution
        );

        const output: LandCoverChangeInAcres[] = [];

        const len = Math.min(
            countsFromEarlierYear.length,
            countsFromLaterYear.length
        );

        for (let i = 0; i < len; i++) {
            const landcoverClassificationData =
                mapOfLandCoverClassificationPixelValues.get(i) || null;
            // getSentinel2LandCoverClassificationByPixelValue(i);

            if (!landcoverClassificationData) {
                continue;
            }

            const countEarlierYear = countsFromEarlierYear[i];
            const countLaterYear = countsFromLaterYear[i];

            // diff in number of pixels
            const diff = countLaterYear - countEarlierYear;

            // convert difference in number of pixels to acres
            const diffInAcres = convertNumOfPixel2Acres(diff, resolution);

            if (Math.abs(diffInAcres) < 1) {
                continue;
            }

            const earlierYearAreaInAcres = convertNumOfPixel2Acres(
                countEarlierYear,
                resolution
            );

            const earlierYearAreaInPercentage =
                (earlierYearAreaInAcres / totalAreaEarlierYear) * 100;

            const laterYearAreaInAcres = convertNumOfPixel2Acres(
                countLaterYear,
                resolution
            );

            const laterYearAreaInPercentage =
                (laterYearAreaInAcres / totalAreaLaterYear) * 100;

            output.push({
                landcoverClassificationData,
                earlierYearAreaInAcres,
                earlierYearAreaInPercentage,
                laterYearAreaInAcres,
                laterYearAreaInPercentage,
                differenceInAcres: diffInAcres,
                differenceInPercentage: formatAreaPercentage(
                    laterYearAreaInPercentage - earlierYearAreaInPercentage
                ),
            });
        }

        return output;
    } catch (err) {
        console.log('failed to getLandCoverChangeInAcres', err);
        return null;
    }
};
