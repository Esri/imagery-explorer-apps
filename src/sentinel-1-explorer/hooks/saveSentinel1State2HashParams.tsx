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

import {
    selectPolarizationFilter,
    selectSentinel1OrbitDirection,
    selectSentinel1State,
} from '@shared/store/Sentinel1/selectors';
import { saveSentinel1StateToHashParams } from '@shared/utils/url-hash-params/sentinel1';
import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useSaveSentinel1State2HashParams = () => {
    const orbitDirection = useAppSelector(selectSentinel1OrbitDirection);

    const polarizationFilter = useAppSelector(selectPolarizationFilter);

    const sentinel1State = useAppSelector(selectSentinel1State);

    useEffect(() => {
        saveSentinel1StateToHashParams(sentinel1State);
    }, [orbitDirection, polarizationFilter]);
};
