import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { 
    mockSentinel2LandcoverNetworkRequests, 
    resetMockSentinel2LancoverNetworkRequest
} from '../mock-data/mockLandcoverExplorerNetworkRequests';
import { clickOnMap } from '../helpers';

test.describe('Sentinel-2 Land Cover Explorer - Map Popup', () => {

    const AppURL = `${DEV_SERVER_URL}/#mapCenter=-116.96259%2C34.09604%2C11.90`;
 
    test('verify the Popup displays the correct information for the selected location', 
        async ({ page }) => {
        // Set up network mocks 
        await mockSentinel2LandcoverNetworkRequests(page);

        await page.goto(AppURL);

        // Click on the map at the specified coordinates (500, 500)
        await clickOnMap(page, 500, 500);

        // Verify the popup is visible
        const popupContent = page.getByTestId('landcover-popup-content');
        await expect(popupContent).toBeVisible({
            timeout: 30000 // Wait up to 30 seconds for the popup to appear
        });

        // This is the expected popup content based on the mock data
        const popupItems:{
            year: number;
            className: string;
        }[] = [
            { year: 2017, className: 'Trees' },
            { year: 2018, className: 'Trees' },
            { year: 2019, className: 'Trees' },
            { year: 2020, className: 'Built Area' },
            { year: 2021, className: 'Built Area' },
            { year: 2022, className: 'Built Area' },
            { year: 2023, className: 'Rangeland' },
            { year: 2024, className: 'Rangeland' }
        ]

        // Verify the popup items for each year
        for (const item of popupItems) {
            const popupItem = page.getByTestId(`popup-item-${item.year}-${item.className}`);
            await expect(popupItem).toBeVisible();
            await expect(popupItem).toContainText(item.year.toString());
            await expect(popupItem).toContainText(item.className);
        }

        // // pause the test to allow manual inspection
        // await page.pause();

        // Clean up network mocks
        await resetMockSentinel2LancoverNetworkRequest(page);
    })
})
