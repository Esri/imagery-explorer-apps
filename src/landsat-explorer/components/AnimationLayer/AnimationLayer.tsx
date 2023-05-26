import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import IMapView from 'esri/views/MapView';
import IMediaLayer from 'esri/layers/MediaLayer';
import { loadModules } from 'esri-loader';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { animationStatusChanged } from '@shared/store/UI/reducer';
// import CloseButton from './CloseButton';
import useMediaLayerImageElement from './useMediaLayerImageElement';
import useMediaLayerAnimation from './useMediaLayerAnimation';
import {
    selectAnimationStatus,
    selectAnimationSpeed,
} from '@shared/store/UI/selectors';
import { selectQueryParams4ScenesInAnimateMode } from '@shared/store/Landsat/selectors';
import { CloseButton } from '@shared/components/CloseButton';
import { sortQueryParams4ScenesByAcquisitionDate } from '../AnimationControl/helpers';
import { selectedAnimationFrameIdChanged } from '@shared/store/Landsat/reducer';

type Props = {
    mapView?: IMapView;
};

export const AnimationLayer: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const mediaLayerRef = useRef<IMediaLayer>();

    const animationStatus = useSelector(selectAnimationStatus);

    const animationSpeed = useSelector(selectAnimationSpeed);

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
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
        mapView,
        animationStatus,
        QueryParams4ImageryScenes: sortedQueryParams4ScenesInAnimationMode,
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

            const queryParams4ActiveLandsatScene =
                sortedQueryParams4ScenesInAnimationMode[indexOfActiveFrame];

            dispatch(
                selectedAnimationFrameIdChanged(
                    queryParams4ActiveLandsatScene?.animationFrameId
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
        type Modules = [typeof IMediaLayer];

        try {
            const [MediaLayer] = await (loadModules([
                'esri/layers/MediaLayer',
            ]) as Promise<Modules>);

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
        if (!mediaLayerRef.current) {
            initMediaLayer();
            return;
        }

        if (!mediaLayerElements) {
            // animation is not started or just stopped
            // just clear all elements in media layer
            mediaLayerRef.current.source.elements.removeAll();
        } else {
            mediaLayerRef.current.source.elements.addMany(mediaLayerElements);
            // media layer elements are ready, change animation mode to playing to start the animation
            dispatch(animationStatusChanged('playing'));
        }
    }, [mediaLayerElements, mapView]);

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
        </div>
    );
};
