import { test, expect, Page } from '@playwright/test';
import { mockedQuerySentinel2ScenesResponse } from './mockedQuerySentinel2ScenesResponse';
/**
 * Mock the network requests for the Sentinel-2 Explorer app.
 * Using the mocked data to ensure the test is isolated and does not depend on live API responses.
 * @param page
 */
export const mockSentinel2NetworkRequests = async (page: Page) => {
    // Intercept and block the script
    await page.route('https://mtags.arcgis.com/tags-min.js', (route) =>
        route.abort()
    );

    // Mock the response for the Sentinel-2 scenes query
    await page.route(
        '*/**/Sentinel2L2A/ImageServer/query?**',
        async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedQuerySentinel2ScenesResponse),
            });
        }
    );
};

export const resetMockSentinel2NetworkRequest = async (page: Page) => {
    await page.unroute('https://mtags.arcgis.com/tags-min.js');
    await page.unroute(
        '*/**/Sentinel2L2A/ImageServer/query?**'
    );
};