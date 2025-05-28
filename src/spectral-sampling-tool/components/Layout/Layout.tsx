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

import React, { useEffect } from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { Calendar } from '@shared/components/Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import { APP_NAME, appConfig } from '@shared/config';
// import { SceneInfo as LandsatSceneInfo } from '@landsat-explorer/components/SceneInfo';
import { useSaveAppState2HashParams } from '@shared/hooks/useSaveAppState2HashParams';
// import { ContainerOfSecondaryControls } from '@shared/components/ModeSelector';
import { SamplingPointsList } from '../SamplingPointsList';
import { SamplingResults } from '../SamplingResults';
import { useAppSelector } from '@shared/store/configureStore';
import { selectTargetService } from '@shared/store/SpectralSamplingTool/selectors';
import { Layout4Sentinel2 } from './Layout4Sentinel2';
import { Layout4Landsat } from './Layout4Landsat';
import { CloudFilter } from '@shared/components/CloudFilter';
import { useTranslation } from 'react-i18next';
import { ta } from 'date-fns/locale';
import { SplashScreen } from '../SplashScreen';
import { useSaveCurrentSession } from '@spectral-sampling-tool/hooks/useSaveCurrentSession';

const Layout = () => {
    const { t } = useTranslation();

    const targetService = useAppSelector(selectTargetService);

    useSaveAppState2HashParams();

    /**
     * This hook is used to save the current session to the indexedDB
     */
    useSaveCurrentSession();

    return (
        <>
            <AppHeader title={t('spectral_sampling_tool', { ns: APP_NAME })} />

            {!targetService && <SplashScreen />}

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
                            <Calendar>
                                <CloudFilter />
                            </Calendar>
                        </div>

                        <div className="flex shrink-0 ml-4">
                            {targetService === 'landsat' && <Layout4Landsat />}
                            {targetService === 'sentinel-2' && (
                                <Layout4Sentinel2 />
                            )}
                        </div>
                    </>
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
