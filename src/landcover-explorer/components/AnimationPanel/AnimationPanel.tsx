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

import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectAnimationSpeed,
    selectAnimationStatus,
} from '@shared/store/UI/selectors';

import IMapView from '@arcgis/core/views/MapView';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { useAppDispatch } from '@shared/store/configureStore';
import classNames from 'classnames';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import { saveAnimationModeToHashParams } from '@landcover-explorer/utils/URLHashParams';
// import CloseButton from './CloseButton';
import useMediaLayerImageElement from './useMediaLayerImageElement';
import useMediaLayerAnimation from './useMediaLayerAnimation';
import {
    LandCoverLayerBlendMode,
    LandCoverLayerEffect,
} from '../LandcoverLayer/useLandCoverLayer';
import { AnimationDownloadPanel } from '@shared/components/AnimationDownloadPanel';
import { useFrameDataForDownloadJob } from './useFrameDataForDownloadJob';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';
import { CloseButton } from '@shared/components/CloseButton';
import { selectShouldShowSatelliteImageryLayer } from '@shared/store/LandcoverExplorer/selectors';
import { once } from '@arcgis/core/core/reactiveUtils';
import { CalciteLoader } from '@esri/calcite-components-react';

type Props = {
    mapView?: IMapView;
    /**
     * The URL for the Land Cover Image Service.
     */
    landCoverServiceUrl: string;
    /**
     * The URL for the Satellite Imagery Service.
     */
    satellteImageryServiceUrl: string;
    /**
     * The raster function name for the land cover layer.
     */
    landcoverLayerRasterFunctionName: string;
    /**
     * The animation metadata sources.
     */
    animationMetadataSources: string;
};

const AnimationPanel: FC<Props> = ({
    mapView,
    landCoverServiceUrl,
    satellteImageryServiceUrl,
    landcoverLayerRasterFunctionName,
    animationMetadataSources,
}: Props) => {
    const dispatch = useAppDispatch();

    const animationMode = useAppSelector(selectAnimationStatus);

    const mediaLayerRef = useRef<MediaLayer>(null);

    const mediaLayerElements = useMediaLayerImageElement({
        landCoverServiceUrl,
        satellteImageryServiceUrl,
        landcoverLayerRasterFunctionName,
        mapView,
    });

    const frameData4DownloadJob: AnimationFrameData[] =
        useFrameDataForDownloadJob({
            mediaLayerElements,
            mapView,
            animationMetadataSources,
        });

    const animationSpeed = useAppSelector(selectAnimationSpeed);

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    useMediaLayerAnimation(mediaLayerElements);

    const initMediaLayer = () => {
        mediaLayerRef.current = new MediaLayer({
            visible: true,
            effect: LandCoverLayerEffect,
            blendMode: LandCoverLayerBlendMode,
        });

        mapView.map.add(mediaLayerRef.current);
    };

    // useEffect(() => {
    //     saveAnimationModeToHashParams(animationMode !== null);
    // }, [animationMode]);

    useEffect(() => {
        (async () => {
            if (!mediaLayerRef.current) {
                return;
            }

            const source = mediaLayerRef.current.source as any;

            // If the animation is not yet started or has been stopped,
            // clear all elements in the media layer to ensure a clean slate.
            if (!mediaLayerElements) {
                source.elements.removeAll();
                return;
            }

            // Check if the frameData4DownloadJob is ready before starting the animation.
            // This is crucial to ensure that the basemap screenshot is captured and blended into each animation frame properly.
            // If the animation starts before the frameData4DownloadJob is ready, there's a risk that the basemap
            // may get obscured by elements in the media layer.
            if (!frameData4DownloadJob?.length) {
                return;
            }

            // source.elements.addMany(mediaLayerElements);

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
    }, [mediaLayerElements, frameData4DownloadJob]);

    useEffect(() => {
        if (!mapView) {
            return;
        }

        if (!mediaLayerRef.current) {
            initMediaLayer();
        }
    }, [mapView]);

    if (!animationMode) {
        return null;
    }

    return (
        <div
            className={classNames(
                'absolute top-0 left-0 bottom-0 right-0 z-10 flex items-center justify-center'
            )}
        >
            {animationMode === 'loading' && (
                <CalciteLoader scale="l"></CalciteLoader>
            )}

            <CloseButton
                onClick={() => {
                    dispatch(animationStatusChanged(null));
                }}
            />

            <AnimationDownloadPanel
                frameData4DownloadJob={frameData4DownloadJob}
                animationSpeed={animationSpeed}
                mapViewWindowSize={{
                    width: mapView.width,
                    height: mapView.height,
                }}
                authoringAppName={
                    shouldShowSentinel2Layer ? 'sentinel2' : 'landcover'
                }
            />
        </div>
    );
};

export default AnimationPanel;
