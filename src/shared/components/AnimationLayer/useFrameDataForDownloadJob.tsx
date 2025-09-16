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

import ImageElement from '@arcgis/core/layers/support/ImageElement';
// import { appConfig } from '@shared/config';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    selectMapCenter,
    selectShowBasemap,
    selectShowMapLabel,
    selectShowTerrain,
} from '@shared/store/Map/selectors';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    combineAnimationFrameImageWithMapScreenshots,
    getScreenshotOfBasemapLayers,
} from './helpers';
import MapView from '@arcgis/core/views/MapView';
import { WEB_MAP_ID } from '@shared/constants/map';
// import { AnimationFrameData4DownloadJob } from '../AnimationDownloadPanel/DownloadPanel';

/**
 * Represents the properties required by the custom hook `useFrameDataForDownloadJob`.
 */
type Props = {
    /**
     * An array of QueryParams4ImageryScene objects representing sorted query parameters
     * for scenes in animation mode.
     */
    sortedQueryParams4ScenesInAnimationMode: QueryParams4ImageryScene[];
    /**
     * An array of ImageElement objects representing media layer elements.
     */
    mediaLayerElements: ImageElement[];
    /**
     * The animation metadata sources.
     */
    animationMetadataSources: string;
    /**
     * The MapView instance.
     */
    mapView: MapView;
};

/**
 * This custom hook returns an array of `AnimationFrameData` objects that
 * can be used by the Animation Download task.
 * @param {Props} - The properties required by the hook.
 * @returns An array of `AnimationFrameData4DownloadJob` objects.
 */
export const useFrameDataForDownloadJob = ({
    sortedQueryParams4ScenesInAnimationMode,
    mediaLayerElements,
    animationMetadataSources,
    mapView,
}: Props) => {
    const mapCenter = useAppSelector(selectMapCenter);

    const [frameData, setFrameData] = useState<AnimationFrameData[]>([]);

    // determine whether to include basemap layers in the screenshot
    const includeBasemapInScreenshot = useAppSelector(selectShowBasemap);

    // determine whether to include terrain layer in the screenshot
    const includeTerrainInScreenshot = useAppSelector(selectShowTerrain);

    // determine whether to include map label layers in the screenshot
    const includeMapLabelsInScreenshot = useAppSelector(selectShowMapLabel);

    useEffect(() => {
        (async () => {
            if (
                !sortedQueryParams4ScenesInAnimationMode?.length ||
                !mediaLayerElements?.length
            ) {
                setFrameData([]);
                return;
            }

            const {
                basemapScreenshot,
                referenceLayersScreenshot,
                hillshadeScreenshot,
            } = await getScreenshotOfBasemapLayers({
                mapView: mapView,
                webmapId: WEB_MAP_ID,
                includeBasemapInScreenshot,
                includeTerrainInScreenshot,
                includeMapLabelsInScreenshot,
            });

            // load media layer elements as an array of HTML Image Elements
            const images = await Promise.all(
                mediaLayerElements.map((d) => {
                    return combineAnimationFrameImageWithMapScreenshots(
                        {
                            animationFrameImageUrl: d.image as string,
                            basemapScreenshotData:
                                basemapScreenshot?.data || null,
                            mapLabelScreenshotData:
                                referenceLayersScreenshot?.data || null,
                            hillshadeScreenshotData:
                                hillshadeScreenshot?.data || null,
                            shouldBlendAnimationFrameWithBasemap: false,
                        }
                        // d.image as string,
                        // basemapScreenshot?.data || null,
                        // referenceLayersScreenshot?.data || null,
                        // hillshadeScreenshot?.data || null
                    ); // if showing Landcover layer, the image need to be blended with the screenshot of basemap layers
                })
            );

            const data: AnimationFrameData[] = images.map((image, index) => {
                const queryParams =
                    sortedQueryParams4ScenesInAnimationMode[index];

                return {
                    image,
                    imageInfo: `${
                        queryParams.acquisitionDate
                    }  |  x ${mapCenter[0].toFixed(3)} y ${mapCenter[1].toFixed(
                        3
                    )}  |  ${animationMetadataSources}`,
                } as AnimationFrameData;
            });

            setFrameData(data);
        })();
    }, [mediaLayerElements]);

    return frameData;
};
