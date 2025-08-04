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

import React, { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import ImageElement from '@arcgis/core/layers/support/ImageElement';
import ExtentAndRotationGeoreference from '@arcgis/core/layers/support/ExtentAndRotationGeoreference';
import { AnimationStatus } from '@shared/store/UI/reducer';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
// import { exportImage as exportLandsatImage } from '@shared/services/landsat-level-2/exportImage';
import { getAnimationWindowInfoFromHashParams } from '@shared/utils/url-hash-params';
import { getNormalizedExtent } from '@shared/utils/snippets/getNormalizedExtent';
import { exportImage } from '@shared/services/helpers/exportImage';

type Props = {
    /**
     * The URL of the Imagery Service that will be used to provide image for the media layer elements
     */
    imageryServiceUrl: string;
    mapView?: MapView;
    animationStatus: AnimationStatus;
    queryParams4ImageryScenes: QueryParams4ImageryScene[];
};

const useMediaLayerImageElement = ({
    imageryServiceUrl,
    mapView,
    animationStatus,
    queryParams4ImageryScenes,
}: Props) => {
    const [imageElements, setImageElements] = useState<ImageElement[]>(null);

    const abortControllerRef = useRef<AbortController>(null);

    // const animationStatus = useAppSelector(selectAnimationStatus);

    const loadFrameData = async () => {
        if (!mapView) {
            return;
        }

        // call abort so all pending requests can be cancelled
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // use a new abort controller so the pending requests can be cancelled
        // if user quits animation mode before the responses are returned
        abortControllerRef.current = new AbortController();

        try {
            // // Attempt to retrieve animation window information from the URL hash parameters. This occurs when
            // // a user opens the application via a link shared by others. This is necessary to ensure
            // // that all users who access the application through the same link consistently send identical
            // // `exportImage` requests, thereby enhancing the likelihood of utilizing cached responses
            // // from the CDN servers rather than the ArcGIS Image Server.
            // const animationWindowInfoFromHashParams =
            //     getAnimationWindowInfoFromHashParams();

            // console.log(animationWindowInfoFromHashParams);

            // let { extent, width, height } =
            //     animationWindowInfoFromHashParams || {};

            // extent = extent || getNormalizedExtent(mapView.extent);
            // width = width || mapView.width;
            // height = height || mapView.height;

            const extent = getNormalizedExtent(mapView.extent);
            const width = mapView.width;
            const height = mapView.height;
            // console.log('calling loading animation frame data', width, height)

            const { xmin, ymin, xmax, ymax } = extent;

            // get images via export image request
            const requests = queryParams4ImageryScenes
                .filter(
                    (queryParam) => queryParam.objectIdOfSelectedScene !== null
                )
                .map((queryParam) => {
                    return exportImage({
                        serviceUrl: imageryServiceUrl,
                        extent,
                        width,
                        height,
                        objectId: queryParam.objectIdOfSelectedScene,
                        rasterFunctionName: queryParam.rasterFunctionName,
                        abortController: abortControllerRef.current,
                    });
                });

            const responses = await Promise.all(requests);

            // once responses are received, get array of image elements using the binary data returned from export image requests
            const imageElements = responses.map((blob: Blob) => {
                return new ImageElement({
                    image: URL.createObjectURL(blob),
                    georeference: new ExtentAndRotationGeoreference({
                        extent: {
                            spatialReference: {
                                wkid: 102100,
                            },
                            xmin,
                            ymin,
                            xmax,
                            ymax,
                        },
                    }),
                    opacity: 1,
                });
            });

            setImageElements(imageElements);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!animationStatus) {
            // call abort so all pending requests can be cancelled
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // call revokeObjectURL so these image elements can be freed from the memory
            if (imageElements) {
                for (const elem of imageElements) {
                    URL.revokeObjectURL(elem.image as string);
                }
            }

            setImageElements(null);
        } else if (animationStatus === 'loading') {
            loadFrameData();
        }
    }, [animationStatus]);

    // If the map view's height changes while loading animation frames,
    // call loadFrameData again to re-fetch the animation frame images to cover the entire map.
    useEffect(() => {
        // No need to call loadFrameData if it is not currently loading data.
        // If the map view's height changes during animation,
        // the animation layer will reset the status to 'loading', triggering this hook to re-fetch images.
        if (animationStatus !== 'loading') {
            return;
        }

        loadFrameData();
    }, [mapView?.height]);

    return imageElements;
};

export default useMediaLayerImageElement;
