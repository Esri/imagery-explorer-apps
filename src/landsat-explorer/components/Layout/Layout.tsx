import React from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';

const Layout = () => {
    return (
        <div className="absolute bottom-0 left-0 bg-white h-32 w-60 z-10 theme-background">
            <Calendar
                year={2020}
                selectedDate="2020-07-13"
                availableDates={[]}
                cloudyDates={[]}
            />
        </div>
    );
};

export default Layout;
