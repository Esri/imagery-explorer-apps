import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import {
    selectClassifictionNameOfSpectralSamplingTask,
    selectSpectralSamplingPointsData,
    selectTargetService,
} from '@shared/store/SpectralSamplingTool/selectors';
import {
    deleteSessionDataFromIndexedDB,
    saveSessionData2IndexedDB,
} from '@shared/utils/indexedDB/sessioOfSpectralSamplingTool';
import React, { useEffect } from 'react';

export const useSaveCurrentSession = () => {
    const queryParamsForSamplingPoints = useAppSelector(
        selectListOfQueryParams
    );

    const samplingPoints = useAppSelector(selectSpectralSamplingPointsData);

    const idOfSelectedSamplingPoint = useAppSelector(
        selectIdOfSelectedItemInListOfQueryParams
    );

    const sessionName = useAppSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    const targetService = useAppSelector(selectTargetService);

    useEffect(() => {
        (async () => {
            if (!sessionName || !targetService) {
                return;
            }

            try {
                await saveSessionData2IndexedDB({
                    sessionName,
                    targetService,
                    queryParamsForSamplingPoints,
                    samplingPoints,
                });
            } catch (error) {
                console.error('Error saving session data to IndexedDB:', error);
            }
        })();
    }, [
        queryParamsForSamplingPoints,
        samplingPoints,
        idOfSelectedSamplingPoint,
        sessionName,
        targetService,
    ]);
};
