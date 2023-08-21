import './style.css';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import ISwipe from 'esri/widgets/Swipe';
import MapView from 'esri/views/MapView';
import { loadModules } from 'esri-loader';
import IReactiveUtils from 'esri/core/reactiveUtils';
import ImageryLayer from 'esri/layers/ImageryLayer';

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
    const swipeWidgetRef = useRef<ISwipe>();

    const init = async () => {
        type Modules = [typeof ISwipe, typeof IReactiveUtils];

        const [Swipe, reactiveUtils] = await (loadModules([
            'esri/widgets/Swipe',
            'esri/core/reactiveUtils',
        ]) as Promise<Modules>);

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

        reactiveUtils.watch(
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
