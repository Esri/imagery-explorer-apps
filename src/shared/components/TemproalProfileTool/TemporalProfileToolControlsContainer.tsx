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

import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
// import { getProfileData } from '@shared/services/landsat-2/getProfileData';
import { trendToolOptionChanged } from '@shared/store/TrendTool/reducer';
import {
    selectAcquisitionMonth4TrendTool,
    selectQueryLocation4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
} from '@shared/store/TrendTool/selectors';
import { resetTrendToolData } from '@shared/store/TrendTool/thunks';
import React from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useSelector } from 'react-redux';

import { TemporalProfileToolControls } from './TemporalProfileToolControls';

export const TemporalProfileToolControlsContainer = () => {
    const dispatch = useAppDispatch();

    const queryLocation = useSelector(selectQueryLocation4TrendTool);

    const acquisitionMonth = useSelector(selectAcquisitionMonth4TrendTool);

    const acquisitionYear = useSelector(selectAcquisitionYear4TrendTool);

    const selectedTrendToolOption = useSelector(selectTrendToolOption);

    return (
        <TemporalProfileToolControls
            acquisitionMonth={acquisitionMonth}
            acquisitionYear={acquisitionYear}
            selectedTrendOption={selectedTrendToolOption}
            shouldShowCloseButton={queryLocation !== null}
            trendOptionOnChange={(data) => {
                dispatch(trendToolOptionChanged(data));
            }}
            closeButtonOnClick={() => {
                dispatch(resetTrendToolData());
            }}
        />
    );
};
