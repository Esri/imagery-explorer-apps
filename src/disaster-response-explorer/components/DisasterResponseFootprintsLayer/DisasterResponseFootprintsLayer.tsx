import Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import { DisasterResponseImageryServiceField } from '@shared/services/disaster-response/config';
import { getEventFootprints } from '@shared/services/disaster-response/getEventFootprints';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { objectIdsOfScenesInCurrentMapExtentUpdated } from '@shared/store/DisasterResponse/reducer';
import { selectSelectedEventName } from '@shared/store/DisasterResponse/selectors';
import {
    selectMapCenter,
    selectMapExtent,
    selectMapZoom,
} from '@shared/store/Map/selectors';
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

    const selectedEvent = useAppSelector(selectSelectedEventName);

    const mapCenter = useAppSelector(selectMapCenter);

    const zoom = useAppSelector(selectMapZoom);

    // load the footprints for the selected event and add them to the map
    const updateLayer = async () => {
        if (layerRef.current) {
            groupLayer.remove(layerRef.current);
        }

        if (!selectedEvent) return;

        const features = await getEventFootprints(selectedEvent);

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
            effect: 'drop-shadow(0px 0px 5px #000)',
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
        console.log('objectIds in current extent: ', objectIds);

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

    return null;
};
