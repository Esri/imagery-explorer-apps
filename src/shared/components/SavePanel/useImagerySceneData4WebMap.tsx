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

import { ImagerySceneData4WebMap } from '@shared/services/arcgis-online/createWebMap';
import { useAppSelector } from '@shared/store/configureStore';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React from 'react';

/**
 * Custom hook that generates imagery scene data for a web map based on the current application mode and query parameters.
 *
 * The output array contains objects with the following properties:
 * - `objectId`: The object ID of the selected scene.
 * - `acquisitionDate`: The acquisition date of the selected scene.
 *
 * @returns {ImagerySceneData4WebMap[]} An array of imagery scene data objects for the web map.
 *
 */
export const useImagerySceneData4WebMap = () => {
    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const queryParams4ListOfScenes = useAppSelector(selectListOfQueryParams);

    const mode = useAppSelector(selectAppMode);

    const output: ImagerySceneData4WebMap[] = React.useMemo(() => {
        let queryParams: QueryParams4ImageryScene[] = [];

        if (mode === 'find a scene' || mode === 'analysis') {
            queryParams = [queryParams4MainScene];
        } else if (mode === 'swipe') {
            queryParams = [queryParams4MainScene, queryParams4SecondaryScene];
        } else if (mode === 'animate') {
            queryParams = [...queryParams4ListOfScenes];
        }

        return queryParams
            .filter(
                (d) =>
                    d.objectIdOfSelectedScene !== null &&
                    d.objectIdOfSelectedScene !== undefined
            )
            .map((d) => ({
                objectId: d.objectIdOfSelectedScene,
                acquisitionDate: d.acquisitionDate,
            }));
    }, [
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParams4ListOfScenes,
    ]);

    return output;
};
