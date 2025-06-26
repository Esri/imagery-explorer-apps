import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { clickOnMap, selectDayFromCalendar, urlHashContains } from '../helpers';
import { mockedIdentityResponseFor20230801 } from '../mock-data/mockedIdentityResponse';

test.describe('Sentinel-2 Explorer - Spectral Profile Tool', () => {

    const APP_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516`;

    test('spectral profile tool functionalities', async ({ page }) => {

        // Set up network mocks and sign in
        await mockSentinel2NetworkRequests(page);

        // Mock the identify request to return a healthy vegetation response
        await page.route(
            '*/**/Sentinel2L2A/ImageServer/identify?**',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedIdentityResponseFor20230801)
                });
            }
        );

        await page.goto(APP_URL);

        // Ensure the Analyze Mode selector is visible and activate it
        const analyzeButton = page.getByTestId('mode-selector-analysis');
        await expect(analyzeButton).toBeVisible();
        await analyzeButton.click();

        // Ensure the spectral profile tool button is visible and activate it
        const spectralProfileButton = page.getByTestId('analyze-tool-selector-spectral');
        await expect(spectralProfileButton).toBeVisible();
        await spectralProfileButton.click();

        // Select a specific date from the calendar
        await selectDayFromCalendar(page, '2023-08-01');

        // Simulate a map click at coordinates (500, 500)
        await clickOnMap(page, 500, 500, true);

        // Check that the spectral profile chart is visible
        const spectralProfileChart = page.getByTestId('spectral-profile-chart');
        await expect(spectralProfileChart).toBeVisible();

        // Check that the spectral profile chart legend is visible
        const spectralProfileChartLegend = page.getByTestId('spectral-profile-chart-legend');
        await expect(spectralProfileChartLegend).toBeVisible();

        // Verify the legend displays the expected feature of interest
        const featureOfInterestName = await spectralProfileChartLegend.getAttribute('data-selected-feature-of-interest');
        expect(featureOfInterestName).toBe('Healthy Vegetation');
        
        // // Pause for manual inspection
        // await page.pause();
        
        // Clean up network mocks
        await resetMockSentinel2NetworkRequest(page);

        // Remove the identify request route
        await page.unroute('*/**/Sentinel2L2A/ImageServer/identify?**')
    })


})
