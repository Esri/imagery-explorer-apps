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

import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { SceneInfo } from '../SceneInfo';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { AnimationControl } from '@shared/components/AnimationControl';

import { TrendTool } from '../TemporalProfileTool';
import { MaskTool } from '../MaskTool';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { DynamicModeInfo } from '@shared/components/DynamicModeInfo';
import { LandsatSpectralProfileTool } from '../SpectralTool';
import { ChangeCompareLayerSelector } from '@shared/components/ChangeCompareLayerSelector';
import { ChangeCompareTool } from '../ChangeCompareTool';
import { APP_NAME, appConfig } from '@shared/config';
import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
import { LandsatRasterFunctionSelector } from '../RasterFunctionSelector';
import { LandsatInterestingPlaces } from '../InterestingPlaces';
import { LandsatMissionFilter } from '../LandsatMissionFilter';
import { AnalyzeToolSelector4Landsat } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { CloudFilter } from '@shared/components/CloudFilter';
import { LandsatDynamicModeInfo } from '../LandsatDynamicModeInfo/LandsatDynamicModeInfo';
import { LandsatSavePanel } from '../LandsatSavePanel/LandsatSavePanel';
import { useTranslation } from 'react-i18next';

const Layout = () => {
    const { t } = useTranslation();

    const appTitle = t('esri_landsat_explorer', {
        ns: APP_NAME,
    });

    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const dynamicModeOn = mode === 'dynamic';

    // const shouldShowSecondaryControls =
    //     mode === 'swipe' || mode === 'animate' || mode === 'analysis';

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableLandsatScenes();

    useSaveAppState2HashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appTitle} />
                <BottomPanel>
                    <div className="mx-auto">
                        <LandsatDynamicModeInfo />
                        <LandsatInterestingPlaces />
                        <LandsatRasterFunctionSelector />
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader title={appTitle} />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalyzeToolSelector4Landsat />
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
                            <LandsatDynamicModeInfo />
                            <LandsatInterestingPlaces />
                        </>
                    ) : (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar>
                                    <LandsatMissionFilter />
                                    <CloudFilter />
                                </Calendar>
                            </div>

                            {mode === 'analysis' && (
                                <div className="analyze-tool-and-scene-info-container">
                                    <MaskTool />
                                    <TrendTool />
                                    <LandsatSpectralProfileTool />
                                    <ChangeCompareTool />
                                </div>
                            )}

                            <SceneInfo />
                        </>
                    )}

                    <LandsatRasterFunctionSelector />
                </div>
            </BottomPanel>
            <LandsatSavePanel />
        </>
    );
};

export default Layout;
