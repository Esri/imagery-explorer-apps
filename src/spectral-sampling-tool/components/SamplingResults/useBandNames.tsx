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

import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';
import { SENTINEL2_BAND_NAMES } from '@shared/services/sentinel-2/config';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useBandNames = (numOfBandsToDisplay: number) => {
    const targetService = useAppSelector(selectTargetService);

    const bandNames = useMemo(() => {
        if (targetService === 'landsat') {
            return LANDSAT_BAND_NAMES.slice(0, numOfBandsToDisplay);
        }

        if (targetService === 'sentinel-2') {
            return SENTINEL2_BAND_NAMES.slice(0, numOfBandsToDisplay);
        }

        return [];
    }, [targetService]);

    return bandNames;
};
