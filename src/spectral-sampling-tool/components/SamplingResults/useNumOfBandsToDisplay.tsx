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

import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const useNumOfBandsToDisplay = () => {
    const targetService = useAppSelector(selectTargetService);

    const numOfBandsToDisplay = useMemo(() => {
        if (targetService === 'landsat') {
            return 7;
        } else if (targetService === 'sentinel-2') {
            return 12;
        } else {
            return 0;
        }
    }, [targetService]);

    return numOfBandsToDisplay;
};
