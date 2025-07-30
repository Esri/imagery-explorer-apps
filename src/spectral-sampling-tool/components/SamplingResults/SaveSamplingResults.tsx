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

import React, { FC, useState } from 'react';
import { useFormattedSpectralSamplingData } from '../SamplingPointsList/useFormattedSpectralSamplingData';
import { useAppSelector } from '@shared/store/configureStore';
import { selectClassifictionNameOfSpectralSamplingTask } from '@shared/store/SpectralSamplingTool/selectors';
// import { convert2csv } from '@shared/utils/snippets/convert2csv';
import { saveSamplingResults } from './helpers';
import { useAveragedBandValues } from './useAveragedSamplingResults';
import { SpectralSamplingToolSupportedService } from '@shared/store/SpectralSamplingTool/reducer';
import { APP_NAME } from '@shared/config';
import { useTranslation } from 'react-i18next';
import { CalciteIcon } from '@esri/calcite-components-react';

type Props = {
    bandNames: string[];
    targetService: SpectralSamplingToolSupportedService;
};

export const SaveSamplingResults: FC<Props> = ({
    bandNames,
    targetService,
}) => {
    const { t } = useTranslation();

    const samplingPointsData = useFormattedSpectralSamplingData();

    const averagedBandValues = useAveragedBandValues();

    const classification = useAppSelector(
        selectClassifictionNameOfSpectralSamplingTask
    );

    return (
        <div className="text-right pr-4 flex items-center justify-end">
            <CalciteIcon icon="download-to" scale="s" />
            <span
                className="cursor-pointer underline text-sm"
                onClick={() => {
                    saveSamplingResults({
                        data: samplingPointsData,
                        averagedBandValues,
                        classification,
                        bandNames,
                        targetService,
                    });
                }}
            >
                {t('download_sampling_results', { ns: APP_NAME })}
            </span>
        </div>
    );
};
