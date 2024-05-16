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

import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    errorChanged,
    queryLocationChanged,
    spectralProfileDataUpdated,
    isLoadingToggled as spectralProfileToolIsLoadingToggled,
} from './reducer';
import { selectQueryLocation4SpectralProfileTool } from './selectors';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '../ImageryScene/selectors';
import { getLandsatPixelValues } from '@shared/services/landsat-level-2/getLandsatPixelValues';

let abortController: AbortController = null;

export const updateQueryLocation4SpectralProfileTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const tool = selectActiveAnalysisTool(getState());

        if (tool !== 'spectral') {
            return;
        }

        dispatch(queryLocationChanged(point));
    };

export const updateSpectralProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation =
            selectQueryLocation4SpectralProfileTool(rootState);

        const { objectIdOfSelectedScene } =
            selectQueryParams4MainScene(rootState) || {};

        if (!queryLocation || !objectIdOfSelectedScene) {
            dispatch(spectralProfileDataUpdated([]));
            dispatch(updateQueryLocation4SpectralProfileTool(null));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(spectralProfileToolIsLoadingToggled(true));

        dispatch(errorChanged(null));

        try {
            const bandValues = await getLandsatPixelValues({
                point: queryLocation,
                objectIds: [objectIdOfSelectedScene],
                abortController,
            });

            dispatch(spectralProfileDataUpdated(bandValues));

            // console.log(res);
        } catch (err) {
            dispatch(
                errorChanged(
                    err.message || 'failed to fetch spectral profile data'
                )
            );
        }

        dispatch(spectralProfileToolIsLoadingToggled(false));
    };
