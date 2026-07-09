import GroupLayer from '@arcgis/core/layers/GroupLayer';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';
import {
    clip,
    compositeBand,
    grayscale,
} from '@arcgis/core/layers/support/rasterFunctionUtils';
import MapView from '@arcgis/core/views/MapView';
import { getLockRasterMosaicRule } from '@shared/components/ImageryLayer/useImageLayer';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import React, { FC, useEffect, useMemo } from 'react';
import { getGrayscaleRasterFunction } from '../../utils/getGrayscaleRasterFunction';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * Indicates whether the temporal composite layer should be visible or not.
     */
    visible: boolean;
    /**
     * Indicates whether the temporal composite layer is on or off.
     */
    isTemporalCompositeLayerOn: boolean;
    /**
     * The object ID of scene A used for generating the temporal composite layer.
     * Pixels from this scene will be used to generate the red band of the composite layer.
     */
    objectIdOfSceneA: number;
    /**
     * The object ID of scene B used for generating the temporal composite layer.
     * Pixels from this scene will be used to generate the green and blue bands of the composite layer.
     */
    objectIdOfSceneB: number;
    objectIdOfSelectedScene: number;
};

export const DRXTemporalCompositeLayer: FC<Props> = ({
    mapView,
    groupLayer,
    visible,
    isTemporalCompositeLayerOn,
    objectIdOfSceneA,
    objectIdOfSceneB,
    objectIdOfSelectedScene,
}) => {
    const layerRef = React.useRef<ImageryLayer>(null);

    // get the mosaic rule for the selected scene. This mosaic rule will lock the imagery layer to the selected scene to preview the selected scene in the temporal composite tool.
    // it will be null if the temporal composite layer is not on, or the layer is not visible, or there is no selected scene.
    const mosaicRule = useMemo(() => {
        if (isTemporalCompositeLayerOn) {
            return null;
        }

        if (!visible) {
            return null;
        }

        if (objectIdOfSelectedScene) {
            return getLockRasterMosaicRule(objectIdOfSelectedScene);
        }

        return null;
    }, [isTemporalCompositeLayerOn, visible, objectIdOfSelectedScene]);

    const compositeRasterFunction = useMemo(() => {
        if (!isTemporalCompositeLayerOn) {
            return null;
        }

        if (!visible) {
            return null;
        }

        if (!objectIdOfSceneA || !objectIdOfSceneB) {
            return null;
        }

        // // Convert each input scene to greyscale using the luminosity method,
        // // The formula for luminosity is 0.21 R + 0.72 G + 0.07 B.
        // const grayScaleWeights = [21, 72, 7];

        const greyscaleRasterFunction4SceneA =
            getGrayscaleRasterFunction(objectIdOfSceneA);

        const greyscaleRasterFunction4SceneB =
            getGrayscaleRasterFunction(objectIdOfSceneB);

        const compositeBandRasterFunction = compositeBand({
            // rasters: [
            //     greyscaleRasterFunction4EarlierScene,
            //     greyscaleRasterFunction4LaterScene,
            //     greyscaleRasterFunction4LaterScene,
            // ],
            rasters: [
                greyscaleRasterFunction4SceneA,
                greyscaleRasterFunction4SceneB,
                greyscaleRasterFunction4SceneB,
            ],
        });

        return compositeBandRasterFunction;
    }, [
        isTemporalCompositeLayerOn,
        visible,
        objectIdOfSceneA,
        objectIdOfSceneB,
    ]);

    const initLayer = () => {
        if (!mapView || !groupLayer) {
            return;
        }

        if (layerRef.current) {
            return;
        }

        const temporalCompositeLayer = new ImageryLayer({
            url: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
            title: 'Temporal Composite',
            visible,
            mosaicRule,
            rasterFunction: compositeRasterFunction,
        });

        layerRef.current = temporalCompositeLayer;

        if (groupLayer) {
            groupLayer.add(temporalCompositeLayer);
        } else {
            mapView.map.add(temporalCompositeLayer);
        }
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        initLayer();
    }, [mapView, groupLayer]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }

        layerRef.current.visible = visible;
    }, [visible]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }
        layerRef.current.mosaicRule = mosaicRule;
    }, [mosaicRule]);

    useEffect(() => {
        if (!layerRef.current) {
            return;
        }
        layerRef.current.rasterFunction = compositeRasterFunction;
    }, [compositeRasterFunction]);

    return null;
};
