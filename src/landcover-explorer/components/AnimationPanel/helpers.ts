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
import { convertCanvas2HtmlImageElement } from '@shared/utils/snippets/convertCanvas2HtmlImageElement';
import Map from '@arcgis/core/Map';
import WebMap from '@arcgis/core/WebMap';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { whenOnce, once, when } from '@arcgis/core/core/reactiveUtils';
import { delay } from '@shared/utils/snippets/delay';
import {
    getBasemapLayers,
    getMapLabelLayers,
    getTerrainLayer,
} from '@shared/components/MapView/ReferenceLayers';
import MapView from '@arcgis/core/views/MapView';

type GetScreenshotOfBasemapLayersParams = {
    mapView: MapView;
    webmapId: string;
    /**
     * Whether to include basemap layers in the screenshot.
     */
    includeBasemapInScreenshot: boolean;
    /**
     * Whether to include terrain layer in the screenshot.
     */
    includeTerrainInScreenshot: boolean;
    /**
     * Whether to include map label layers in the screenshot.
     */
    includeMapLabelsInScreenshot: boolean;
};

type GetScreenshotOfBasemapLayersOutput = {
    basemapScreenshot: __esri.Screenshot | null;
    referenceLayersScreenshot: __esri.Screenshot | null;
};

// /**
//  * Combines the exported image of the Landcover Layer with the screenshot of the Basemap layers
//  * and returns an HTML Image Element representing the combined image.
//  * @param mediaLayerElementURL URL of the Image Element used in the media layer.
//  * @param screenshotImageData Image Data of the map view screenshot.
//  * @returns Promise<HTMLImageElement> A promise that resolves to the combined HTML Image Element.
//  */
// export const combineLandcoverImageWithMapScreenshot = async (
//     mediaLayerElementURL: string,
//     screenshotImageData: ImageData
// ): Promise<HTMLImageElement> => {
//     // Load the media layer image as an HTML Image Element
//     const img = await loadImageAsHTMLIMageElement(mediaLayerElementURL);

//     // Create a new canvas to combine the imageData and the HTMLImageElement
//     const combinedCanvas = document.createElement('canvas');
//     const combinedCtx = combinedCanvas.getContext('2d');

//     // Set the dimensions of the new canvas to accommodate both the image and the imageData
//     combinedCanvas.width = Math.max(combinedCanvas.width, img.width);
//     combinedCanvas.height = Math.max(combinedCanvas.height, img.height);

//     // Draw the imageData onto the new canvas
//     combinedCtx.putImageData(screenshotImageData, 0, 0);

//     combinedCtx.globalCompositeOperation = LandCoverLayerBlendMode;
//     // Draw the HTMLImageElement onto the new canvas
//     combinedCtx.drawImage(img, 0, 0);

//     return loadImageAsHTMLIMageElement(combinedCanvas.toDataURL());
// };

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
    basemapScreenshotData: ImageData | null,
    mapLabelScreenshotData: ImageData | null
): Promise<HTMLImageElement> => {
    // Load the media layer image as an HTML Image Element
    const mediaLayerImage =
        await loadImageAsHTMLIMageElement(mediaLayerElementURL);

    // Create a new canvas to combine the imageData and the HTMLImageElement
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');

    // Set the dimensions of the new canvas to accommodate both the image and the imageData
    combinedCanvas.width = Math.max(
        combinedCanvas.width,
        mediaLayerImage.width
    );
    combinedCanvas.height = Math.max(
        combinedCanvas.height,
        mediaLayerImage.height
    );

    // make it brighter
    combinedCtx.filter = 'brightness(1.1)';

    // Draw the basemap screenshot data onto the canvas first
    if (basemapScreenshotData) {
        // convert ImageData to Bitmap and draw it on the combined canvas
        const basemapScreenshotBitmap = await createImageBitmap(
            basemapScreenshotData
        );

        combinedCtx.drawImage(basemapScreenshotBitmap, 0, 0);
    }

    // Draw the media layer image onto the canvas on top of the basemap screenshot
    if (mediaLayerImage) {
        // Set the globalCompositeOperation to the desired blend mode
        combinedCtx.globalCompositeOperation = LandCoverLayerBlendMode;

        combinedCtx.drawImage(mediaLayerImage, 0, 0);
    }

    // Draw the map label screenshot data onto the new canvas last
    if (mapLabelScreenshotData) {
        // reset the globalCompositeOperation to default value 'source-over' before drawing map label screenshot
        combinedCtx.globalCompositeOperation = 'source-over';

        const mapLabelScreenshotBitmap = await createImageBitmap(
            mapLabelScreenshotData
        );

        combinedCtx.drawImage(mapLabelScreenshotBitmap, 0, 0);
    }

    // Convert the combined canvas to an HTMLImageElement
    const outputImage = await convertCanvas2HtmlImageElement(combinedCanvas);

    return outputImage;
};

export const getScreenshotOfBasemapLayers = async ({
    mapView,
    webmapId,
    includeBasemapInScreenshot,
    includeTerrainInScreenshot,
    includeMapLabelsInScreenshot,
}: GetScreenshotOfBasemapLayersParams): Promise<GetScreenshotOfBasemapLayersOutput> => {
    if (!mapView) {
        return {
            basemapScreenshot: null,
            referenceLayersScreenshot: null,
        };
    }

    let basemapScreenshot: __esri.Screenshot | null = null;
    let referenceLayersScreenshot: __esri.Screenshot | null = null;

    const containerDivId = 'offscreen-map-container';

    const container4OffscreenMap = document.createElement('div');

    // create a container div for the offscreen map view with the same size as the original map view
    // const container4OffscreenMap = document.createElement('div');
    container4OffscreenMap.id = containerDivId;
    container4OffscreenMap.style.width = mapView.container.clientWidth + 'px';
    container4OffscreenMap.style.height = mapView.container.clientHeight + 'px';
    container4OffscreenMap.style.position = 'absolute';
    container4OffscreenMap.style.top = '-9999px'; // position it offscreen
    container4OffscreenMap.style.left = '-9999px'; // position it offscreen

    // container4OffscreenMap.style.zIndex = '100'; // for debugging
    // container4OffscreenMap.style.border = '2px solid red'; // for debugging

    document.body.appendChild(container4OffscreenMap);

    const offscreenMapView = new MapView({
        map: new WebMap({
            portalItem: {
                id: webmapId,
            },
        }),
        container: container4OffscreenMap,
        center: mapView.center,
        zoom: mapView.zoom,
        constraints: mapView.constraints,
        popupEnabled: false,
        // scale: mapView.scale,
        // extent: mapView.extent,
        ui: {
            components: [],
        },
    });

    // wait for the offscreen map view to be ready
    await offscreenMapView.when();

    // get basemap layers from the offscreen map view
    const basemapLayers = getBasemapLayers(offscreenMapView);

    const mapLabelLayer = getMapLabelLayers(offscreenMapView);

    const terrainLayer = getTerrainLayer(offscreenMapView);

    // for(const layer of mapLabelLayer){
    //     layer.visible = false;
    // }

    // await once(() => offscreenMapView.updating === false);

    // trun off all map label layers
    for (const layer of mapLabelLayer) {
        layer.visible = false;
    }

    // turn off basemap layers if the user choose not to include basemap in the screenshot
    if (includeBasemapInScreenshot === false) {
        for (const layer of basemapLayers) {
            layer.visible = false;
        }
    }

    // turn on terrain layer if the user choose to include terrain in the screenshot
    if (includeTerrainInScreenshot === false) {
        // turn off terrain layer
        if (terrainLayer) {
            terrainLayer.visible = false;
        }
    }

    // take a screenshot of the offscreen map view without map label layers
    // only if the user choose to include basemap or terrain in the screenshot
    if (includeBasemapInScreenshot || includeTerrainInScreenshot) {
        await once(() => offscreenMapView.updating === false);

        await delay(100); // wait a bit more to ensure the map is fully rendered

        // take a screenshot of the offscreen map view without map label layers
        basemapScreenshot = await offscreenMapView.takeScreenshot({
            format: 'png',
            // quality: 80
            // quality: .8
        });
        console.log(
            'screenshot captured from offscreen map',
            basemapScreenshot
        );
    }

    // take a screenshot of the offscreen map view with only map label layers visible
    if (includeMapLabelsInScreenshot) {
        // turn on map label layers and turn off basemap layers and terrain layer
        for (const layer of mapLabelLayer) {
            layer.visible = true;
        }

        for (const layer of basemapLayers) {
            layer.visible = false;
        }

        if (terrainLayer) {
            terrainLayer.visible = false;
        }

        await once(() => offscreenMapView.updating === false);

        await delay(100); // wait a bit more to ensure the map is fully rendered

        // take a screenshot of the offscreen map view with only reference layers visible
        referenceLayersScreenshot = await offscreenMapView.takeScreenshot({
            format: 'png',
            ignoreBackground: true,
            // quality: 80
            // quality: .8
        });

        console.log(
            'screenshot with reference layers captured from offscreen map',
            referenceLayersScreenshot
        );
    }

    // clean up the offscreen map view and its container
    offscreenMapView.destroy();

    document.body.removeChild(container4OffscreenMap);

    return {
        basemapScreenshot,
        referenceLayersScreenshot,
    };
};
