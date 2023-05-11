import React from 'react';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';
import { Calendar } from '../Calendar';

const Layout = () => {
    return (
        <>
            <BottomPanel>
                <Calendar />
                <RasterFunctionSelector />
            </BottomPanel>
        </>
    );
};

export default Layout;
