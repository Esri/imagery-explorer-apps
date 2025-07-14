import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { 
    mockSentinel2LandcoverNetworkRequests, 
    resetMockSentinel2LancoverNetworkRequest
} from '../mock-data/mockLandcoverExplorerNetworkRequests';

test.describe('Sentinel-2 Land Cover Explorer - Download Panel', () => {

    const AppURL = `${DEV_SERVER_URL}/#mapCenter=-94.28143%2C45.11753%2C5`;

    test.setTimeout(60*1000); // Set a longer timeout for the test
 
    test('Verify the Download Panel displays the correct information for the selected location', 
        async ({ page }) => {
        // Set up network mocks 
        await mockSentinel2LandcoverNetworkRequests(page);

        await page.goto(AppURL);

        // verify the download geoTIFF button is visible and enabled
        const downloadButton = page.getByText(/Download GeoTIFF/i);
        await expect(downloadButton).toBeVisible({
            timeout: 30000 // Wait up to 30 seconds for the button to appear
        });
        await downloadButton.click();

        // verfiy the download panel is visible
        const downloadPanel = page.getByTestId('download-panel');
        await expect(downloadPanel).toBeVisible();

        // verify the bulk download links for year 2017 - 2024 are present
        const availableYears = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

        for (const year of availableYears) {
            const testId = `bulk-download-link-${year}`;
            const downloadLink = page.getByTestId(testId);
            await expect(downloadLink).toBeVisible();
            await expect(downloadLink).toHaveAttribute('href');
            const href = await downloadLink.getAttribute('href');
            expect(href).toContain(`lc${year}/lulc${year}.zip`);
            await expect(downloadLink).toHaveText(year);
        }

        // Verify the LULC Footprints layer is visible
        const mapView = downloadPanel.locator('.esri-view-root');
        await expect(mapView).toBeVisible();

        // Wait for the LULC Footprints layer query to complete
        await page.waitForResponse(response =>
            response.url().includes('LULC_Footprints/FeatureServer/0/query') && response.status() === 200
        );

        // Click on the map at the specified coordinates
        await mapView.click({
            position: {
                x: 100,
                y: 100
            }
        });

        // Verify the popup is visible
        const popupContent = downloadPanel.getByTestId('lulc-footprint-popup-content');
        await expect(popupContent).toBeVisible({
            timeout: 30000 // Wait up to 30 seconds for the popup to appear
        });

        // Verify the popup contains the download links for each year
        for (const year of availableYears) {
            const downloadLink = popupContent.getByTestId(`lulc-download-link-${year}`);
            await expect(downloadLink).toBeVisible();
            await expect(downloadLink).toHaveAttribute('href');
            await expect(downloadLink).toHaveText(year);
        }


        await page.pause(); // Pause to allow manual inspection

        // Clean up network mocks
        await resetMockSentinel2LancoverNetworkRequest(page);
    })
})
