import React from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';

const CalendarContainer = () => {
    return (
        <Calendar
            year={2020}
            selectedDate="2020-07-13"
            availableDates={[]}
            cloudyDates={[]}
        />
    );
};

export default CalendarContainer;
