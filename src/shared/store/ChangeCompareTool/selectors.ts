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

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSelectedOption4ChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.selectedOption,
    (selectedOption) => selectedOption
);

export const selectChangeCompareLayerIsOn = createSelector(
    (state: RootState) => state.ChangeCompareTool.changeCompareLayerIsOn,
    (changeCompareLayerIsOn) => changeCompareLayerIsOn
);

export const selectUserSelectedRangeInChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.selectedRange,
    (selectedRange) => selectedRange
);

export const selectFullPixelValuesRangeInChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.fullPixelValuesRange,
    (fullPixelValuesRange) => fullPixelValuesRange
);

export const selectChangeCompareToolState = createSelector(
    (state: RootState) => state.ChangeCompareTool,
    (ChangeCompareTool) => ChangeCompareTool
);
