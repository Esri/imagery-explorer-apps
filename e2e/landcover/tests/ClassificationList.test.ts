import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { 
    mockSentinel2LandcoverNetworkRequests, 
    resetMockSentinel2LancoverNetworkRequest
} from '../mock-data/mockLandcoverExplorerNetworkRequests';

test.describe('Sentinel-2 Land Cover Explorer - Classification List', () => {

    const AppURL = `${DEV_SERVER_URL}/#mapCenter=-116.96259%2C34.09604%2C11.90`;

    test('verify the time correct parameter in exportImage request', async ({ page }) => {
        // Set up network mocks 
        await mockSentinel2LandcoverNetworkRequests(page);

        await page.goto(AppURL);

        // verify the classification list is visible
        const classificationsList = page.getByTestId('land-cover-classifications-list');
        await expect(classificationsList).toBeVisible();

        // verify the classification list contains the expected number of items
        const classificationItems = page.locator('[data-testid^="land-cover-classification-"]');
        await expect(classificationItems).toHaveCount(9); // Assuming there are 10 classifications

        // Verify the classification item for 'tree' is present and clickable
        const treeClassificationItem = page.getByTestId('land-cover-classification-Trees');
        await expect(treeClassificationItem).toBeVisible();
        await treeClassificationItem.click();

        // Verify the selected classification is highlighted
        await expect(treeClassificationItem).toHaveAttribute('data-selected', 'true');

        // verify the exportImage request contains the correct Raster Function for Trees
        const exportImageRequestPromise = page.waitForRequest(
            request => request.url().includes('Sentinel2_10m_LandCover/ImageServer/exportImage') 
        );

        // Wait for the exportImage request and ensure it contains the correct rendering rule for 'Trees'
        // The renderingRule parameter should be a stringified object referencing the selected classification,
        // e.g., {"rasterFunction":"Isolate Trees for Visualization and Analysis"}
        const exportImageRequest = await exportImageRequestPromise;
        const url = new URL(exportImageRequest.url());
        const renderingRule = url.searchParams.get('renderingRule') || ''
        expect(renderingRule).toContain('Trees'); // Check if the stringified rendering rule object contains 'Trees'

        // Verify the classification item for 'tree' is unselected when clicked again
        await treeClassificationItem.click();
        await expect(treeClassificationItem).toHaveAttribute('data-selected', 'false');

        // pause the test to allow manual inspection
        await page.pause();

        // Clean up network mocks
        await resetMockSentinel2LancoverNetworkRequest(page);
    })
})
