import React from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
import BottomPanel from '../../../shared/components/BottomPanel/BottomPanel';

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
            </BottomPanel>
        </>
    );
};

export default Layout;
