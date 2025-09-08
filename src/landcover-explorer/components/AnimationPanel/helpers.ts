/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { LandCoverLayerBlendMode } from '../LandcoverLayer/useLandCoverLayer';

/**
 * Combines the exported image of the Landcover Layer with the screenshot of the Basemap layers
 * and returns an HTML Image Element representing the combined image.
 * @param mediaLayerElementURL URL of the Image Element used in the media layer.
 * @param screenshotImageData Image Data of the map view screenshot.
 * @returns Promise<HTMLImageElement> A promise that resolves to the combined HTML Image Element.
 */
export const combineLandcoverImageWithMapScreenshot = async (
    mediaLayerElementURL: string,
    screenshotImageData: ImageData
): Promise<HTMLImageElement> => {
    // Load the media layer image as an HTML Image Element
    const img = await loadImageAsHTMLIMageElement(mediaLayerElementURL);

    // Create a new canvas to combine the imageData and the HTMLImageElement
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    // Set the dimensions of the new canvas to accommodate both the image and the imageData
    combinedCanvas.width = Math.max(combinedCanvas.width, img.width);
    combinedCanvas.height = Math.max(combinedCanvas.height, img.height);

    // Draw the imageData onto the new canvas
    combinedCtx.putImageData(screenshotImageData, 0, 0);

    combinedCtx.globalCompositeOperation = LandCoverLayerBlendMode;
    // Draw the HTMLImageElement onto the new canvas
    combinedCtx.drawImage(img, 0, 0);

    return loadImageAsHTMLIMageElement(combinedCanvas.toDataURL());
};

/**
 * Combines a media layer image with basemap and map label screenshots into a single image.
 *
 * This function loads the media layer image from a given URL, draws the basemap screenshot data onto a canvas,
 * blends the media layer image using a specified blend mode, and overlays the map label screenshot data.
 * The result is returned as an HTMLImageElement.
 *
 * @param mediaLayerElementURL - The URL of the media layer image to be loaded and combined.
 * @param basemapScreenshotData - The ImageData representing the basemap screenshot to be drawn first.
 * @param mapLabelScreenshotData - The ImageData representing the map label screenshot to be drawn last.
 * @returns A promise that resolves to an HTMLImageElement containing the combined image.
 */
export const combineLandcoverImageWithMapScreenshots = async (
    mediaLayerElementURL: string,
    basemapScreenshotData: ImageData,
    mapLabelScreenshotData: ImageData
): Promise<HTMLImageElement> => {
    // Load the media layer image as an HTML Image Element
    const img = await loadImageAsHTMLIMageElement(mediaLayerElementURL);

    // Create a new canvas to combine the imageData and the HTMLImageElement
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    // Set the dimensions of the new canvas to accommodate both the image and the imageData
    combinedCanvas.width = Math.max(combinedCanvas.width, img.width);
    combinedCanvas.height = Math.max(combinedCanvas.height, img.height);

    // convert ImageData to Bitmap and draw it on the combined canvas
    const basemapScreenshotBitmap = await createImageBitmap(
        basemapScreenshotData
    );

    // Draw the imageData onto the new canvas
    combinedCtx.drawImage(basemapScreenshotBitmap, 0, 0);

    // Set the globalCompositeOperation to the desired blend mode
    combinedCtx.globalCompositeOperation = LandCoverLayerBlendMode;

    // make it brighter
    combinedCtx.filter = 'brightness(1.1)';

    // Draw the HTMLImageElement onto the new canvas
    combinedCtx.drawImage(img, 0, 0);

    // reset the globalCompositeOperation to default value 'source-over' before drawing map label screenshot
    combinedCtx.globalCompositeOperation = 'source-over';

    // convert ImageData to Bitmap and draw it on top of the combined canvas
    // this is to ensure the map labels are always on top of the landcover layer
    const mapLabelScreenshotBitmap = await createImageBitmap(
        mapLabelScreenshotData
    );

    combinedCtx.drawImage(mapLabelScreenshotBitmap, 0, 0);

    return loadImageAsHTMLIMageElement(combinedCanvas.toDataURL());
};
