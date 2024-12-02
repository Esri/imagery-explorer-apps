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
import { appConfig } from '@shared/config';
// import { SceneInfo as LandsatSceneInfo } from '@landsat-explorer/components/SceneInfo';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
// import { ContainerOfSecondaryControls } from '@shared/components/ModeSelector';
import { SamplingPointsList } from '../SamplingPointsList';
import { SamplingResults } from '../SamplingResults';
//import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
//import { LandsatRasterFunctionSelector } from '@landsat-explorer/components/RasterFunctionSelector';
import { useQueryAvailableEmitScenes } from '@emit-explorer/hooks/useQueryAvailableEmitScenes';
import { EmitRasterFunctionSelector } from '@emit-explorer/components/RasterFunctionSelector';

const Layout = () => {
    useSaveAppState2HashParams();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableEmitScenes();

    return (
        <>
            <AppHeader title={appConfig.title} />
            <BottomPanel>
                <div className="w-44 shrink-0">
                    <SamplingPointsList />
                </div>

                <div className="shrink-0 ml-5">
                    <SamplingResults />
                </div>

                <div className="flex flex-grow justify-center shrink-0">
                    <>
                        <div className="ml-2 3xl:ml-0">
                            <Calendar />
                        </div>

                        <div className="flex shrink-0 ml-4">
                            <EmitRasterFunctionSelector />
                        </div>
                    </>
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
