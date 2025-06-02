import { HistoricalLandCoverData } from '@shared/services/sentinel-2-10m-landcover/getHistoricalLandCoverDataByMapExtent';

/**
 * Formats historical land cover data into a CSV string.
 *
 * @param data - An array of historical land cover data objects.
 * Each object contains information about land cover classification and area percentages by year.
 *
 * @returns A CSV string representation of the historical land cover data.
 * If the input data is empty or undefined, an empty string is returned.
 *
 * The CSV format includes:
 * - A header row with "LandCover" followed by column headers for each year (e.g., "% in 2000").
 * - Data rows where each row corresponds to a land cover classification and its area percentages for each year.
 */
export const formatHistoricalData = (
    data: HistoricalLandCoverData[]
): string => {
    if (!data || data.length === 0) {
        return '';
    }

    const years = Array.from(
        new Set(data.flatMap((item) => item.areaByYear.map(({ year }) => year)))
    ).sort();

    const headersByYear = years.map((year) => `% in ${year}`);

    const csvHeader = ['LandCover', ...headersByYear].join(',') + '\n';
    const csvRows: string[] = [];

    for (const item of data) {
        const { areaByYear, landCoverClassificationData } = item;
        const { ClassName } = landCoverClassificationData;

        const areaByYearMap = new Map();

        for (const { year, areaInPercentageRaw } of areaByYear) {
            areaByYearMap.set(year, areaInPercentageRaw.toFixed(2));
        }

        const valuesByYear = years.map((year) => areaByYearMap.get(year) || 0);

        const row = [ClassName, ...valuesByYear];
        csvRows.push(row.join(','));
    }

    return csvHeader + csvRows.join('\n');
};
