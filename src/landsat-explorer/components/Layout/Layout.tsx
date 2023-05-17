import React from 'react';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';
import { AppHeader } from '../../../shared/components/AppHeader';
import { ModeSelector } from '../ModeSelector';
import { SwipeLayerSelector } from '../SwipeLayerSelector';
import { SceneInfo } from '../SceneInfo';

const Layout = () => {
    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <ModeSelector />
                <SwipeLayerSelector />
                <Calendar />
                <RasterFunctionSelector />
                <SceneInfo />
            </BottomPanel>
        </>
    );
};

export default Layout;
