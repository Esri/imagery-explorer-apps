/* Copyright 2024 Esri
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
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

import IMapView from '@arcgis/core/views/MapView';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import { saveAnimationModeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import CloseButton from './CloseButton';
import useMediaLayerImageElement from './useMediaLayerImageElement';
import useMediaLayerAnimation from './useMediaLayerAnimation';
import {
    LandCoverLayerBlendMode,
    LandCoverLayerEffect,
} from '../LandcoverLayer/useLandCoverLayer';
import { AnimationDownloadPanel } from '@shared/components/AnimationDownloadPanel';
import { useFrameDataForDownloadJob } from './useFrameDataForDownloadJob';
import { AnimationFrameData } from '@vannizhang/images-to-video-converter-client';

type Props = {
    mapView?: IMapView;
};

const AnimationPanel: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationStatus);

    const mediaLayerRef = useRef<MediaLayer>();

    const mediaLayerElements = useMediaLayerImageElement(mapView);

    const frameData4DownloadJob: AnimationFrameData[] =
        useFrameDataForDownloadJob({ mediaLayerElements });

    useMediaLayerAnimation(mediaLayerElements);

    const initMediaLayer = () => {
        mediaLayerRef.current = new MediaLayer({
            visible: true,
            effect: LandCoverLayerEffect,
            blendMode: LandCoverLayerBlendMode,
        });

        mapView.map.add(mediaLayerRef.current);
    };

    useEffect(() => {
        saveAnimationModeToHashParams(animationMode !== null);
    }, [animationMode]);

    useEffect(() => {
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

        source.elements.addMany(mediaLayerElements);
        // media layer elements are ready, change animation mode to playing to start the animation
        dispatch(animationStatusChanged('playing'));
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
                <calcite-loader active scale="l"></calcite-loader>
            )}

            <CloseButton />

            <AnimationDownloadPanel
                frameData4DownloadJob={frameData4DownloadJob}
                animationSpeed={1000}
                mapViewWindowSize={{
                    width: mapView.width,
                    height: mapView.height,
                }}
            />
        </div>
    );
};

export default AnimationPanel;
