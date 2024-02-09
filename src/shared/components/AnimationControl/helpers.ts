/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';

/**
 * Filter query params for Landsat Scenes and only keep the ones that has selected Acquisition Date
 * @param queryParams
 * @returns
 */
export const filterQueryParams4ScenesByAcquisitionDate = (
    queryParams: QueryParams4ImageryScene[]
): QueryParams4ImageryScene[] => {
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
    queryParams: QueryParams4ImageryScene[],
    shouldExcludeQueryParamsWithoutAcquisitionDate = false
): QueryParams4ImageryScene[] => {
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
