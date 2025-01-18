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

import React from 'react';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    // selectAcquisitionYear,
    selectCloudCover,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { CloudFilter } from './CloudFilter';
import {
    // acquisitionYearChanged,
    cloudCoverChanged,
} from '@shared/store/ImageryScene/reducer';

export const CloudFilterContainer = () => {
    const dispatch = useAppDispatch();

    const cloudCoverThreshold = useSelector(selectCloudCover);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    return (
        <CloudFilter
            cloudCoverage={cloudCoverThreshold}
            disabled={cloudCoverThreshold === undefined || isAnimationPlaying}
            onChange={(newValue) => {
                dispatch(cloudCoverChanged(newValue));
            }}
        />
    );
};
