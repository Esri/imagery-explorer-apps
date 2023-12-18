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
import { useQueryAvailableLandsatScenes } from '@landsat-explorer/hooks/useQueryAvailableLandsatScenes';
import { LandsatRasterFunctionSelector } from '@landsat-explorer/components/RasterFunctionSelector';

const Layout = () => {
    useSaveAppState2HashParams();

    /**
     * This custom hook gets invoked whenever the acquisition year, map center, or selected landsat missions
     * changes, it will dispatch the query that finds the available landsat scenes.
     */
    useQueryAvailableLandsatScenes();

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
                            <LandsatRasterFunctionSelector />
                        </div>
                    </>
                </div>
            </BottomPanel>
        </>
    );
};

export default Layout;
