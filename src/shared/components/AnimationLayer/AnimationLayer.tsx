import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MapView from '@arcgis/core/views/MapView';
import MediaLayer from '@arcgis/core/layers/MediaLayer';
import { useDispatch } from 'react-redux';
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
import { selectQueryParams4ScenesInAnimateMode } from '@shared/store/ImageryScene/selectors';
import { CloseButton } from '@shared/components/CloseButton';
// import { sortQueryParams4ScenesByAcquisitionDate } from './AnimationControl/helpers';
import { selectedAnimationFrameIdChanged } from '@shared/store/ImageryScene/reducer';
import { sortQueryParams4ScenesByAcquisitionDate } from '@shared/components/AnimationControl/helpers';
import { AnimationDownloadPanel } from '../AnimationDownloadPanel';
import { saveAnimationWindowInfoToHashParams } from '@shared/utils/url-hash-params';

type Props = {
    mapView?: MapView;
};

export const AnimationLayer: FC<Props> = ({ mapView }: Props) => {
    const dispatch = useDispatch();

    const mediaLayerRef = useRef<MediaLayer>();

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
        if (!mediaLayerRef.current) {
            initMediaLayer();
            return;
        }

        // why doing this? It seems there is some bug in @types/arcgis-js-api@4.27 and the `elements`
        // property is no longer defined for `layer.source`, but according to the JSAPI doc (https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-LocalMediaElementSource.html#elements),
        // it is still there, therefore we just use this temporary solution so TypeScript won't throw error
        const source = mediaLayerRef.current.source as any;

        if (!mediaLayerElements) {
            // animation is not started or just stopped
            // just clear all elements in media layer
            source.elements.removeAll();
        } else {
            source.elements.addMany(mediaLayerElements);
            // media layer elements are ready, change animation mode to playing to start the animation
            dispatch(animationStatusChanged('playing'));
        }
    }, [mediaLayerElements, mapView]);

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
                mediaLayerElements={mediaLayerElements}
                queryParams4ScenesInAnimationMode={
                    sortedQueryParams4ScenesInAnimationMode
                }
                animationSpeed={animationSpeed}
                mapViewWindowSize={{
                    width: mapView.width,
                    height: mapView.height,
                }}
            />
        </div>
    );
};
