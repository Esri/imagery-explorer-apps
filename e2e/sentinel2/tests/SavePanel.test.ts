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

test.describe('Sentinel-2 Explorer - Save Panel', () => {

    // Increase the timeout for the tests in this suite
    // the publish imagery service job can take a while as it's async operation
    // that involves multiple network requests
    // therefore, we increase the timeout for this test
    test.setTimeout(2 * 60 * 1000); // 2 minutes

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
        });

        // // Pause to allow for manual inspection
        // await page.pause();
    });

    test('save panel with a single Sentinel-2 scene selected', async ({ 
        page,
    }) => {
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
        });

        // Verify the workflow for publishing the selected scene as an ArcGIS Online Hosted Imagery Service
        await testPublishAsHostedImageryService(page, {
            saveJobType: PublishAndDownloadJobType.PublishScene,
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
        });

        // Vefiy the workflow for saving the web map with multiple scenes in a single layer as an ArcGIS Online Web Map
        await testSaveAsArcGISOnlineItem(page, {
            saveJobType: PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer,
        });

        // // Pause to allow for manual inspection
        // await page.pause();

        // Verify the functionality of the Clear All button to remove all jobs from the job list
        const clearAllJobsButton = page.getByTestId('clear-all-jobs-button');
        await expect(clearAllJobsButton).toBeVisible();
        await clearAllJobsButton.click();

        // Verify the Job List is empty
        const jobListIsEmpty = page.getByTestId('no-pending-jobs');
        await expect(jobListIsEmpty).toBeVisible();

        // // Pause to allow for manual inspection
        // await page.pause();

    })

    test('save panel in index mask tool', async ({ page }) => {
        // Navigate to the app with index mask tool and a scene selected
        await page.goto(APP_URL + '&mode=analysis&mainScene=2023-08-01%7CAgriculture+for+Visualization%7C20498195&tool=mask');
        
        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verfiy the Save Options are visible and populated correctly
        await testSaveOptionsList(page, [
            PublishAndDownloadJobType.SaveWebMappingApp,
            PublishAndDownloadJobType.SaveWebMap,
            PublishAndDownloadJobType.PublishScene,
            PublishAndDownloadJobType.PublishIndexMask
        ]);

        // Verify the workflow for publishing the index mask output as an ArcGIS Online Hosted Imagery Service
        await testPublishAsHostedImageryService(page, {
            saveJobType: PublishAndDownloadJobType.PublishIndexMask,
        });
    });

    test('save panel in change detection tool', async ({ page }) => {
        // Navigate to the app with change detection tool and two scenes selected
        await page.goto(APP_URL + '&mode=analysis&mainScene=2023-08-01%7CShort-wave+Infrared+for+Visualization%7C20498195&secondaryScene=2024-01-03%7CNatural+Color+for+Visualization%7C146597&tool=change&change=vegetation%7Ctrue%7C-2%2C2');
        
        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verfiy the Save Options are visible and populated correctly
        await testSaveOptionsList(page, [
            PublishAndDownloadJobType.SaveWebMappingApp,
            PublishAndDownloadJobType.SaveWebMapWithMultipleScenes,
            PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer,
            PublishAndDownloadJobType.PublishChangeDetection
        ]);

        // Verify the workflow for publishing the change detection output as an ArcGIS Online Hosted Imagery Service
        await testPublishAsHostedImageryService(page, {
            saveJobType: PublishAndDownloadJobType.PublishChangeDetection,
        });
    });

    test('reject credits for a job in the job list', async ({ page }) => {
        // Navigate to the app with a scene selected
        await page.goto(APP_URL + '&mode=find+a+scene&mainScene=2023-08-01%7CNDVI+Colorized+for+Visualization%7C20498195');

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verify the workflow for rejecting credits for a job in the job list
        await testPublishAsHostedImageryService(page, {
            saveJobType: PublishAndDownloadJobType.PublishScene,
            shouldRejectCredits: true, // set to true to test rejecting credits
        });
    });

    test('Pulish scene with an error', async ({ page }) => {
        // Navigate to the app with a scene selected
        await page.goto(APP_URL + '&mode=find+a+scene&mainScene=2023-08-01%7CNDVI+Colorized+for+Visualization%7C20498195');

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Verify the workflow for rejecting credits for a job in the job list
        await testPublishAsHostedImageryService(page, {
            saveJobType: PublishAndDownloadJobType.PublishScene,
            shouldThrowErrorForGenerateRasterJob: true, // set to true to test error handling
        });
    });
})


/**
 * Opens the Save Panel in the application, initiates the sign-in process,
 * and verifies the panel remains visible after signing in.
 *
 * This function performs the following steps:
 * 1. Ensures the "Open Save Panel" button is visible and clicks it.
 * 2. Verifies the Save Panel is displayed.
 * 3. Ensures the "Sign-in" button is visible and clicks it.
 * 4. Executes the ArcGIS Online sign-in process.
 * 5. Confirms the Save Panel remains visible after signing in.
 *
 * @param page - The Playwright {@link Page} object representing the browser page.
 * @returns A promise that resolves when all actions and verifications are complete.
 */
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
 * Triggers the save job workflow for a specified job type in the application.
 *
 * This function performs the following steps:
 * 1. Verifies that the save option for the specified job type is visible.
 * 2. Ensures the launch button for the save job is visible, enabled, and can be clicked.
 * 3. Confirms that the save job dialog appears after clicking the launch button.
 * 4. Checks that the "OK" button in the dialog is visible and can be clicked to proceed.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param saveJobType - The type of publish and download job to trigger.
 */
const triggerSaveJob = async (page: Page, saveJobType: PublishAndDownloadJobType) => {
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
}: {
    saveJobType: PublishAndDownloadJobType;
}) => {

    // Trigger the save job workflow
    await triggerSaveJob(page, saveJobType);

    // Verify the Job is added to the Job List
    const jobListItemIndex = 0; // the newly added job should be at index 0
    const jobListItem = page.getByTestId('job-list-item-' + jobListItemIndex);
    await expect(jobListItem).toBeVisible();
    await expect(jobListItem).toHaveAttribute('data-job-status', 'esriJobSucceeded');

    // verify the Open Job button is visible and has href attribute pointing to the ArcGIS Online item details page of the newly created Web Mapping Application
    const openJobButton = jobListItem.getByTestId('open-job-output-button');
    await expect(openJobButton).toBeVisible();
    await expect(openJobButton).toHaveAttribute('href', /https:\/\/(?:[\w.-]+\.)*arcgis\.com\/home\/item.html\?id=*/i);
}

/**
 * Tests the workflow for publishing a hosted imagery service as a save job in the application.
 *
 * This function performs the following steps:
 * 1. Triggers the save job workflow for the specified job type.
 * 2. Verifies that the new job appears at the top of the job list.
 * 3. Waits for the network request estimating the job cost to complete.
 * 4. Checks that the estimated credit cost is displayed and is a valid number.
 * 5. Ensures the "Accept Credits" button is visible and clicks it.
 * 6. Waits for the network request checking the generate raster job status to complete.
 * 7. Verifies that the job status is "esriJobSucceeded".
 * 8. Checks that the "Open Job" button is visible and its href points to the ArcGIS Online item details page.
 *
 * @param page - The Playwright Page object representing the browser page.
 * @param options - Options for the test.
 * @param options.saveJobType - The type of publish and download job to trigger.
 */
const testPublishAsHostedImageryService = async (page: Page, {
    saveJobType,
    shouldRejectCredits = false, // default to false, can be set to true for testing rejecting credits
    shouldThrowErrorForGenerateRasterJob = false, // default to false, can be set to true for testing error handling
}: {
    /**
     * The type of publish and download job to trigger.
     */
    saveJobType: PublishAndDownloadJobType;
    /**
     * Whether to test the rejection of credits for the job.
     * If true, the test will simulate rejecting credits after the job is created.
     */
    shouldRejectCredits?: boolean; 
    /**
     * Whether to test error handling by simulating an error for the GenerateRaster job.
     * If true, the test will simulate an error and verify that the job is not created.
     */
    shouldThrowErrorForGenerateRasterJob?: boolean; // default to false, can be set to true for testing error handling
}) => {
    // Trigger the save job workflow
    await triggerSaveJob(page, saveJobType);

    // Verify the new job appears at the top of the job list
    const jobListItemIndex = 0; // the most recent job should be at index 0
    const jobListItem = page.getByTestId('job-list-item-' + jobListItemIndex);
    await expect(jobListItem).toBeVisible();

    // Wait for the network request estimating the job cost to complete
    await page.waitForResponse(response =>
        response.url().includes('arcgis/rest/services/RasterAnalysisTools/GPServer/EstimateRasterAnalysisCost/jobs')
        && response.status() === 200
    );

    // Check that the estimated credit cost is displayed and is a valid number
    const jobCost = jobListItem.getByTestId('job-cost-info');
    await expect(jobCost).toBeVisible({ timeout: 60000 });
    await expect(jobCost).toHaveAttribute('data-actual-cost', /\d+(\.\d+)?/); // should be a number

    // Wait a bit to give some time to visually verify the estimated cost
    await page.waitForTimeout(2000); 

    // If we are testing the rejection of credits, click the "Reject Credits" button
    // Otherwise, proceed to accept the credits
    if(shouldRejectCredits){

        // If we are testing the rejection of credits, click the "Reject Credits" button
        const rejectCreditsButton = jobListItem.getByTestId('reject-credits-button');
        await expect(rejectCreditsButton).toBeVisible();
        await rejectCreditsButton.click();

        // Verify that the job is removed from the job list
        await expect(jobListItem).not.toBeVisible();

        return;
    } 

    // Ensure the "Accept Credits" button is visible and can be clicked
    const acceptCreditsButton = jobListItem.getByTestId('accept-credits-button');
    await expect(acceptCreditsButton).toBeVisible();
    await acceptCreditsButton.click();

    // If we are testing error handling, simulate an error response for the GenerateRaster job
    // This will allow us to verify that the job status is set to "esriJobFailed"
    if(shouldThrowErrorForGenerateRasterJob) {

        // unroute the existing GenerateRaster job status check to simulate an error
        await page.unroute('*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs/*?**');
        
        // Route the GenerateRaster job status check to simulate an error response
        await page.route('*/**/arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs/*?**', async (route) => {
            // Simulate an error response for the GenerateRaster job
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    "jobId": "mocked-generate-raster-job-id",
                    "jobStatus":"esriJobFailed",
                })
            });
        })

        // Wait for the network request checking the generate raster job status to complete
        await page.waitForResponse(response =>
            response.url().includes('arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs')
            && response.status() === 200
        );
    
        // Verify that the job status is "esriJobFailed"
        await expect(jobListItem).toHaveAttribute(
            'data-job-status', 
            'esriJobFailed'
        );

        // // pause to allow for manual inspection of the error
        // await page.pause();

        return;
    }

    // Wait for the network request checking the generate raster job status to complete
    await page.waitForResponse(response =>
        response.url().includes('arcgis/rest/services/RasterAnalysisTools/GPServer/GenerateRaster/jobs')
        && response.status() === 200
    );

    // Verify that the job status is "esriJobSucceeded"
    await expect(jobListItem).toHaveAttribute(
        'data-job-status', 
        'esriJobSucceeded'
    );

    // Check that the "Open Job" button is visible and its href points to the ArcGIS Online item details page
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
