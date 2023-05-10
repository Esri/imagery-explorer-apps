import React from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';
import { RasterFunctionSelector } from '../RasterFunctionSelector';

const Layout = () => {
    return (
        <>
            <BottomPanel>
                <Calendar
                    year={2020}
                    selectedDate="2020-07-13"
                    availableDates={[]}
                    cloudyDates={[]}
                />
                <RasterFunctionSelector />
            </BottomPanel>
        </>
    );
};

export default Layout;
