import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { 
    mockSentinel2LandcoverNetworkRequests, 
    resetMockSentinel2LancoverNetworkRequest
} from '../mock-data/mockLandcoverExplorerNetworkRequests';

test.describe('Sentinel-2 Land Cover Explorer - Land Cover Layer', () => {

    const AppURL = `${DEV_SERVER_URL}/#mapCenter=-116.96259%2C34.09604%2C11.90&year=2021`;

    test('verify the time correct parameter in exportImage request', async ({ page }) => {
        // Set up network mocks 
        await mockSentinel2LandcoverNetworkRequests(page);

        await page.goto(AppURL);

        // verify the exportImage request contains the correct time extent
        const exportImageRequestPromise = page.waitForRequest(
            request => request.url().includes('Sentinel2_10m_LandCover/ImageServer/exportImage') 
        );

        // Make sure the exportImage request of land cover layer is triggered and contains the time parameter that matches the year 2021
        const exportImageRequest = await exportImageRequestPromise;
        const url = new URL(exportImageRequest.url());
        const timeParam = url.searchParams.get('time') || ''
        // console.log('Time Parameter:', timeParam);
        expect(timeParam).toBeDefined(); // or check for a specific value
        expect(!isNaN(+timeParam)).toBe(true); // Check if the time parameter is a valid number
        expect(new Date(+timeParam).getUTCFullYear()).toBe(2021); // Check if the time parameter contains '2021'

        // // pause the test to allow manual inspection
        // await page.pause();

        // Clean up network mocks
        await resetMockSentinel2LancoverNetworkRequest(page);
    })
})
