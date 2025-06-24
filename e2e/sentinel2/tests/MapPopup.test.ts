import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { selectDayFromCalendar, formatInUTCTimeZone, formattedDateString2Unixtimestamp } from '../helpers';

export const testMapPopup = async (page: Page, date: string) => {
    // Locate the map view container
    const mapView = page.locator('.esri-view-root');
    await expect(mapView).toBeVisible()

    // Select the specified day from the calendar
    await selectDayFromCalendar(page, date);
    
    // Wait for the exportImage network request to complete
    const exportImagePromise = page.waitForResponse(request =>
        request.url().includes('Sentinel2L2A/ImageServer/exportImage') && request.status() === 200
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
        request.url().includes('Sentinel2L2A/ImageServer/identify') && request.status() === 200
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

}

test.describe('Sentinel-2 Explorer - Map Popup', () => {

    test('Map Popup in Find a Scene Mode', async ({ page }) => {
        const FIND_A_SCENE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516&mode=find+a+scene`;

        // Mock network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);

        await page.goto(FIND_A_SCENE_MODE_URL);

        await testMapPopup(page, '2024-01-03');
        await testMapPopup(page, '2023-08-01');

        // // Uncomment to pause the test for manual inspection
        // await page.pause();

        // Reset mocked network requests after the test
        await resetMockSentinel2NetworkRequest(page);
    })
})
