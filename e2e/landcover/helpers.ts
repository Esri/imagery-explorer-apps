import { Page, expect } from "@playwright/test";

export const clickOnMap = async (page: Page, x: number, y: number) => {
    const mapView = page.locator('.esri-view-root');
    await expect(mapView).toBeVisible();

    // Wait for the exportImage network request to complete
    const exportImagePromise = page.waitForResponse(request =>
        request.url().includes('Sentinel2_10m_LandCover/ImageServer/exportImage') && request.status() === 200, {
            timeout: 20000 // Wait up to 20 seconds for the response
        }
    );
    await exportImagePromise;

    // Click on the map at the specified coordinates
    await mapView.click({
        position: {
            x: x,
            y: y
        }
    });
}