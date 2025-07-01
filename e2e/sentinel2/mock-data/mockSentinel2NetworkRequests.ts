import { test, expect, Page } from '@playwright/test';
import { 
    mockedQuerySentinel2ScenesResponse2024,
    mockedQuerySentinel2ScenesResponse2023
} from './mockedQuerySentinel2ScenesResponse';


/**
 * A map of features by their objectid for quick lookup.
 */
const mockedFeatureByObjectIdMap: Map<number, any> = new Map(
    [
        ...mockedQuerySentinel2ScenesResponse2023.features,
        ...mockedQuerySentinel2ScenesResponse2024.features
    ].map((feature) => [feature.attributes.objectid, feature])
);

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

            const objectIds = decodeURIComponent(
                url.searchParams.get('objectIds') || ''
            );

            const returnExtentOnly = decodeURIComponent(
                url.searchParams.get('returnExtentOnly') || ''
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

            if(returnExtentOnly === 'true'){
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        extent: {
                            xmin: -117.235,
                            ymin: 34.025,
                            xmax: -117.135,
                            ymax: 34.085,
                            spatialReference: { wkid: 4326 }
                        }
                    }),
                });
                return;
            }

            if( objectIds && mockedFeatureByObjectIdMap.has(+objectIds)) {
                const feature = mockedFeatureByObjectIdMap.get(+objectIds);
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        features: [{
                            ...feature,
                        }]
                    }),
                });

                return;
            }

            // let it pass through if no conditions matched
            await route.continue();

            // // Mock response for other years or cases
            // await route.fulfill({
            //     status: 200,
            //     contentType: 'application/json',
            //     body: JSON.stringify({ features: [] }), // Empty response for 2023
            // });

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