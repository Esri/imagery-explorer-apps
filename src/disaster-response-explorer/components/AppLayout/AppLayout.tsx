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
import { AppHeader } from '@shared/components/AppHeader';
import {
    ContainerOfSecondaryControls,
    ModeSelector,
} from '@shared/components/ModeSelector';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '@shared/store/ImageryScene/selectors';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { SceneInfo } from '../SceneInfo';
import { useQueryAvailableDisasterResponseScenes } from '../../hooks/useQueryAvailableDisasterResponseScenes';
import { EventSceneSelector } from '../EventSceneSelector';
import { useSaveDRXStatesToHashParams } from '../../hooks/useSaveDRXStatesToHashParams';
import { CloudFilter } from '@shared/components/CloudFilter';
import { DRXAnalyzeToolSelector } from '../AnalyzeToolSelector/AnalyzeToolSelector';
import { DRXTemporalCompositeLayerSelector } from '../TemporalCompositeLayerSelector/';

export const AppLayout = () => {
    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    /**
     * Query the available Disaster Response scenes when the selected event changes
     */
    useQueryAvailableDisasterResponseScenes();

    useSaveAppState2HashParams();

    /**
     * Save the states specific to Disaster Response Explorer (e.g. selected event, selected scene) to hash params, so that the app state can be restored when users share the URL or revisit the app
     */
    useSaveDRXStatesToHashParams();

    if (IS_MOBILE_DEVICE) {
        return (
            <>
                <AppHeader />
                <BottomPanel>
                    <div className="mx-auto">
                        <p>placeholder for mobile device</p>
                    </div>
                </BottomPanel>
            </>
        );
    }

    return (
        <>
            <AppHeader />
            <BottomPanel>
                <div className="flex flex-shrink-0">
                    <ModeSelector
                        // hideExploreSubModes={true}
                        modesToHide={[
                            'dynamic', // hide 'dynamic' mode as it is not applicable for Disaster Response Explorer. Hidding  'dynamic' mode will cause the sub modes under 'explore' mode (i.e. 'dynamic' and 'find a scene') to be hidden in the Mode Selector, as they are not applicable for Disaster Response Explorer, which only has one explore mode.
                            'animate', // hide 'animate' mode as animation is not applicable for Disaster Response Explorer
                        ]}
                    />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector
                                useAcquisitionTimestampAsLabel={true}
                            />
                            {/* <AnimationControl /> */}
                            <DRXAnalyzeToolSelector />
                        </ContainerOfSecondaryControls>
                    )}

                    {mode === 'analysis' &&
                        analysisTool === 'temporal composite' && (
                            <ContainerOfSecondaryControls>
                                <DRXTemporalCompositeLayerSelector />
                            </ContainerOfSecondaryControls>
                        )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    <div className="ml-2 3xl:ml-0 flex gap-4">
                        {/* <Calendar>
                            <LandsatMissionFilter />
                            <CloudFilter />
                        </Calendar> */}
                        <EventSceneSelector>
                            <CloudFilter />
                        </EventSceneSelector>
                    </div>

                    {/* {mode === 'analysis' && (
                        <div className="analyze-tool-and-scene-info-container">
                            <MaskTool />
                            <TrendTool />
                            <LandsatSpectralProfileTool />
                            <ChangeCompareTool />
                        </div>
                    )} */}

                    <SceneInfo />
                </div>
            </BottomPanel>
        </>
    );
};
