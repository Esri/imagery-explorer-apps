import { test, expect, Page } from '@playwright/test';
import { 
    mockedSentinel2LandcoverRasterAttributeTableResponse, 
    mockedSentinel2LandcoverServiceJSONResponse, 
    mockedSentinel2LandcoverComputeHistogramResponse, 
    mockedSentinel2IdentifyResponse
} from './mockedResponses';

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

    // Mock the raster attribute table response for Sentinel2_10m_LandCover
    await page.route(
        '**/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?**',
        async (route) => {
            console.log(
                'Mocking Sentinel2_10m_LandCover rasterAttributeTable response'
            );
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedSentinel2LandcoverRasterAttributeTableResponse),
            });
        }
    );

    // Mock the time info response for Sentinel2_10m_LandCover
    await page.route(
        '**/Sentinel2_10m_LandCover/ImageServer?f=json',
        async (route) => {
            console.log('Mocking Sentinel2_10m_LandCover Service JSON response');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedSentinel2LandcoverServiceJSONResponse),
            });
        }
    );

    // mock the computeHistogram endpoint
    await page.route(
        '**/Sentinel2_10m_LandCover/ImageServer/computeHistograms?**',
        async (route) => {
            console.log('Mocking computeHistograms response');
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedSentinel2LandcoverComputeHistogramResponse),
            });
        }
    );

    await page.route(
        '**/Sentinel2_10m_LandCover/ImageServer/identify?**',
        async (route) => {
            // console.log('Mocking identify response');

            const url = new URL(route.request().url());

            const mosaicRule = decodeURIComponent(
                url.searchParams.get('mosaicRule') || ''
            );

            if(mosaicRule.includes('2017') || mosaicRule.includes('2018') || mosaicRule.includes('2019')) {
                console.log('Mocking identify response for 2017-2019');
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        ...mockedSentinel2IdentifyResponse,
                        value: "2" // Trees
                    }),
                });
            }
            else if(mosaicRule.includes('2020') || mosaicRule.includes('2021') || mosaicRule.includes('2022')) {
                console.log('Mocking identify response for 2020-2022');
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        ...mockedSentinel2IdentifyResponse,
                        value: "7" // Built Area
                    }),
                });
            }
            else {
                console.log('Mocking identify response for other years');
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        ...mockedSentinel2IdentifyResponse,
                        value: "11" // Rangeland
                    }),
                });
            }


        }
    );
};

export const resetMockSentinel2LancoverNetworkRequest = async (page: Page) => {
    await page.unroute('https://mtags.arcgis.com/tags-min.js');
    await page.unroute(
        '**/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?*'
    );
    await page.unroute('**/Sentinel2_10m_LandCover/ImageServer/?f=json');
    await page.unroute(
        '**/Sentinel2_10m_LandCover/ImageServer/computeHistograms?*'
    );
    await page.unroute('**/Sentinel2_10m_LandCover/ImageServer/identify?*');
};