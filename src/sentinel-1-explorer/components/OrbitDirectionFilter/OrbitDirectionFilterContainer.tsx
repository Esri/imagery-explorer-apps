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

import React from 'react';
import { OrbitDirectionFilter } from './OrbitDirectionFilter';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSentinel1OrbitDirection } from '@shared/store/Sentinel1/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { orbitDirectionChanged } from '@shared/store/Sentinel1/reducer';

export const OrbitDirectionFilterContainer = () => {
    const dispatch = useAppDispatch();

    const selectedOrbitDirection = useAppSelector(
        selectSentinel1OrbitDirection
    );

    return (
        <OrbitDirectionFilter
            selectedOrbitDirection={selectedOrbitDirection}
            orbitDirectionOnChange={(val) => {
                dispatch(orbitDirectionChanged(val));
            }}
        />
    );
};
