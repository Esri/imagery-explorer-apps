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
import { AnimationControl } from '@shared/components/AnimationControl';
import { SwipeLayerSelector } from '@shared/components/SwipeLayerSelector';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { useShouldShowSecondaryControls } from '@shared/hooks/useShouldShowSecondaryControls';
import { useTranslation } from 'react-i18next';
import { Notification } from '@shared/components/Notification';
import { SceneInfo } from '../SceneInfo';

export const AppLayout = () => {
    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const shouldShowSecondaryControls = useShouldShowSecondaryControls();

    // /**
    //  * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
    //  * changes, it will dispatch the query that finds the available landsat scenes.
    //  */
    // useQueryAvailableLandsatScenes();

    useSaveAppState2HashParams();

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
                    <ModeSelector />

                    {shouldShowSecondaryControls && (
                        <ContainerOfSecondaryControls>
                            <SwipeLayerSelector />
                            <AnimationControl />
                        </ContainerOfSecondaryControls>
                    )}
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    <div className="ml-2 3xl:ml-0">
                        {/* <Calendar>
                            <LandsatMissionFilter />
                            <CloudFilter />
                        </Calendar> */}
                        <p>Placeholder for scene selection</p>
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
