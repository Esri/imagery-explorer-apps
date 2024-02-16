import './style.css';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import Swipe from '@arcgis/core/widgets/Swipe';
import IMapView from '@arcgis/core/views/MapView';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import IImageryLayer from '@arcgis/core/layers/ImageryLayer';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';
import { LandCoverClassification } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

type Props = {
    /**
     * If true, display sentinel 2 imagery layer
     */
    shouldShowSentinel2Layer: boolean;
    /**
     * The year that will be used to get the leading layer
     */
    yearForLeadingLayer: number;
    /**
     * The year that will be used to get the trailing layer
     */
    yearForTailingLayer: number;
    /**
     * Indicate if Swipe Widget is visible
     */
    visible: boolean;
    /**
     * Map view that contains Swipe Widget
     */
    mapView?: IMapView;
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
 * Swipe Widget to compare land cover layers from two different years
 */
const SwipeWidget: FC<Props> = ({
    shouldShowSentinel2Layer,
    yearForLeadingLayer,
    yearForTailingLayer,
    mapView,
    visible,
    positionOnChange,
    referenceInfoOnToggle,
}: Props) => {
    const swipeWidgetRef = useRef<Swipe>();

    const leadingLandCoverLayer = useLandCoverLayer({
        year: yearForLeadingLayer,
        visible: visible && shouldShowSentinel2Layer === false,
    });

    const leadingSentinel2Layer = useSentinel2Layer({
        year: yearForLeadingLayer,
        visible: visible && shouldShowSentinel2Layer,
    });

    const trailingLandcoverLayer = useLandCoverLayer({
        year: yearForTailingLayer,
        visible: visible && shouldShowSentinel2Layer === false,
    });

    const trailingSentinel2Layer = useSentinel2Layer({
        year: yearForTailingLayer,
        visible: visible && shouldShowSentinel2Layer,
    });

    const init = async () => {
        mapView.map.addMany([
            leadingLandCoverLayer,
            leadingSentinel2Layer,
            trailingLandcoverLayer,
            trailingSentinel2Layer,
        ]);

        swipeWidgetRef.current = new Swipe({
            view: mapView,
            leadingLayers: [leadingLandCoverLayer, leadingSentinel2Layer],
            trailingLayers: [trailingLandcoverLayer, trailingSentinel2Layer],
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
            !swipeWidgetRef.current &&
            leadingLandCoverLayer &&
            leadingSentinel2Layer &&
            trailingLandcoverLayer &&
            trailingSentinel2Layer
        ) {
            init();
        }
    }, [
        mapView,
        leadingLandCoverLayer,
        leadingSentinel2Layer,
        trailingLandcoverLayer,
        trailingSentinel2Layer,
    ]);

    // useEffect(() => {
    //     if (swipeWidgetRef.current) {
    //         toggleDisplayLayers();
    //     }
    // }, [shouldShowSentinel2Layer]);

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
