import { ResourceHandle } from '@arcgis/core/core/Handles';
import Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import MapView from '@arcgis/core/views/MapView';
import { DisasterResponseImageryServiceField } from '@shared/services/disaster-response/config';
import { getEventFootprints } from '@shared/services/disaster-response/getEventFootprints';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { objectIdsOfScenesInCurrentMapExtentUpdated } from '@shared/store/DisasterResponse/reducer';
import {
    selectObjectIdOfHoveredScene,
    selectObjectIdOfScenesInCurrentPage,
    selectSelectedEventName,
} from '@shared/store/DisasterResponse/selectors';
import {
    selectMapCenter,
    selectMapExtent,
    selectMapZoom,
} from '@shared/store/Map/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import React, { FC, useEffect, useRef } from 'react';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const DisasterResponseFootprintsLayer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const dispatch = useAppDispatch();

    const layerRef = useRef<FeatureLayer>(null);

    const layerViewRef = useRef<FeatureLayerView>(null);

    const selectedEvent = useAppSelector(selectSelectedEventName);

    const mapCenter = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    const objectIdOfHoveredScene = useAppSelector(selectObjectIdOfHoveredScene);

    // A handler can be used to remove any previous highlight when applying a new one
    const hoverHighlightRef = useRef<ResourceHandle>(null);

    // object ids of scenes in current page, used to determine which footprints to show on the map based on the current page selection in the scene selector component
    const objectIdsOfScenesInCurrentPage = useAppSelector(
        selectObjectIdOfScenesInCurrentPage
    );

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const visible = !!selectedEvent && !isAnimationPlaying;

    // load the footprints for the selected event and add them to the map
    const updateLayer = async () => {
        if (layerRef.current) {
            groupLayer.remove(layerRef.current);
            layerRef.current = null;
            layerViewRef.current = null;
        }

        // if there is no selected event or no scenes in the current page, there is no need to query footprints or add the layer to the map
        if (!selectedEvent) return;

        const features = await getEventFootprints(
            selectedEvent
            // objectIds
        );
        // console.log('footprint features: ', features);

        const graphics: Graphic[] = features.map((feature) => {
            return new Graphic({
                geometry: new Polygon({
                    rings: (feature.geometry as any).rings,
                    spatialReference: mapView?.spatialReference,
                }),
                attributes: {
                    OBJECTID:
                        feature.attributes[
                            DisasterResponseImageryServiceField.OBJECTID
                        ],
                },
            });
        });
        // console.log('graphics: ', graphics);

        layerRef.current = new FeatureLayer({
            source: graphics,
            objectIdField: 'OBJECTID',
            geometryType: 'polygon',
            spatialReference: mapView?.spatialReference,
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill',
                    color: [255, 255, 255, 0],
                    outline: {
                        color: [191, 238, 254, 0.5],
                        width: 1,
                    },
                },
            },
            visible,
            effect: 'drop-shadow(0px 0px 5px #000)',
        });

        mapView.whenLayerView(layerRef.current).then((layerView) => {
            layerViewRef.current = layerView as FeatureLayerView;
        });

        groupLayer.add(layerRef.current, 0);

        // also need to query features in current extent after the layer is loaded to make sure the count of visible features is correct
        queryFeaturesInCurrentExtent();
    };

    const queryFeaturesInCurrentExtent = async () => {
        if (!layerRef.current || !mapView) return;

        const view = mapView as MapView;

        const layer = layerRef.current;

        const features = await layer.queryFeatures({
            geometry: view.extent,
            spatialRelationship: 'intersects',
            returnGeometry: false,
        });

        // console.log('features in current extent: ', features);

        // get list of object ids of features in current extent
        const objectIds = features.features.map(
            (feature) => feature.attributes.OBJECTID
        );
        // console.log('objectIds in current extent: ', objectIds);

        dispatch(objectIdsOfScenesInCurrentMapExtentUpdated(objectIds));
    };

    useEffect(() => {
        if (!mapView) return;
        updateLayer();
    }, [selectedEvent, mapView]);

    useEffect(() => {
        if (!mapView) return;

        queryFeaturesInCurrentExtent();
    }, [mapCenter, zoom]);

    useEffect(() => {
        if (!mapView) return;

        if (!layerViewRef.current) return;

        if (hoverHighlightRef.current) {
            hoverHighlightRef.current.remove();
        }

        if (objectIdOfHoveredScene) {
            hoverHighlightRef.current = layerViewRef.current.highlight(
                objectIdOfHoveredScene
            );
        }
    }, [objectIdOfHoveredScene]);

    useEffect(() => {
        if (layerRef.current) {
            layerRef.current.visible = visible;
        }
    }, [visible]);

    return null;
};
