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
import { useAppSelector } from '@shared/store/configureStore';

import { MaskTool } from '../MaskTool';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { appConfig } from '@shared/config';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { TrendTool } from '../TrendTool';
// import { LandsatSurefaceTempModeSelector } from '../ModeSelector';
import { DynamicModeInfo } from '../DynamicModeInfo/DynamicModeInfo';
import { useOpenAboutThisAppLink } from '../../hooks/useOpenAboutThisAppLink';
import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { AnimationControl } from '@shared/components/AnimationControl';
import { AnalyzeToolSelector4LandsatSurfaceTemp } from '../ModeSelector/AnalyzeToolSelector';
import { UrbanHeatIsland } from '../UrbanHeatIsland';
import { UrbanHeatIslandPanelSelector } from '../UrbanHeatIsland/UrbanHeatIslandPanelSelector';

const Layout = () => {
    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    const dynamicModeOn = mode === 'dynamic';

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    useSaveAppState2HashParams();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableLandsatScenes();

    // Landsat Surface Temp app has no About This App Modal,
    // we will just open this link in a new tab whenever user clicks on the About button
    useOpenAboutThisAppLink();

    const getBottomPanelContent = () => {
        if (dynamicModeOn) {
            return <DynamicModeInfo />;
        }

        if (mode === 'analysis' && analyzeTool === 'urban heat island') {
            return <UrbanHeatIsland />;
        }

        return (
            <>
                <div className="ml-2 3xl:ml-0">
                    <Calendar />
                </div>

                {mode === 'analysis' && (
                    <div className="ml-6 3xl:ml-16">
                        <MaskTool />
                        <TrendTool />
                    </div>
                )}
            </>
        );
    };

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader title={appConfig.title} />
                <BottomPanel>
                    <div className="mx-auto">
                        <DynamicModeInfo />
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
                    {/* <LandsatSurefaceTempModeSelector /> */}
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                            <AnalyzeToolSelector4LandsatSurfaceTemp />
                        </ContainerOfSecondaryControls>
                    )}

                    {mode === 'analysis' &&
                        analyzeTool === 'urban heat island' && (
                            <ContainerOfSecondaryControls>
                                <UrbanHeatIslandPanelSelector />
                            </ContainerOfSecondaryControls>
                        )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    {/* {dynamicModeOn && <DynamicModeInfo />}

                    {dynamicModeOn === false && (
                        <>
                            <div className="ml-2 3xl:ml-0">
                                <Calendar />
                            </div>

                            {mode === 'analysis' && (
                                <div className="ml-6 3xl:ml-16">
                                    <MaskTool />
                                    <TrendTool />
                                </div>
                            )}
                        </>
                    )} */}
                    {getBottomPanelContent()}
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
