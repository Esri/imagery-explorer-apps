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
import {
    selectData4SpectralProfileTool,
    selectError4SpectralProfileTool,
    selectIsLoadingData4SpectralProfileTool,
} from '@shared/store/SpectralProfileTool/selectors';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export const SpectralProfileToolMessage = () => {
    const isLoading = useAppSelector(selectIsLoadingData4SpectralProfileTool);

    const spectralProfileData = useAppSelector(selectData4SpectralProfileTool);

    const error4SpectralProfileTool = useAppSelector(
        selectError4SpectralProfileTool
    );

    const spectralProfileToolMessage = useMemo(() => {
        if (isLoading) {
            return 'fetching spectral profile data';
        }

        if (error4SpectralProfileTool) {
            return error4SpectralProfileTool;
        }

        if (!spectralProfileData.length) {
            return 'Select a scene and click on the map to identify the spectral profile for the point of interest.';
        }

        return '';
    }, [isLoading, error4SpectralProfileTool, spectralProfileData]);

    if (!spectralProfileToolMessage) {
        return null;
    }

    return (
        <div className="w-full mt-10 flex justify-center text-center">
            {isLoading && <calcite-loader inline />}
            <p className="text-sm opacity-50">{spectralProfileToolMessage}</p>
        </div>
    );
};
