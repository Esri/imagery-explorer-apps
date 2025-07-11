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

import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import MapView from '@arcgis/core/views/MapView';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { useAppDispatch } from '@shared/store/configureStore';
import classNames from 'classnames';
import {
    animationStatusChanged,
    showDownloadAnimationPanelChanged,
} from '@shared/store/UI/reducer';
// import CloseButton from './CloseButton';
import useMediaLayerImageElement from './useMediaLayerImageElement';
import useMediaLayerAnimation from './useMediaLayerAnimation';
import {
    selectAnimationStatus,
    selectAnimationSpeed,
} from '@shared/store/UI/selectors';
import { selectListOfQueryParams } from '@shared/store/ImageryScene/selectors';
import { CloseButton } from '@shared/components/CloseButton';
// import { sortQueryParams4ScenesByAcquisitionDate } from './AnimationControl/helpers';
import { selectedItemIdOfQueryParamsListChanged } from '@shared/store/ImageryScene/reducer';
import { sortQueryParams4ScenesByAcquisitionDate } from '@shared/components/AnimationControl/helpers';
import { AnimationDownloadPanel } from '../AnimationDownloadPanel';
import { saveAnimationWindowInfoToHashParams } from '@shared/utils/url-hash-params';
import { useFrameDataForDownloadJob } from './useFrameDataForDownloadJob';
import { once } from '@arcgis/core/core/reactiveUtils';

type Props = {
    /**
     * The URL of the Imagery Service that will be used to provide image for theframes of Animation Layer
     */
    imageryServiceUrl: string;
    /**
     * name of the app/service to be added as prefix to the filename of the output .mp4 file
     */
    authoringAppName: string;
    /**
     * The animation metadata sources.
     */
    animationMetadataSources: string;
    mapView?: MapView;
};

export const AnimationLayer: FC<Props> = ({
    imageryServiceUrl,
    authoringAppName,
    animationMetadataSources,
    mapView,
}: Props) => {
    const dispatch = useAppDispatch();

    const mediaLayerRef = useRef<MediaLayer>();

    const animationStatus = useAppSelector(selectAnimationStatus);

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    const queryParams4ScenesInAnimationMode = useAppSelector(
        selectListOfQueryParams
    );

    /**
     * Sort query params using the Acquisition Date. Query Params that don't have selected Acquisition date
     * will be exluded.
     */
    const sortedQueryParams4ScenesInAnimationMode =
        sortQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimationMode,
            true
        );

    /**
     * Array of Imagery Elements for each scene in `sortedQueryParams4ScenesInAnimationMode`
     */
    const mediaLayerElements = useMediaLayerImageElement({
        imageryServiceUrl,
        mapView,
        animationStatus,
        queryParams4ImageryScenes: sortedQueryParams4ScenesInAnimationMode,
    });

    /**
     * an array of `AnimationFrameData4DownloadJob` objects
     * that can be used by the AnimationDownloadPanel
     */
    const frameData4DownloadJob = useFrameDataForDownloadJob({
        mediaLayerElements,
        sortedQueryParams4ScenesInAnimationMode,
        animationMetadataSources,
    });

    /**
     * This is a callback function that will be called each time the active frame (Image Element) in the animation layer is changed.
     */
    const activeFrameOnChange = useCallback(
        (indexOfActiveFrame: number) => {
            // console.log(
            //     `query params for active frame`,
            //     sortedQueryParams4ScenesInAnimationMode[indexOfActiveFrame]
            // );

            const queryParamsOfActiveFrame =
                sortedQueryParams4ScenesInAnimationMode[indexOfActiveFrame];

            dispatch(
                selectedItemIdOfQueryParamsListChanged(
                    queryParamsOfActiveFrame?.uniqueId
                )
            );
        },
        [sortedQueryParams4ScenesInAnimationMode]
    );

    useMediaLayerAnimation({
        animationStatus,
        animationSpeed,
        mediaLayerElements,
        activeFrameOnChange,
    });

    const initMediaLayer = async () => {
        try {
            mediaLayerRef.current = new MediaLayer({
                visible: true,
                // effect: LandCoverLayerEffect,
                // blendMode: LandCoverLayerBlendMode,
            });

            mapView.map.add(mediaLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            if (!mediaLayerRef.current) {
                initMediaLayer();
                return;
            }

            // why doing this? It seems there is some bug in @types/arcgis-js-api@4.27 and the `elements`
            // property is no longer defined for `layer.source`, but according to the JSAPI doc (https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LocalMediaElementSource.html#elements),
            // it is still there, therefore we just use this temporary solution so TypeScript won't throw error
            const source = mediaLayerRef.current.source as any;

            // clear existing elements bofore adding new list of elements to media layer
            source.elements.removeAll();

            if (!mediaLayerElements || mediaLayerElements.length === 0) {
                return;
            }

            // source.elements.addMany(mediaLayerElements);
            // // media layer elements are ready, change animation mode to playing to start the animation
            // dispatch(animationStatusChanged('playing'));

            try {
                // // Wait until all mediaLayerElements are loaded before proceeding
                // await Promise.all(
                //     mediaLayerElements.map((element) =>
                //         once(
                //             () =>
                //                 element.loadStatus === 'loaded' ||
                //                 element.loadStatus === 'failed'
                //         )
                //     )
                // );

                // for (const element of mediaLayerElements) {
                //     if (element.loadStatus === 'failed') {
                //         throw new Error(`Element failed to load: ${element}`);
                //     }
                //     // console.log(`Element loaded: ${element.loadStatus}`);
                // }

                for (const element of mediaLayerElements) {
                    source.elements.add(element);

                    // Wait for each element to load before proceeding
                    await once(
                        () =>
                            element.loadStatus === 'loaded' ||
                            element.loadStatus === 'failed'
                    );

                    if (element.loadStatus === 'failed') {
                        throw new Error(`Element failed to load: ${element}`);
                    }

                    console.log(`Element loaded: ${element.loadStatus}`);
                }

                // media layer elements are ready, change animation mode to playing to start the animation
                dispatch(animationStatusChanged('playing'));
            } catch (error) {
                console.error('Error loading media layer elements:', error);
                // If any element fails to load, we can stop the animation and reset the media layer
                dispatch(animationStatusChanged('failed-loading'));
            }
        })();
    }, [mediaLayerElements, mapView]);

    // If the map view's height changes during an animation,
    // set the animation status to 'loading' so the useMediaLayerImageElement hook
    // can re-fetch the animation frame images to cover the entire map.
    useEffect(() => {
        if (!animationStatus || animationStatus === 'loading') {
            return;
        }

        dispatch(animationStatusChanged('loading'));
    }, [mapView?.height]);

    useEffect(() => {
        // We only need to save animation window information when the animation is in progress.
        // Additionally, we should always reset the animation window information in the hash parameters
        // when the animation stops. Resetting the animation window information is crucial
        // as it ensures that the animation window information is not used if the user manually starts the animation.
        // Animation window information from the hash parameters should only be utilized by users
        // who open the application in animation mode through a link shared by others.
        const extent = animationStatus === 'playing' ? mapView.extent : null;

        const width = animationStatus === 'playing' ? mapView.width : null;

        const height = animationStatus === 'playing' ? mapView.height : null;

        saveAnimationWindowInfoToHashParams(extent, width, height);
    }, [animationStatus]);

    useEffect(() => {
        // should close download animation panel whenever user exits the animation mode
        if (animationStatus === null) {
            dispatch(showDownloadAnimationPanelChanged(false));
        }
    }, [animationStatus]);

    if (!animationStatus) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 left-0 bottom-0 right-0 z-10 flex items-center justify-center'
            )}
        >
            {animationStatus === 'loading' && (
                <calcite-loader active scale="l"></calcite-loader>
            )}

            <CloseButton
                onClick={() => {
                    dispatch(animationStatusChanged(null));
                }}
            />

            <AnimationDownloadPanel
                frameData4DownloadJob={frameData4DownloadJob}
                animationSpeed={animationSpeed}
                authoringAppName={authoringAppName}
                mapViewWindowSize={{
                    width: mapView.width,
                    height: mapView.height,
                }}
            />
        </div>
    );
};
