import MapView from '@arcgis/core/views/MapView';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';
import { SENTINEL_1_SERVICE_URL } from '@shared/services/sentinel-1/config';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectMapCenter, selectMapExtent } from '@shared/store/Map/selectors';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { clip, planarArea } from '@arcgis/core/geometry/geometryEngineAsync.js';
import { Polygon } from '@arcgis/core/geometry';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { useDispatch } from 'react-redux';
import { totalAreaInSqKmChanged } from '@shared/store/MaskTool/reducer';

const featureByObjectId: Map<number, IFeature> = new Map();

/**
 * Custom React hook to calculate the total area of a mask layer on the map.
 *
 * @param {string} imageryServiceURL - The URL of the imagery service.
 * @param {MapView} mapView - The ArcGIS MapView instance.
 */
export const useCalcMaskLayerTotalArea = (
    imageryServiceURL: string,
    mapView: MapView
) => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const center = useSelector(selectMapCenter);

    const abortControllerRef = useRef<AbortController>();

    const getTotalArea = async () => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        if (mode !== 'analysis' || analyzeTool !== 'mask') {
            return;
        }

        try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            // Retrieve the feature for the selected imagery scene
            const feature = featureByObjectId.has(objectIdOfSelectedScene)
                ? featureByObjectId.get(objectIdOfSelectedScene)
                : await getFeatureByObjectId(
                      imageryServiceURL,
                      objectIdOfSelectedScene,
                      abortControllerRef.current
                  );

            featureByObjectId.set(objectIdOfSelectedScene, feature);

            const geometry = feature.geometry as any;

            const { extent } = mapView;

            // clip with map extent
            const clipped = (await clip(geometry, extent)) as Polygon;

            // calculate area of clipped geometry in sq kilometeres
            const area = await planarArea(clipped, 'square-kilometers');
            // console.log(area);

            dispatch(totalAreaInSqKmChanged(area));
        } catch (err) {
            console.log('failed to calculate area of mask layer', err);
        }
    };

    useEffect(() => {
        getTotalArea();
    }, [objectIdOfSelectedScene, center, mode, analyzeTool]);
};
