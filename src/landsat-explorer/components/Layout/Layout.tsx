import React from 'react';
import BottomPanel from '@shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';
import { AppHeader } from '@shared/components/AppHeader';
import { ModeSelector } from '../ModeSelector';
import { SwipeLayerSelector } from '../SwipeLayerSelector';
import { SceneInfo } from '../SceneInfo';
import { useSelector } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import { AnimationControl } from '../AnimationControl';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <ModeSelector />

                {mode !== 'explore' && (
                    <>
                        <div className="flex w-40 shrink-0">
                            <SwipeLayerSelector />
                            {/* <AnimationFrames /> */}
                            <AnimationControl />
                        </div>

                        <div className="flex flex-grow justify-between">
                            <div className="flex shrink-0">
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
