import React, { useMemo } from 'react';
import { AnimationFrameInfo } from './AnimationFramesList';
import { useSelector } from 'react-redux';
import {
    selectListOfQueryParams,
    selectIdOfSelectedItemInListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { sortQueryParams4ScenesByAcquisitionDate } from './helpers';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { DATE_FORMAT } from '@shared/constants/UI';
import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';
import { formatFormattedDateStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

export const useAnimationFramesInfo = () => {
    const selectedAnimationFrameId = useSelector(
        selectIdOfSelectedItemInListOfQueryParams
    );

    const queryParams4ScenesInAnimationMode = useSelector(
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

            return {
                frameId: uniqueId,
                acquisitionDateLabel: acquisitionDate
                    ? formatFormattedDateStrInUTCTimeZone(acquisitionDate)
                    : 'Select a date',
                rasterFunctionName: acquisitionDate
                    ? getRasterFunctionLabelText(rasterFunctionName)
                    : '',
                selected: uniqueId === selectedAnimationFrameId,
            } as AnimationFrameInfo;
        });

        return framesInfo;
    }, [queryParams4ScenesInAnimationMode, selectedAnimationFrameId]);

    return data;
};
