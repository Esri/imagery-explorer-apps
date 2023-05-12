import React from 'react';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';
import { AppHeader } from '../../../shared/components/AppHeader';

const Layout = () => {
    return (
        <>
            <AppHeader title="Landsat Explorer" />
            <BottomPanel>
                <Calendar />
                <RasterFunctionSelector />
            </BottomPanel>
        </>
    );
};

export default Layout;
