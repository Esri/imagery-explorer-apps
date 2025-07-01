import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { selectDayFromCalendar, urlHashContains } from '../helpers';
import { signInWithArcGISOnline } from '../../shared/signInWithArcGISOnline';

/**
 * Enum representing different save options available in the application.
 */
export enum PublishAndDownloadJobType {
    PublishScene = 'Publish Scene',
    PublishIndexMask = 'Publish Index Mask',
    PublishChangeDetection = 'Publish Change Detection',
    // DownloadIndexMask = 'Download Index Mask',
    SaveWebMappingApp = 'Save Web Mapping App',
    SaveWebMap = 'Save Web Map',
    SaveWebMapWithMultipleScenes = 'Save Web Map with Multiple Scenes',
    SaveWebMapWithMultipleScenesInSingleLayer = 'Save Web Map with Multiple Scenes in Single Layer',
}

const openSavePanelAndSignIn = async (page: Page) => {
    // Verify the Open Save Panel button is visible and clickable
    const openSavePanelButton = page.getByTestId('open-save-panel-button');
    await expect(openSavePanelButton).toBeVisible();
    await openSavePanelButton.click();

    // Verify the Save Panel is visible
    const savePanel = page.getByTestId('save-panel');
    await expect(savePanel).toBeVisible();

    // Verify the Sign-in button is visible
    const signInButton = page.getByTestId('sign-in-button');
    await expect(signInButton).toBeVisible();
    await signInButton.click();

    // Sign in to ArcGIS Online
    await signInWithArcGISOnline(page);

    // Verify the Save Panel is still visible after signing in
    await expect(savePanel).toBeVisible();
}

/**
 * Tests the "Save as ArcGIS Online Item" workflow in the application UI.
 *
 * This function performs the following steps:
 * 1. Verifies that the save option for the specified job type is visible.
 * 2. Ensures the launch button for the save job is visible, enabled, and can be clicked.
 * 3. Confirms that the save job dialog appears after clicking the launch button.
 * 4. Checks that the "OK" button in the dialog is visible and can be clicked to proceed.
 * 5. Verifies that a new job appears in the job list with a status of "esriJobSucceeded".
 * 6. Ensures the "Open Job" button is visible and its `href` attribute points to the ArcGIS Online item details page.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param saveJobType - The type of publish and download job to test.
 * @param expectedJobListIndex - The expected index of the job in the job list after saving.
 */
const testSaveAsArcGISOnlineItem = async (page: Page, {
    saveJobType,
    expectedJobListIndex = 0
}: {
    saveJobType: PublishAndDownloadJobType;
    expectedJobListIndex?: number;
}) => {

    // Verify Save Web Mapping App option is available
    const saveJobOption = page.getByTestId('save-option-' + saveJobType);
    await expect(saveJobOption).toBeVisible();

    // Verify the launch button is visible and clickable
    const saveJobLaunchButton = saveJobOption.locator('[data-element="button"]');
    await expect(saveJobLaunchButton).toBeVisible();
    await expect(saveJobLaunchButton).toBeEnabled();
    await saveJobLaunchButton.click();

    // Verify Save Job Dialog opens when Save Web Mapping App Launch Button is clicked
    const saveJobDialog = page.getByTestId('save-job-dialog');
    await expect(saveJobDialog).toBeVisible();

    // Make sure the OK button is visible and clickable
    const saveButton = saveJobDialog.getByText('OK');
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    // Verify the Job is added to the Job List
    const jobListItem = page.getByTestId('job-list-item-' + expectedJobListIndex);
    await expect(jobListItem).toBeVisible();
    await expect(jobListItem).toHaveAttribute('data-job-status', 'esriJobSucceeded');

    // verify the Open Job button is visible and has href attribute pointing to the ArcGIS Online item details page of the newly created Web Mapping Application
    const openJobButton = jobListItem.getByTestId('open-job-output-button');
    await expect(openJobButton).toBeVisible();
    await expect(openJobButton).toHaveAttribute('href', /https:\/\/(?:[\w.-]+\.)*arcgis\.com\/home\/item.html\?id=*/i);
}

/**
 * Asserts that the save options list is visible and contains the expected number of options.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param count - The expected number of save options in the list.
 * @throws Will throw an assertion error if the save options list is not visible or does not have the expected number of options.
 */
const testSaveOptionsList = async (page: Page, options:PublishAndDownloadJobType[]) => {
    const saveOptions = page.getByTestId('save-options-list');
    await expect(saveOptions).toBeVisible();
    await expect(saveOptions).toHaveAttribute('data-number-of-options', options.length.toString());

    for (const option of options) {
        const saveOption = page.getByTestId('save-option-' + option);
        await expect(saveOption).toBeVisible();
    }
}

test.describe('Sentinel-2 Explorer - Save Panel', () => {

    const APP_URL = DEV_SERVER_URL + '/#mapCenter=-117.07809%2C34.03876%2C13.516';

    test.beforeEach(async ({ page }) => {
        // Mock network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);
    });

    test.afterEach(async ({ page }) => {
        // Reset mock network requests before each test
        await resetMockSentinel2NetworkRequest(page);
    });

    test('save panel when no scene is selected', async ({ page }) => {
        await page.goto(APP_URL);

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verfiy the Save Options are visible and populated correctly
        await testSaveOptionsList(page, [
            PublishAndDownloadJobType.SaveWebMappingApp
        ]);

        // Verify the workflow for saving the current state as a Web Mapping Application
        await testSaveAsArcGISOnlineItem(page, { 
            saveJobType: PublishAndDownloadJobType.SaveWebMappingApp,
            expectedJobListIndex: 0
        });

        // // Pause to allow for manual inspection
        // await page.pause();
    });

    test('save panel with a single Sentinel-2 scene selected', async ({ page }) => {
        await page.goto(APP_URL + '&mode=find+a+scene');

        // Select a scene from the calendar
        await selectDayFromCalendar(page, '2023-08-01');

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verfiy the Save Options are visible and populated correctly
        await testSaveOptionsList(page, [
            PublishAndDownloadJobType.SaveWebMappingApp,
            PublishAndDownloadJobType.SaveWebMap,
            PublishAndDownloadJobType.PublishScene
        ]);

        // Verify the workflow for saving the selected scene as an ArcGIS Online Web Map
        await testSaveAsArcGISOnlineItem(page, { 
            saveJobType: PublishAndDownloadJobType.SaveWebMap,
            expectedJobListIndex: 0
        });

        // // Pause to allow for manual inspection
        // await page.pause();

    });

    test('save panel with multiple Sentinel-2 scenes selected', async ({ page }) => {
        // Navigate to the app with swipe mode on and two scenes selected 
        await page.goto(APP_URL + '&mode=swipe&mainScene=2023-08-01%7CNDVI+Colorized+for+Visualization%7C20498195&secondaryScene=2024-01-03%7CNDVI+Colorized+for+Visualization%7C146597');

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verfiy the Save Options are visible and populated correctly
        await testSaveOptionsList(page, [
            PublishAndDownloadJobType.SaveWebMappingApp,
            PublishAndDownloadJobType.SaveWebMapWithMultipleScenes,
            PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer,
        ]);

        // Verify the workflow for saving the web map with multiple scenes as an ArcGIS Online Web Map
        await testSaveAsArcGISOnlineItem(page, {
            saveJobType: PublishAndDownloadJobType.SaveWebMapWithMultipleScenes,
            expectedJobListIndex: 0
        });

        // Vefiy the workflow for saving the web map with multiple scenes in a single layer as an ArcGIS Online Web Map
        await testSaveAsArcGISOnlineItem(page, {
            saveJobType: PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer,
            expectedJobListIndex: 1
        });

        // Pause to allow for manual inspection
        await page.pause();

        // Verify the functionality of the Clear All button to remove all jobs from the job list
        const clearAllJobsButton = page.getByTestId('clear-all-jobs-button');
        await expect(clearAllJobsButton).toBeVisible();
        await clearAllJobsButton.click();

        // Verify the Job List is empty
        const jobListIsEmpty = page.getByTestId('no-pending-jobs');
        await expect(jobListIsEmpty).toBeVisible();

        // Pause to allow for manual inspection
        await page.pause();

    })
})
