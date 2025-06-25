import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { selectDayFromCalendar, formatInUTCTimeZone, formattedDateString2Unixtimestamp } from '../helpers';

test.describe('Sentinel-2 Explorer - Map Popup', () => {

    test('Map Popup in Find a Scene Mode', async ({ page }) => {
        const FIND_A_SCENE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516&mode=find+a+scene`;

        // Mock network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);

        await page.goto(FIND_A_SCENE_MODE_URL);

        // test the map popup for a specific date
        await testMapPopup(
            page, 
            '2024-01-03',
        );

        // test the map popup for another date
        await testMapPopup(
            page, 
            '2023-08-01',
        );

        // Uncomment to pause the test for manual inspection
        await page.pause();

        // Reset mocked network requests after the test
        await resetMockSentinel2NetworkRequest(page);
    })
})

/**
 * Tests the map popup functionality for a given date in the Sentinel-2 imagery explorer app.
 *
 * This function performs the following steps:
 * 1. Locates the map view container and ensures it is visible.
 * 2. Selects the specified day from the calendar.
 * 3. Clicks on the map to trigger the popup.
 * 4. Verifies the popup is visible and its title contains the formatted date.
 * 5. Checks that the popup content contains the expected spectral indices (NDMI, NDVI, MNDWI).
 * 6. Ensures the popup location info is present and clickable.
 * 7. Verifies that the coordinates are copied to the clipboard in the expected format.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param date - The date string (in 'YYYY-MM-DD' format) to select and test the popup for.
 */
export const testMapPopup = async (page: Page, date: string) => {
    // Locate the map view container
    const mapView = page.locator('.esri-view-root');
    await expect(mapView).toBeVisible()

    // Select the specified day from the calendar
    await selectDayFromCalendar(page, date);
    
    // Wait for the exportImage network request to complete
    const exportImagePromise = page.waitForResponse(request =>
        request.url().includes('Sentinel2L2A/ImageServer/exportImage') && request.status() === 200, {
            timeout: 20000 // Wait up to 20 seconds for the response
        }
    );
    await exportImagePromise;

    // Click on the map to trigger the popup
    await mapView.click({
        position: {
            x: 500,
            y: 500
        }
    });

    // Wait for the identify network request, which populates the popup content
    const identifyPromise = page.waitForResponse(request =>
        request.url().includes('Sentinel2L2A/ImageServer/identify') && request.status() === 200, {
            timeout: 20000 // Wait up to 20 seconds for the response
        }
    );
    await identifyPromise;

    // Verify the popup is visible
    const popup = page.locator('.esri-popup__main-container');
    await expect(popup).toBeVisible({
        timeout: 10000 // Wait up to 10 seconds
    });

    // Verify the popup title contains the formatted date
    const formattedDateLabel = formatInUTCTimeZone(
        formattedDateString2Unixtimestamp(date)
    )

    expect(popup).toContainText(formattedDateLabel, {
        timeout: 10000 // Wait up to 10 seconds
    });

    // Verify the popup content contains the expected spectral indices
    // The popup content should have data attributes for NDMI, NDVI, and MND
    const popupContent = popup.getByTestId('sentinel-2-popup-content');
    await expect(popupContent).toBeVisible();

    const ndmiValue = await popupContent.getAttribute('data-sentinel-2-ndmi');
    testSpectralIndex(ndmiValue);

    const ndviValue = await popupContent.getAttribute('data-sentinel-2-ndvi');
    testSpectralIndex(ndviValue);

    const mndwiValue = await popupContent.getAttribute('data-sentinel-2-mndwi');
    testSpectralIndex(mndwiValue);

    // Verify the popup location info is present and clickable
    const locationInfo = popup.getByTestId('popup-location-info-content');
    await expect(locationInfo).toBeVisible();
    await locationInfo.click();

    // Verify the coordinates are copied to clipboard
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    const coordinatesRegex = /x: -?\d+(\.\d+)? y: -?\d+(\.\d+)?/;
    expect(clipboardText).toMatch(coordinatesRegex);
}

/**
 * Tests whether a given spectral index value is defined, can be converted to a number,
 * and falls within the valid range of -1 to 1 (inclusive).
 *
 * @param spectralIndexValue - The spectral index value as a string or null.
 *
 * @remarks
 * This function is typically used in test suites to validate the correctness of
 * computed spectral index values (such as NDMI, NDVI, etc.) in remote sensing applications.
 *
 * @throws Will throw an assertion error if the value is undefined, not a number,
 *         or outside the valid range.
 */
export const testSpectralIndex = (spectralIndexValue:string | null) => {
    expect(spectralIndexValue).toBeDefined();
    const ndmiNumber = Number(spectralIndexValue);
    expect(ndmiNumber).not.toBeNaN();
    expect(ndmiNumber).toBeGreaterThanOrEqual(-1);
    expect(ndmiNumber).toBeLessThanOrEqual(1);
}