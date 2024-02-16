import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationMode } from '@landcover-explorer/store/UI/selectors';

import IMapView from '@arcgis/core/views/MapView';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { animationModeUpdated } from '@landcover-explorer/store/UI/reducer';
import { saveAnimationModeToHashParams } from '@landcover-explorer/utils/URLHashParams';
import CloseButton from './CloseButton';
import useMediaLayerImageElement from './useMediaLayerImageElement';
import useMediaLayerAnimation from './useMediaLayerAnimation';
import {
    LandCoverLayerBlendMode,
    LandCoverLayerEffect,
} from '../LandcoverLayer/useLandCoverLayer';

type Props = {
    mapView?: IMapView;
};

const AnimationPanel: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const mediaLayerRef = useRef<MediaLayer>();

    const mediaLayerElements = useMediaLayerImageElement(mapView);

    useMediaLayerAnimation(mediaLayerElements);

    const initMediaLayer = async () => {
        try {
            mediaLayerRef.current = new MediaLayer({
                visible: true,
                effect: LandCoverLayerEffect,
                blendMode: LandCoverLayerBlendMode,
            });

            mapView.map.add(mediaLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        saveAnimationModeToHashParams(animationMode !== null);
    }, [animationMode]);

    useEffect(() => {
        if (!mediaLayerRef.current) {
            initMediaLayer();
            return;
        }

        const source = mediaLayerRef.current.source as any;

        if (!mediaLayerElements) {
            // animation is not started or just stopped
            // just clear all elements in media layer
            source.elements.removeAll();
        } else {
            source.elements.addMany(mediaLayerElements);
            // media layer elements are ready, change animation mode to playing to start the animation
            dispatch(animationModeUpdated('playing'));
        }
    }, [mediaLayerElements, mapView]);

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
        </div>
    );
};

export default AnimationPanel;
