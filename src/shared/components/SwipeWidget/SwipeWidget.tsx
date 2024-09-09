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

import './style.css';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import Swipe from '@arcgis/core/widgets/Swipe';
import MapView from '@arcgis/core/views/MapView';
import { watch } from '@arcgis/core/core/reactiveUtils';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import { useAutoSwipe } from './useAutoSwipe';

type Props = {
    /**
     * Indicate if Swipe Widget is visible
     */
    visible: boolean;
    leadingLayer: ImageryLayer;
    trailingLayer: ImageryLayer;
    /**
     * Map view that contains Swipe Widget
     */
    mapView?: MapView;
    /**
     * Fires when user drag and change swipe position
     */
    positionOnChange: (position: number) => void;
    /**
     * Fires when user hover in/out handler element, which toggle dispalys the reference info
     */
    referenceInfoOnToggle: (shouldDisplay: boolean) => void;
};

/**
 * Swipe Widget to compare imagery layers using different query params
 */
const SwipeWidget: FC<Props> = ({
    mapView,
    visible,
    leadingLayer,
    trailingLayer,
    positionOnChange,
    referenceInfoOnToggle,
}: Props) => {
    const swipeWidgetRef = useRef<Swipe>();

    useAutoSwipe(swipeWidgetRef.current);

    const init = async () => {
        // this swipe widget layers should be added at index of one so that the
        // hillsahde/terrain layer can be added on top of it with blend mode applied
        mapView.map.addMany([leadingLayer, trailingLayer], 1);

        swipeWidgetRef.current = new Swipe({
            view: mapView,
            leadingLayers: [leadingLayer],
            trailingLayers: [trailingLayer],
            direction: 'horizontal',
            position: 50, // position set to middle of the view (50%)
            visible,
        });

        // console.log(swipeWidgetRef.current)
        mapView.ui.add(swipeWidgetRef.current);

        watch(
            () => swipeWidgetRef.current.position,
            (position: number) => {
                // console.log('position changes for swipe widget', position);
                positionOnChange(position);
            }
        );

        swipeWidgetRef.current.when(() => {
            addMouseEventHandlers();
        });

        // swipe widget is ready, add layers to it
        // toggleDisplayLayers();
    };

    const addMouseEventHandlers = () => {
        const handleElem = document.querySelector('.esri-swipe__container');

        if (!handleElem) {
            return;
        }

        handleElem.addEventListener('mouseenter', () => {
            // console.log('mouseenter');
            referenceInfoOnToggle(true);
        });

        handleElem.addEventListener('mouseleave', () => {
            // console.log('mouseleave');
            referenceInfoOnToggle(false);
        });

        // console.log(handleElem)
    };

    useEffect(() => {
        // initiate swipe widget
        if (
            mapView &&
            leadingLayer &&
            trailingLayer &&
            !swipeWidgetRef.current
            // trailingLandcoverLayer &&
            // trailingSentinel2Layer
        ) {
            init();
        }
    }, [
        mapView,
        leadingLayer,
        trailingLayer,
        // leadingLandCoverLayer,
        // leadingSentinel2Layer,
        // trailingLandcoverLayer,
        // trailingSentinel2Layer,
    ]);

    useEffect(() => {
        if (swipeWidgetRef.current) {
            swipeWidgetRef.current.visible = visible;

            if (visible) {
                // why need to wait for 1 second??
                // for some reason '.esri-swipe__container' won't be ready
                // if we call `addMouseEventHandlers` right after swipe widget becomes visible,
                // tried using swipeWidgetRef.current.when but that didn't work either,
                // so the only workaround that I can come up with add this moment is using a setTimeout,
                // not a decent solution, definitely need to be fixed in future
                setTimeout(() => {
                    addMouseEventHandlers();
                }, 1000);
            }
        }
    }, [visible]);

    return null;
};

export default SwipeWidget;
