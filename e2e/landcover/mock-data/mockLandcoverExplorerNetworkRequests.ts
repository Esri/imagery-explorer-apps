import { test, expect, Page } from '@playwright/test';

/**
 * Mock the network requests for the Sentinel-2 Explorer app.
 * Using the mocked data to ensure the test is isolated and does not depend on live API responses.
 * @param page
 */
export const mockSentinel2LandcoverNetworkRequests = async (page: Page) => {
    // Intercept and block the script
    await page.route('https://mtags.arcgis.com/tags-min.js', (route) =>
        route.abort()
    );
};

export const resetMockSentinel2LancoverNetworkRequest = async (page: Page) => {
    await page.unroute('https://mtags.arcgis.com/tags-min.js');
};