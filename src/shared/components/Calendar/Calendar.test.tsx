import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Calendar from './Calendar';

describe('test Calendar component', () => {
    it('should include Feb 29 when it is a leap year', () => {
        const { getByTestId } = render(
            <Calendar
                dateRange={{
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                }}
                selectedAcquisitionDate="2024-01-13"
                availableScenes={[]}
                onSelect={(val) => {
                    console.log(val);
                }}
            />
        );

        // should handle leap year
        expect(getByTestId(/2024-02-29/i)).toBeTruthy();
    });
});
