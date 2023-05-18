import React from 'react';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';
import { AppHeader } from '../../../shared/components/AppHeader';
import { ModeSelector } from '../ModeSelector';
import { SwipeLayerSelector } from '../SwipeLayerSelector';
import { SceneInfo } from '../SceneInfo';
import { CloudFilter } from '../CloudFilter';
import { AnimationFramesControl } from '../AnimationControl';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../../../shared/store/Landsat/selectors';

const Layout = () => {
    const mode = useSelector(selectAppMode);

    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <ModeSelector />

                {mode !== 'explore' && (
                    <>
                        <SwipeLayerSelector />
                        <AnimationFramesControl />
                        <CloudFilter />
                        <Calendar />
                        <RasterFunctionSelector />
                        <SceneInfo />
                    </>
                )}
            </BottomPanel>
        </>
    );
};

export default Layout;
