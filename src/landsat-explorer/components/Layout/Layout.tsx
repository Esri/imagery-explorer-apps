import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import { ModeSelector } from '../ModeSelector';
import { SwipeLayerSelector } from '../SwipeLayerSelector';
import { SceneInfo } from '../SceneInfo';
import { CloudFilter } from '../CloudFilter';
import { AnimationFramesControl } from '../AnimationFramesControl';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import { AnimationStatusControl } from '../AnimationStatusControl';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <ModeSelector />

                {mode !== 'explore' && (
                    <>
                        <div className="flex w-48 shrink-0">
                            <SwipeLayerSelector />
                            <AnimationFramesControl />
                            <AnimationStatusControl />
                        </div>

                        <div className="flex flex-grow justify-between">
                            <div className="flex shrink-0">
                                <CloudFilter />
                                <Calendar />
                            </div>

                            <div className="flex">
                                <RasterFunctionSelector />
                                <SceneInfo />
                            </div>
                        </div>
                    </>
                )}
            </BottomPanel>
        </>
    );
};

export default Layout;
