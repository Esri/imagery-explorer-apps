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
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { AnimationControl } from '@shared/components/AnimationControl';
import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import { appConfig } from '@shared/config';
import { useQueryAvailableSentinel1Scenes } from '../../hooks/useQueryAvailableSentinel1Scenes';
import { SceneInfo } from '../SceneInfo';
import { Sentinel1FunctionSelector } from '../RasterFunctionSelector';
import { OrbitDirectionFilter } from '../OrbitDirectionFilter';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { AnalyzeToolSelector4Sentinel1 } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { TemporalCompositeLayerSelector } from '../TemporalCompositeLayerSelector';
import { TemporalCompositeTool } from '../TemporalCompositeTool/TemporalCompositeTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import classNames from 'classnames';
import { ChangeCompareTool4Sentinel1 } from '../ChangeCompareTool';

export const Layout = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const dynamicModeOn = mode === 'dynamic';

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or other filters are
     * changes, it will dispatch the query that finds the available sentinel-1 scenes.
     */
    useQueryAvailableSentinel1Scenes();

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} />
                <BottomPanel>
                    <div className="mx-auto">
                        <DynamicModeInfo />
                        {/* <LandsatInterestingPlaces /> */}
                        <Sentinel1FunctionSelector />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader title={appConfig.title} />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalyzeToolSelector4Sentinel1 />
                        </ContainerOfSecondaryControls>
                    )}

                    {mode === 'analysis' &&
                        analysisTool === 'temporal composite' && (
                            <ContainerOfSecondaryControls>
                                <TemporalCompositeLayerSelector />
                            </ContainerOfSecondaryControls>
                        )}

                    {mode === 'analysis' && analysisTool === 'change' && (
                        <ContainerOfSecondaryControls>
                            <ChangeCompareLayerSelector />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {dynamicModeOn ? (
                        <>
                            <DynamicModeInfo />
                            {/* <LandsatInterestingPlaces /> */}
                        </>
                    ) : (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar>
                                    <OrbitDirectionFilter />
                                </Calendar>
                            </div>

                            {mode === 'analysis' && (
                                <div
                                    className={classNames({
                                        'analyze-tool-and-scene-info-container':
                                            analysisTool !==
                                            'temporal composite',
                                        'analyze-tool-without-scene-info-container':
                                            analysisTool ===
                                            'temporal composite',
                                    })}
                                >
                                    {/* <MaskTool />
                                    <TrendTool />
                                    <SpectralTool /> */}
                                    <ChangeCompareTool4Sentinel1 />
                                    <TemporalCompositeTool />
                                </div>
                            )}

                            <SceneInfo />
                        </>
                    )}

                    <Sentinel1FunctionSelector />
                </div>
            </BottomPanel>
        </>
    );
};
