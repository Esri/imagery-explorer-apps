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

import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '../ImageryScene/selectors';
import { queryLocation4UrbanHeatIslandToolChanged } from './reducer';

/**
 * This thunk function updates the query location for the Urban Heat Island Tool.
 * @param point The new query location as a Point object.
 * @returns A thunk action that updates the query location in the store.
 */
export const updateQueryLocation4UrbanHeatIslandTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());

        const tool = selectActiveAnalysisTool(getState());

        if (mode !== 'analysis' || tool !== 'urban heat island') {
            return;
        }

        dispatch(queryLocation4UrbanHeatIslandToolChanged(point));
    };
