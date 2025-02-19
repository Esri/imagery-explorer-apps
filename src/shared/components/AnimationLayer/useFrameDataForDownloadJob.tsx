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
import { appConfig } from '@shared/config';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { loadImageAsHTMLIMageElement } from '@shared/utils/snippets/loadImage';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
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
}: Props) => {
    const mapCenter = useAppSelector(selectMapCenter);

    const [frameData, setFrameData] = useState<AnimationFrameData[]>([]);

    // const frameData: AnimationFrameData4DownloadJob[] = useMemo(() => {
    //     if (
    //         !sortedQueryParams4ScenesInAnimationMode?.length ||
    //         !mediaLayerElements?.length
    //     ) {
    //         return [];
    //     }

    //     return mediaLayerElements.map((mediaLayerElement, index) => {
    //         const queryParams = sortedQueryParams4ScenesInAnimationMode[index];

    //         return {
    //             mediaLayerElement,
    //             info: `${
    //                 queryParams.acquisitionDate
    //             }  |  x ${mapCenter[0].toFixed(3)} y ${mapCenter[1].toFixed(
    //                 3
    //             )}  |  ${appConfig.animationMetadataSources}`,
    //         } as AnimationFrameData4DownloadJob;
    //     });
    // }, [sortedQueryParams4ScenesInAnimationMode, mediaLayerElements]);

    useEffect(() => {
        (async () => {
            if (
                !sortedQueryParams4ScenesInAnimationMode?.length ||
                !mediaLayerElements?.length
            ) {
                setFrameData([]);
                return;
            }

            // load media layer elements as an array of HTML Image Elements
            const images = await Promise.all(
                mediaLayerElements.map((d) =>
                    loadImageAsHTMLIMageElement(d.image as string)
                )
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
                    )}  |  ${appConfig.animationMetadataSources}`,
                } as AnimationFrameData;
            });

            setFrameData(data);
        })();
    }, [mediaLayerElements]);

    return frameData;
};
