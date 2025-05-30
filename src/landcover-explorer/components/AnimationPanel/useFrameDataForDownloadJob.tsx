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
// import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { selectMapCenter } from '@shared/store/Map/selectors';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
// import { AnimationFrameData4DownloadJob } from '@shared/components/AnimationDownloadPanel/DownloadPanel';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';
// import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import MapView from '@arcgis/core/views/MapView';
import { combineLandcoverImageWithMapScreenshot } from './helpers';
import { selectShouldShowSatelliteImageryLayer } from '@shared/store/LandcoverExplorer/selectors';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';

/**
 * Represents the properties required by the custom hook `useFrameDataForDownloadJob`.
 */
type Props = {
    /**
     * An array of ImageElement objects representing media layer elements.
     */
    mediaLayerElements: ImageElement[];
    /**
     * The animation metadata sources.
     */
    animationMetadataSources: string;
    mapView?: MapView;
};

/**
 * This custom hook returns an array of `AnimationFrameData4DownloadJob` objects that
 * can be used by the Animation Download task.
 * @param {Props} - The properties required by the hook.
 * @returns An array of `AnimationFrameData4DownloadJob` objects.
 */
export const useFrameDataForDownloadJob = ({
    mediaLayerElements,
    mapView,
    animationMetadataSources,
}: Props) => {
    const mapCenter = useAppSelector(selectMapCenter);

    const years = getAvailableYears();

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const [frameData, setFrameData] = useState<AnimationFrameData[]>([]);

    useEffect(() => {
        (async () => {
            if (!mediaLayerElements?.length) {
                setFrameData([]);
                return;
            }

            // take a screenshot for the basemap layers if it is showing the landcover layer,
            // as the landcover layer will need to be combined/blended with the screenshot of basemap layers
            const screenshot = !shouldShowSentinel2Layer
                ? await mapView.takeScreenshot()
                : null;
            // console.log(screenshot)

            // load media layer elements as an array of HTML Image Elements
            const images = await Promise.all(
                mediaLayerElements.map((d) => {
                    return shouldShowSentinel2Layer
                        ? loadImageAsHTMLIMageElement(d.image as string)
                        : combineLandcoverImageWithMapScreenshot(
                              d.image as string,
                              screenshot.data
                          ); // if showing Landcover layer, the image need to be blended with the screenshot of basemap layers
                })
            );

            const data: AnimationFrameData[] = images.map((image, index) => {
                return {
                    image,
                    imageInfo: `${years[index]}  |  x ${mapCenter[0].toFixed(
                        3
                    )} y ${mapCenter[1].toFixed(
                        3
                    )}  |  ${animationMetadataSources}`,
                } as AnimationFrameData;
            });

            setFrameData(data);
        })();
    }, [mediaLayerElements]);

    return frameData;
};
