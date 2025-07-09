import {
    FIELD_NAMES,
    LANDSAT_LEVEL_2_SERVICE_SORT_VALUE,
} from '@shared/services/landsat-level-2/config';
import { getUTCDate } from '@shared/utils/date-time/getUTCDate';
import { addMonths, format } from 'date-fns';

export const getLandsatMosaicRuleByAcquisitionDate = (
    year: number,
    month: number
    // day = 15
) => {
    const startDate = getUTCDate(year, month, 1);
    const endDate = addMonths(startDate, 1);

    const whereClause = [
        `(${FIELD_NAMES.ACQUISITION_DATE} BETWEEN timestamp '${format(
            startDate,
            'yyyy-MM-dd'
        )} 06:00:00' AND timestamp '${format(
            endDate,
            'yyyy-MM-dd'
        )} 05:59:59')`,
        `(${FIELD_NAMES.DATASET_ID} NOT IN ('Landsat7'))`,
    ];

    return {
        mosaicMethod: 'esriMosaicAttribute',
        // only get sentinel-2 imagery from the input month
        // where: `${FIELD_NAMES.ACQUISITION_DATE} BETWEEN timestamp '${format(
        //     startDate,
        //     'yyyy-MM-dd'
        // )} 06:00:00' AND timestamp '${format(endDate, 'yyyy-MM-dd')} 05:59:59'`,
        where: whereClause.join(' AND '),
        // sort by cloud cover to get imagery with least cloud coverage
        sortField: FIELD_NAMES.CLOUD_COVER,
        sortValue: LANDSAT_LEVEL_2_SERVICE_SORT_VALUE,
        ascending: true,
        mosaicOperation: 'MT_FIRST',
    };
};
