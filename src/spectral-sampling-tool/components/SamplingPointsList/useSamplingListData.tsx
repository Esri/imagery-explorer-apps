import { Point } from '@arcgis/core/geometry';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { selectSpectralSamplingPointsData } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export type SamplingDataJoinedWithQueryParams = {
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
     * spectral prfile data/band values from the pixel of the query location
     */
    bandValues: number[];
    /**
     * if true, it is in process of loading spectral profile data
     */
    isLoading?: boolean;
    /**
     * acquisition date of the selected imagery scene
     */
    acquisitionDate?: string;
    /**
     * Object Id of selected Imagery scene.
     */
    objectIdOfSelectedScene?: number;
};

export const useSamplingPointsDataJoinedWithQueryParams =
    (): SamplingDataJoinedWithQueryParams[] => {
        const queryParamsForSamplingPoints = useSelector(
            selectListOfQueryParams
        );

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

            const data: SamplingDataJoinedWithQueryParams[] =
                samplingPoints.map((d) => {
                    const { uniqueId, location, isLoading, bandValues } = d;
                    const { acquisitionDate, objectIdOfSelectedScene } =
                        queryParamsById[uniqueId] || {};

                    const output: SamplingDataJoinedWithQueryParams = {
                        uniqueId,
                        location,
                        bandValues,
                        isLoading,
                        selected: uniqueId === idOfSelectedSamplingPoint,
                        acquisitionDate: acquisitionDate,
                        objectIdOfSelectedScene,
                    };

                    return output;
                });

            return data;
        }, [
            samplingPoints,
            queryParamsForSamplingPoints,
            idOfSelectedSamplingPoint,
        ]);

        return listData;
    };
