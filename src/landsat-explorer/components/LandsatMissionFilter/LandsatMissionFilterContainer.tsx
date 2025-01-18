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
import { LandsatMissionFilter } from './LandsatMissionFilter';
import { useSelector } from 'react-redux';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { missionsToBeExcludedUpdated } from '@shared/store/Landsat/reducer';

export const LandsatMissionFilterContainer = () => {
    const dispatch = useAppDispatch();

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    return (
        <LandsatMissionFilter
            missionsToBeExcluded={missionsToBeExcluded}
            missionsToBeExcludedOnChange={(updatedMissionsToBeExcluded) => {
                dispatch(
                    missionsToBeExcludedUpdated(updatedMissionsToBeExcluded)
                );
            }}
        />
    );
};
