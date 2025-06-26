import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { formatInUTCTimeZone, formattedDateString2Unixtimestamp, selectDayFromCalendar, urlHashContains } from '../helpers';
import { add } from 'date-fns';

test.describe('Sentinel-2 Explorer - Animate Mode', () => {

    const ANIMATE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516`;

    test('should be able to add/romove animation scenes', async ({ page }) => {

        // Set up network mocks and sign in
        await mockSentinel2NetworkRequests(page);

        await page.goto(ANIMATE_MODE_URL);

        // Verify the Animate button is visible and clickable
        const animateButton = page.getByTestId('mode-selector-animate');
        await expect(animateButton).toBeVisible();
        await animateButton.click();

        const day1 = '2023-08-01';
        const day2 = '2024-01-03';  
        const day3 = '2024-12-18';

        // Add animation frames for the specified dates in reverse order.
        // Later, verify that the application displays them in the intended chronological order.
        await addNewAnimationFrame(page, day3);
        await addNewAnimationFrame(page, day2);
        await addNewAnimationFrame(page, day1);

        // Verify that animation frames are added correctly
        await testAnimationFrameCard(page, 0, day1, 'NDVI');
        await testAnimationFrameCard(page, 1, day2, 'NDMI');
        await testAnimationFrameCard(page, 2, day3, 'Urban');

        // await page.pause();

        // Verify animation frames can be removed.
        // Important: remove them in reverse order.
        // If you remove the first one first, the indices of the remaining frames will shift,
        // which causes the test to fail.
        await removeAnimationFrame(page, 2);
        await removeAnimationFrame(page, 1);
        await removeAnimationFrame(page, 0);

        // Verify that the animation frames are removed
        const animationFramesList = page.getByTestId('animation-frames-list');
        await expect(animationFramesList).toBeEmpty();

        // await page.pause();

        // Clean up network mocks
        await resetMockSentinel2NetworkRequest(page);
    })

})

/**
 * Adds a new animation frame by interacting with the UI.
 *
 * This function performs the following steps:
 * 1. Verifies that the "Add Animation Frame" button is visible and clickable.
 * 2. Clicks the button to initiate adding a new animation frame.
 * 3. Selects the specified acquisition date from the calendar for the new frame.
 *
 * @param page - The Playwright {@link Page} object representing the browser page.
 * @param acquisitionDate - The date string to select from the calendar for the new animation frame.
 * @returns A promise that resolves when the animation frame has been added and the date selected.
 */
const addNewAnimationFrame = async (page: Page, acquisitionDate:string) => {
    // Verify the Animate button is visible and clickable
    const addAnimationFrameButton = page.getByTestId('add-animation-frame-button');
    await expect(addAnimationFrameButton).toBeVisible();
    await addAnimationFrameButton.click();

    // select the acquisition date from the calendar 
    // which will be used for the new animation frame
    await selectDayFromCalendar(page, acquisitionDate);
}

/**
 * Verifies that an animation frame card displays the correct date and renderer.
 *
 * This function performs the following checks:
 * 1. The animation frame card at the given index is visible and can be selected.
 * 2. The card displays the expected acquisition date in UTC format.
 * 3. The card displays the correct renderer name and allows selection.
 *
 * @param page - The Playwright {@link Page} object representing the browser page.
 * @param index - The index of the animation frame card to verify.
 * @param date - The expected acquisition date string for the card, in 'YYYY-MM-DD' format.
 * @param rendererName - The expected renderer name for the card.
 */
const testAnimationFrameCard = async (page: Page, index: number, date: string, rendererName: string) => {
    // Verify that the animation frame card is visible
    const card = page.getByTestId(`animation-frame-card-${index}`);
    await expect(card).toBeVisible();
    
    // Verify the card is clickable and can be selected
    await card.click();
    await expect(card).toHaveAttribute('data-selected', 'true');

    // Check that the card contains the correct acquisition date
    const formattedDateLabel = formatInUTCTimeZone(
        formattedDateString2Unixtimestamp(date)
    );
    expect(card).toContainText(formattedDateLabel);

    // Check that the card contains the correct renderer name
    const rendererGridCard = page.getByTestId(`grid-card-${rendererName}`);
    await expect(rendererGridCard).toBeVisible();
    await rendererGridCard.click();
    expect(card).toContainText(rendererName);
}

/**
 * Removes an animation frame card from the page by its index.
 *
 * This function performs the following steps:
 * 1. Locates the animation frame card using its test ID and verifies it is visible.
 * 2. Clicks the card to focus or activate it.
 * 3. Hovers over the card to reveal the remove button.
 * 4. Locates and verifies the visibility of the remove button, then clicks it to remove the card.
 * 5. Confirms that the animation frame card is no longer visible on the page.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param index - The index of the animation frame card to remove.
 */
const removeAnimationFrame = async (page: Page, index: number) => {
    // Verify the remove button for the animation frame card is visible and clickable
    const card = page.getByTestId(`animation-frame-card-${index}`);
    await expect(card).toBeVisible();
    await card.click();
    
    // Verify the animation frame card is no longer visible
    await card.hover();
    const removeButton = card.getByTestId(`remove-animation-frame-button-${index}`);
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    // Verify the card is no longer visible
    await expect(card).not.toBeVisible();
}