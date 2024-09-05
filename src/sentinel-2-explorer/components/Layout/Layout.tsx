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

// import { TrendTool } from '../TemporalProfileTool';
// import { MaskTool } from '../MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { SpectralTool } from '../SpectralTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import { appConfig } from '@shared/config';
// import { LandsatRasterFunctionSelector } from '../RasterFunctionSelector';
// import { LandsatInterestingPlaces } from '../InterestingPlaces';
// import { AnalyzeToolSelector4Landsat } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { CloudFilter } from '@shared/components/CloudFilter';
import { Sentinel2DynamicModeInfo } from '../Sentinel2DynamicModeInfo/Sentinel2DynamicModeInfo';
import { Sentinel2RasterFunctionSelector } from '../RasterFunctionSelector';
import { useQueryAvailableSentinel2Scenes } from '../../hooks/useQueryAvailableLandsatScenes';
import { SceneInfo } from '../SceneInfo';
import { Sentinel2AnalyzeToolSelector } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { Sentinel2MaskTool } from '../MaskTool';
import { Sentinel2ChangeCompareTool } from '../ChangeCompareTool';
import { Sentinel2SpectralProfileTool } from '../SpectralProfileTool';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const dynamicModeOn = mode === 'dynamic';

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center
     * changes, it will dispatch the query that finds the available sentinel-2 scenes.
     */
    useQueryAvailableSentinel2Scenes();

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} />
                <BottomPanel>
                    <div className="mx-auto">
                        <Sentinel2DynamicModeInfo />
                        {/* <LandsatInterestingPlaces /> */}
                        <Sentinel2RasterFunctionSelector />
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
                            <Sentinel2AnalyzeToolSelector />
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
                            <Sentinel2DynamicModeInfo />
                            {/* <LandsatInterestingPlaces /> */}
                        </>
                    ) : (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar>
                                    <CloudFilter />
                                </Calendar>
                            </div>

                            {mode === 'analysis' && (
                                <div className="analyze-tool-and-scene-info-container">
                                    <Sentinel2MaskTool />
                                    {/* <TrendTool /> */}
                                    <Sentinel2SpectralProfileTool />
                                    <Sentinel2ChangeCompareTool />
                                </div>
                            )}

                            <SceneInfo />
                        </>
                    )}

                    <Sentinel2RasterFunctionSelector />
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
