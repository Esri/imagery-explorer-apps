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
// import { AnalysisToolSelector } from '@shared/components/AnalysisToolSelector';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import { appConfig } from '@shared/config';
import { useQueryAvailableSentinel1Scenes } from '../../hooks/useQueryAvailableSentinel1Scenes';
import { SceneInfo } from '../SceneInfo';
import { Sentinel1FunctionSelector } from '../RasterFunctionSelector';
import { OrbitDirectionFilter } from '../OrbitDirectionFilter';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { Sentinel1AnalyzeToolSelector } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { TemporalCompositeLayerSelector } from '../TemporalCompositeLayerSelector';
import { TemporalCompositeTool } from '../TemporalCompositeTool/TemporalCompositeTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import classNames from 'classnames';
import { ChangeCompareTool4Sentinel1 } from '../ChangeCompareTool';
import { Sentinel1TemporalProfileTool } from '../TemporalProfileTool';
import { Sentinel1MaskTool } from '../MaskTool';
import { useSaveSentinel1State2HashParams } from '../../hooks/saveSentinel1State2HashParams';
import { Sentinel1InterestingPlaces } from '../InterestingPlaces';
import { Sentinel1DynamicModeInfo } from '../Sentinel1DynamicModeInfo/Sentinel1DynamicModeInfo';
// import { Sentinel1DocPanel } from '../DocPanel';
import { useSyncRenderers } from '@shared/hooks/useSyncRenderers';

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

    /**
     * save common, app-wide state to URL hash params
     */
    useSaveAppState2HashParams();

    /**
     * save sentinel1-explorer related state to URL hash params
     */
    useSaveSentinel1State2HashParams();

    /**
     * This custom hook syncs the renderer of the secondary imagery scene with the main scene
     */
    useSyncRenderers();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} showDocButton={true} />
                <BottomPanel>
                    <div className="mx-auto">
                        <Sentinel1DynamicModeInfo />
                        <Sentinel1InterestingPlaces />
                        <Sentinel1FunctionSelector />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader
                title={appConfig.title}
                showDocButton={true}
                docButtonTooltip="Learn more about Sentinel-1 SAR imagery"
            />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <Sentinel1AnalyzeToolSelector />
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
                            <Sentinel1DynamicModeInfo />
                            <Sentinel1InterestingPlaces />
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
                                    <Sentinel1MaskTool />
                                    <ChangeCompareTool4Sentinel1 />
                                    <TemporalCompositeTool />
                                    <Sentinel1TemporalProfileTool />
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
