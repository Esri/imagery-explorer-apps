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

import React, { useEffect, useMemo } from 'react';
import { AnalysisToolHeader } from '@shared/components/AnalysisToolHeader';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import classNames from 'classnames';
import {
    selectIsTemporalCompositeLayerOn,
    selectRasterFunction4TemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/selectors';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import { rasterFunction4TemporalCompositeToolChanged } from '@shared/store/TemporalCompositeTool/reducer';
import { TemproalCompositeToolLegend } from './Legend';
import { TemproalCompositeToolControls } from './Controls';
import { DropdownData } from '@shared/components/Dropdown';
import { initialChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';
import { initiateImageryScenes4TemporalCompositeTool } from '@shared/store/TemporalCompositeTool/thunks';
import { Tooltip } from '@shared/components/Tooltip';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';
import { CalciteIcon } from '@esri/calcite-components-react';

export const TemporalCompositeTool = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const tool = useAppSelector(selectActiveAnalysisTool);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const rasterFunction = useAppSelector(
        selectRasterFunction4TemporalCompositeTool
    );

    const listOfQueryParams = useAppSelector(selectListOfQueryParams);

    const rasterFunctionDropdownOptions: DropdownData[] = useMemo(() => {
        const VVdBRasterFunction: Sentinel1FunctionName = 'VV dB Colorized';
        const VHdBRasterFunction: Sentinel1FunctionName = 'VH dB Colorized';

        const data = [
            {
                value: VVdBRasterFunction,
                label: 'VV dB',
            },
            {
                value: VHdBRasterFunction,
                label: 'VH dB',
            },
        ];

        return data.map((d) => {
            return {
                ...d,
                selected: d.value === rasterFunction,
            };
        });
    }, [rasterFunction]);

    if (tool !== 'temporal composite') {
        return null;
    }

    return (
        <div className={classNames('w-full h-full')}>
            <div className="flex w-full justify-center">
                <Tooltip
                    content={t('composite_header_tooltip', { ns: APP_NAME })}
                    width={400}
                >
                    <CalciteIcon scale="s" icon="information" />
                </Tooltip>

                <span className="uppercase text-sm ml-1">
                    {t('composite', { ns: APP_NAME })}
                </span>
            </div>

            <div className="flex">
                <div className="grow mt-2 mr-8 pr-3 border-r border-custom-light-blue-25">
                    <TemproalCompositeToolControls
                        isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
                        rasterFunctionsDropdownData={
                            rasterFunctionDropdownOptions
                        }
                        rasterFunctionOnChange={(
                            val: Sentinel1FunctionName
                        ) => {
                            dispatch(
                                rasterFunction4TemporalCompositeToolChanged(val)
                            );
                        }}
                        clearSelectedScenesButtonOnClick={() => {
                            // call this thunk function to reset the list of imagery scenes to be used for temporal composite tool
                            dispatch(
                                initiateImageryScenes4TemporalCompositeTool(
                                    false
                                )
                            );
                        }}
                    />
                </div>

                <div className="shrink-0">
                    <TemproalCompositeToolLegend
                        isTemporalCompositeLayerOn={isTemporalCompositeLayerOn}
                        acquisitionDateOfImageryScene4RedBand={
                            listOfQueryParams[0]?.acquisitionDate
                        }
                        acquisitionDateOfImageryScene4GreenBand={
                            listOfQueryParams[1]?.acquisitionDate
                        }
                        acquisitionDateOfImageryScene4BlueBand={
                            listOfQueryParams[2]?.acquisitionDate
                        }
                    />
                </div>
            </div>
        </div>
    );
};
