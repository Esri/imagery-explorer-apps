import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { urlHashContains } from '../helpers';

test.describe('Sentinel-2 Explorer - Dynamic Mode', () => {

    test('should select and display interesting places correctly', async ({ page }) => {

        // Set up network mocks and sign in
        await mockSentinel2NetworkRequests(page);

        await page.goto(DEV_SERVER_URL);

        // Ensure interesting places container is visible
        const interestingPlaces = page.getByTestId('interesting-places-container');
        await expect(interestingPlaces).toBeVisible();

        // Check that specific interesting place cards are visible
        const interestingPlaceCard1 = interestingPlaces.getByTestId('grid-card-Fucino');
        const interestingPlaceCard2 = interestingPlaces.getByTestId('grid-card-Mississippi');

        await expect(interestingPlaceCard1).toBeVisible();
        await expect(interestingPlaceCard2).toBeVisible();

        // Select the first card and verify selection state
        await interestingPlaceCard1.click();
        await expect(interestingPlaceCard1).toHaveAttribute('data-selected', 'true');
        await expect(interestingPlaceCard2).toHaveAttribute('data-selected', 'false');

        // Select the second card and verify selection state updates
        await interestingPlaceCard2.click();
        await expect(interestingPlaceCard2).toHaveAttribute('data-selected', 'true');
        await expect(interestingPlaceCard1).toHaveAttribute('data-selected', 'false');

        // Hover over a card and check that the tooltip appears
        await interestingPlaceCard1.hover();
        const tooltip = page.getByTestId('tooltip-container');
        await expect(tooltip).toBeVisible();

        // Clean up network mocks
        await resetMockSentinel2NetworkRequest(page);
    })

    test('should select and display renderers correctly', async ({ page }) => {
        // Set up network mocks and sign in
        await mockSentinel2NetworkRequests(page);

        await page.goto(DEV_SERVER_URL);

        // Ensure renderer selector container is visible
        const renderers = page.getByTestId('renderer-selector-container');
        await expect(renderers).toBeVisible();

        // Check that specific renderer cards are visible and interactable
        const renderer1 = renderers.getByTestId('grid-card-Natural Color');
        const renderer2 = renderers.getByTestId('grid-card-Color IR');
        await renderer1.click();
        await expect(renderer1).toHaveAttribute('data-selected', 'true');
        await expect(renderer2).toHaveAttribute('data-selected', 'false');

        // Verify URL hash updates for the selected renderer
        const naturalColorInHash = await urlHashContains(page, 'Natural+Color+for+Visualization');
        expect(naturalColorInHash).toBeTruthy();

        // Select the second renderer and verify selection state and URL hash
        await renderer2.click();
        await expect(renderer2).toHaveAttribute('data-selected', 'true');
        await expect(renderer1).toHaveAttribute('data-selected', 'false');

        const colorIRInHash = await urlHashContains(page, 'Color+Infrared+for+Visualization');
        expect(colorIRInHash).toBeTruthy();

        // Hover over a renderer card and check that the tooltip appears
        await renderer1.hover();
        const tooltip = page.getByTestId('tooltip-container');
        await expect(tooltip).toBeVisible();

        // Clean up network mocks
        await resetMockSentinel2NetworkRequest(page);
    })
})
