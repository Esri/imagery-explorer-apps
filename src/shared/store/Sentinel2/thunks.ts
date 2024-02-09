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

import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { webmapIdChanged } from './reducer';

// Good resource about what "thunks" are, and why they're used for writing Redux logic: https://redux.js.org/usage/writing-logic-thunks
export const updateWebmap =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            // do some async work (e.g. check if the new webmap id is an valid ArcGIS Online Item)
            // ...
        } catch (err) {
            console.error(err);
        }
    };
