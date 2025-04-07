import { HistoricalLandCoverData } from '@shared/services/sentinel-2-10m-landcover/computeHistograms';

export const formatHistoricalData = (
    data: HistoricalLandCoverData[]
): string => {
    if (!data || data.length === 0) {
        return '';
    }

    const years = Array.from(
        new Set(data.flatMap((item) => item.areaByYear.map(({ year }) => year)))
    ).sort();

    const csvHeader = ['LandCover', ...years].join(',') + '\n';
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
