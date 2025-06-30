import { test, expect, Page } from '@playwright/test';
import { 
    mockedQuerySentinel2ScenesResponse2024,
    mockedQuerySentinel2ScenesResponse2023
} from './mockedQuerySentinel2ScenesResponse';
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
            const url = new URL(route.request().url());

            const whereClause = decodeURIComponent(
                url.searchParams.get('where') || ''
            );

            if( whereClause && whereClause.includes('2024')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedQuerySentinel2ScenesResponse2024),
                });

                return;
            }

            if (whereClause && whereClause.includes('2023')) {
                // Mock response for 2023 if needed
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedQuerySentinel2ScenesResponse2023), // Empty response for 2023
                });

                return;
            }

            // Mock response for other years or cases
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ features: [] }), // Empty response for 2023
            });

        }
    );

    await page.route(
        '*/**/sharing/rest/content/users/*/addItem',
        async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    id: 'mocked-item-id',
                    folder: '',
                }),
            });
        }
    );
};

export const resetMockSentinel2NetworkRequest = async (page: Page) => {
    await page.unroute('https://mtags.arcgis.com/tags-min.js');
    await page.unroute(
        '*/**/Sentinel2L2A/ImageServer/query?**'
    );
    await page.unroute(
        '*/**/sharing/rest/content/users/*/addItem'
    );
};