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
import { MaskTool } from '../MaskTool';
import { selectActiveAnalysisTool } from '@shared/store/Analysis/selectors';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <ModeSelector />

                {(mode === 'swipe' || mode === 'animate') && (
                    <div className="container-of-secondary-controls">
                        <SwipeLayerSelector />
                        <AnimationControl />
                    </div>
                )}

                {mode === 'analysis' && analysisTool === 'mask' && <MaskTool />}

                {(mode === 'find a scene' ||
                    mode === 'swipe' ||
                    mode === 'animate' ||
                    mode === 'analysis') && (
                    <>
                        <div className="flex flex-grow justify-between">
                            <div className="flex shrink-0 pl-4">
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
