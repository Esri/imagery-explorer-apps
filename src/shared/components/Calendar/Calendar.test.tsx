import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Calendar from './Calendar';

describe('test Calendar component', () => {
    it('should render all month/days in selected year', () => {
        const { getByTestId } = render(
            <Calendar
                year={2020}
                selectedDate="2020-07-13"
                acquisitionDates={[]}
            />
        );

        // should handle leap year
        expect(getByTestId(/2020-02-29/i)).toBeTruthy();
    });
});
