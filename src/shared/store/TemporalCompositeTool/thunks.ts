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

// import Point from '@arcgis/core/geometry/Point';
import { nanoid } from 'nanoid';
import {
    DefaultQueryParams4ImageryScene,
    QueryParams4ImageryScene,
    queryParamsListChanged,
} from '../ImageryScene/reducer';
import {
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    selectSelectedItemFromListOfQueryParams,
} from '../ImageryScene/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';

// let abortController: AbortController = null;

/**
 * Initializes a new list of query parameters for use with the Temporal Composite Tool.
 * @param shouldInheritScenesFromCurrentList If true, attempts to inherit query parameters from the existing list. If false, creates new query parameters using `DefaultQueryParams4ImageryScene`.
 */
export const initiateImageryScenes4TemporalCompositeTool =
    (shouldInheritScenesFromCurrentList: boolean) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        // const queryParams4MainScene = selectQueryParams4MainScene(storeState);
        // const queryParams4SecondaryScene = selectQueryParams4SecondaryScene(storeState);

        // Get the current list of query parameters from the store
        const listOfQueryParams = selectListOfQueryParams(storeState);

        const queryParams4RedBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[0]
                ? listOfQueryParams[0]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const queryParams4GreenBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[1]
                ? listOfQueryParams[1]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const queryParams4BlueBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[2]
                ? listOfQueryParams[2]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const updatedListOfQueryParams: QueryParams4ImageryScene[] = [
            queryParams4RedBand,
            queryParams4GreenBand,
            queryParams4BlueBand,
        ];

        dispatch(
            queryParamsListChanged({
                queryParams: updatedListOfQueryParams,
                selectedItemID: queryParams4RedBand.uniqueId,
            })
        );
    };

export const swapImageryScenesInTemporalCompositeTool =
    (indexOfSceneA: number, indexOfSceneB: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        const queryParams = selectListOfQueryParams(storeState);
        const queryParams4SecondaryScene =
            selectSelectedItemFromListOfQueryParams(storeState);

        const sceneA = queryParams[indexOfSceneA];
        const sceneB = queryParams[indexOfSceneB];

        if (!sceneA || !sceneB) {
            return;
        }

        queryParams[indexOfSceneA] = sceneB;
        queryParams[indexOfSceneB] = sceneA;

        dispatch(
            queryParamsListChanged({
                queryParams,
                selectedItemID: queryParams4SecondaryScene.uniqueId,
            })
        );
    };
