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

import { Point } from '@arcgis/core/geometry';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
} from '@shared/store/ImageryScene/selectors';
import { selectSpectralSamplingPointsData } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export type FormattedSpectralSamplingData = {
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

export const useFormattedSpectralSamplingData =
    (): FormattedSpectralSamplingData[] => {
        const queryParamsForSamplingPoints = useAppSelector(
            selectListOfQueryParams
        );

        const samplingPoints = useAppSelector(selectSpectralSamplingPointsData);

        const idOfSelectedSamplingPoint = useAppSelector(
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

            const data: FormattedSpectralSamplingData[] = samplingPoints.map(
                (d) => {
                    const { uniqueId, location, isLoading, bandValues } = d;
                    const { acquisitionDate, objectIdOfSelectedScene } =
                        queryParamsById[uniqueId] || {};

                    const output: FormattedSpectralSamplingData = {
                        uniqueId,
                        location,
                        bandValues,
                        isLoading,
                        selected: uniqueId === idOfSelectedSamplingPoint,
                        acquisitionDate: acquisitionDate,
                        objectIdOfSelectedScene,
                    };

                    return output;
                }
            );

            return data;
        }, [
            samplingPoints,
            queryParamsForSamplingPoints,
            idOfSelectedSamplingPoint,
        ]);

        return listData;
    };
