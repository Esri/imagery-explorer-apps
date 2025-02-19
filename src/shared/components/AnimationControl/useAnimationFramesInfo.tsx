/* Copyright 2025 Esri
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

import React, { useContext, useMemo } from 'react';
import { AnimationFrameInfo } from './AnimationFramesList';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectListOfQueryParams,
    selectIdOfSelectedItemInListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { sortQueryParams4ScenesByAcquisitionDate } from './helpers';
// import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
// import { DATE_FORMAT } from '@shared/constants/UI';
// import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { AppContext } from '@shared/contexts/AppContextProvider';

export const useAnimationFramesInfo = () => {
    const { rasterFunctionLabelMap } = useContext(AppContext);

    const selectedAnimationFrameId = useAppSelector(
        selectIdOfSelectedItemInListOfQueryParams
    );

    const queryParams4ScenesInAnimationMode = useAppSelector(
        selectListOfQueryParams
    );

    const data: AnimationFrameInfo[] = useMemo(() => {
        if (!queryParams4ScenesInAnimationMode.length) {
            return [];
        }

        // get frame infos that are sorted using the acquisition date
        const framesInfo = sortQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimationMode
        ).map((d) => {
            const { uniqueId, acquisitionDate, rasterFunctionName } = d;

            const rasterFunctionLabel =
                rasterFunctionLabelMap.get(rasterFunctionName) ||
                rasterFunctionName;

            return {
                frameId: uniqueId,
                acquisitionDateLabel: acquisitionDate
                    ? formatFormattedDateStrInUTCTimeZone(acquisitionDate)
                    : 'Select a date',
                rasterFunctionName: acquisitionDate ? rasterFunctionLabel : '',
                selected: uniqueId === selectedAnimationFrameId,
            } as AnimationFrameInfo;
        });

        return framesInfo;
    }, [queryParams4ScenesInAnimationMode, selectedAnimationFrameId]);

    return data;
};
