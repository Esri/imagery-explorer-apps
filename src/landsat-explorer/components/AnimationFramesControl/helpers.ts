import { QueryParams4LandsatScene } from '../../../shared/store/Landsat/reducer';
import { formattedDateString2Unixtimestamp } from '../../../shared/utils/snippets/formatDateString';

/**
 * Filter query params for Landsat Scenes and only keep the ones that has selected Acquisition Date
 * @param queryParams
 * @returns
 */
export const filterQueryParams4ScenesByAcquisitionDate = (
    queryParams: QueryParams4LandsatScene[]
): QueryParams4LandsatScene[] => {
    return queryParams.filter((d) => d.acquisitionDate !== '');
};

/**
 * Sort Query Params for Landsat Scenes using its selected Acquisition Date.
 * Items that have selected Acquisition Date will be sorted in ascending order,
 * And items that are without selected Acquisition Date will be placed at end of the array
 * @param queryParams query params to be sorted
 * @param shouldExcludeQueryParamsWithoutAcquisitionDate if ture, only return query params that has selected acquisition date
 * @returns
 */
export const sortQueryParams4ScenesByAcquisitionDate = (
    queryParams: QueryParams4LandsatScene[],
    shouldExcludeQueryParamsWithoutAcquisitionDate = false
): QueryParams4LandsatScene[] => {
    if (shouldExcludeQueryParamsWithoutAcquisitionDate) {
        queryParams = filterQueryParams4ScenesByAcquisitionDate(queryParams);
    }

    const sorted = [...queryParams].sort((a, b) => {
        // if both frame has selected acquisition date, sort using selected acquisition date
        if (a.acquisitionDate && b.acquisitionDate) {
            return (
                formattedDateString2Unixtimestamp(a.acquisitionDate) -
                formattedDateString2Unixtimestamp(b.acquisitionDate)
            );
        }
        // put `a` before `b` if `a` has a selected acquisition date
        else if (a.acquisitionDate) {
            return -1;
        }
        // put `b` before `a` if `b` has a selected acquisition date
        else if (b.acquisitionDate) {
            return 1;
        } else {
            return 0;
        }
    });

    return sorted;
};
