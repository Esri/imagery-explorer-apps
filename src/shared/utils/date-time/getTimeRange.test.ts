// Import the function to be tested
import { getDateRangeForPast12Month } from './getTimeRange'; // Update 'yourFileName' with the correct file path

// use Friday, January 5, 2024 12:00:00 AM GMT as system time
const FAKE_SYSTEM_TIME = 1704412800000;
jest.useFakeTimers().setSystemTime(FAKE_SYSTEM_TIME);

describe('getDateRangeForPast12Month function', () => {
    it('should return the correct date range for the past 12 months', () => {
        // Execute the function to get the date range
        const result = getDateRangeForPast12Month();

        // Assertions to verify the expected start and end dates
        expect(result.startDate).toBe('2023-02-01');
        expect(result.endDate).toBe('2024-01-31');
    });
});
