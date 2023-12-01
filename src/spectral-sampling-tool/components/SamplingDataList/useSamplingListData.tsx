import { Point } from '@arcgis/core/geometry';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { selectSpectralSamplingPointsData } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export type SamplingListItemData = {
    /**
     * unique id of this sampling point
     */
    uniqueId: string;
    /**
     * if ture, this sampling point is selected
     */
    selected: boolean;
    /**
     * location of this samping point;
     */
    location?: Point;
    /**
     * acquisition date
     */
    acquisitionDate?: string;
    /**
     * if true, it is in process of loading spectral profile data
     */
    isLoading?: boolean;
};

export const useSamplingListData = (): SamplingListItemData[] => {
    const queryParamsForSamplingPoints = useSelector(selectListOfQueryParams);

    const samplingPoints = useSelector(selectSpectralSamplingPointsData);

    const idOfSelectedSamplingPoint = useSelector(
        selectIdOfSelectedItemInListOfQueryParams
    );

    const listData = useMemo(() => {
        const queryParamsById: {
            [key: string]: QueryParams4ImageryScene;
        } = {};

        for (const queryParams of queryParamsForSamplingPoints) {
            const { uniqueId } = queryParams;
            queryParamsById[uniqueId] = queryParams;
        }

        const data: SamplingListItemData[] = samplingPoints.map((d) => {
            const { uniqueId, location, isLoading } = d;
            const queryParams = queryParamsById[uniqueId];

            return {
                uniqueId,
                location,
                isLoading,
                selected: uniqueId === idOfSelectedSamplingPoint,
                acquisitionDate: queryParams?.acquisitionDate,
            };
        });

        return data;
    }, [
        samplingPoints,
        queryParamsForSamplingPoints,
        idOfSelectedSamplingPoint,
    ]);

    return listData;
};
