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

import React, { useState } from 'react';
import { useFormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { useSelector } from 'react-redux';
import { selectClassifictionNameOfSpectralSamplingTask } from '@shared/store/SpectralSamplingTool/selectors';
// import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { saveLandsatSamplingResults } from './helpers';
import { useAveragedBandValues } from './useAveragedSamplingResults';

export const SaveSamplingResults = () => {
    const samplingPointsData = useFormattedSpectralSamplingData();

    const averagedBandValues = useAveragedBandValues();

    const classification = useSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    const saveSamplingResults = () => {
        saveLandsatSamplingResults(
            classification,
            samplingPointsData,
            averagedBandValues
        );
    };

    return (
        <div className="text-right pr-4 flex items-center justify-end">
            <calcite-icon icon="download-to" scale="s" />
            <span
                className="cursor-pointer underline text-xs"
                onClick={saveSamplingResults}
            >
                Download
            </span>
        </div>
    );
};
