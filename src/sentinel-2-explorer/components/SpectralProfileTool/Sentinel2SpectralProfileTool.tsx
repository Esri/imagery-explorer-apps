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

import { selectActiveAnalysisTool } from '@shared/store/ImageryScene/selectors';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { SpectralProfileTool } from '@shared/components/SpectralProfileTool';
import { Sentinel2SpectralProfileData } from './config';
import { getLandsatPixelValues } from '@shared/services/landsat-level-2/getLandsatPixelValues';
import { useFetchSpectralProfileToolData } from '@shared/components/SpectralProfileTool/useUpdateSpectralProfileToolData';
import { FetchPixelValuesFuncParams } from '@shared/store/SpectralProfileTool/thunks';
import { SENTINEL2_BAND_NAMES } from '@shared/services/sentinel-2/config';
import { getSentinel2PixelValues } from '@shared/services/sentinel-2/getSentinel2PixelValues';

export const Sentinel2SpectralProfileTool = () => {
    const tool = useAppSelector(selectActiveAnalysisTool);

    const fetchSentinel2PixelValuesFunc = useCallback(
        async ({
            point,
            objectIds,
            abortController,
        }: FetchPixelValuesFuncParams) => {
            const res: number[] = await getSentinel2PixelValues({
                point,
                objectIds,
                abortController,
            });

            return res;
        },
        []
    );

    useFetchSpectralProfileToolData(fetchSentinel2PixelValuesFunc);

    if (tool !== 'spectral') {
        return null;
    }

    return (
        <SpectralProfileTool
            spectralProfileDataByLandCoverTypes={Sentinel2SpectralProfileData}
            bandNames={SENTINEL2_BAND_NAMES}
        />
    );
};
