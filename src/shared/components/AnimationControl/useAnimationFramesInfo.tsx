import React, { useMemo } from 'react';
import { AnimationFrameInfo } from './AnimationFramesList';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from '@shared/store/ImageryScene/selectors';
import { sortQueryParams4ScenesByAcquisitionDate } from './helpers';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@shared/constants/UI';
import { getRasterFunctionLabelText } from '@shared/services/helpers/getRasterFunctionLabelText';

export const useAnimationFramesInfo = () => {
    const selectedAnimationFrameId = useSelector(
        selectSelectedAnimationFrameId
    );

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    const data: AnimationFrameInfo[] = useMemo(() => {
        if (!queryParams4ScenesInAnimationMode.length) {
            return [];
        }

        // get frame infos that are sorted using the acquisition date
        const framesInfo = sortQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimationMode
        ).map((d) => {
            const { animationFrameId, acquisitionDate, rasterFunctionName } = d;

            return {
                frameId: animationFrameId,
                acquisitionDateLabel: acquisitionDate
                    ? format(
                          formattedDateString2Unixtimestamp(acquisitionDate),
                          DATE_FORMAT
                      )
                    : 'Select a date',
                rasterFunctionName: acquisitionDate
                    ? getRasterFunctionLabelText(rasterFunctionName)
                    : '',
                selected: animationFrameId === selectedAnimationFrameId,
            } as AnimationFrameInfo;
        });

        return framesInfo;
    }, [queryParams4ScenesInAnimationMode, selectedAnimationFrameId]);

    return data;
};
