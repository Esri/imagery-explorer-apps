import Polygon from '@arcgis/core/geometry/Polygon';
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import { getEventFootprints } from '@shared/services/disaster-response/getEventFootprints';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedEventName } from '@shared/store/DisasterResponse/selectors';
import React, { FC, useEffect, useRef } from 'react';

type Props = {
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const DisasterResponseFootprintsLayer: FC<Props> = ({
    mapView,
    groupLayer,
}) => {
    const layerRef = useRef<FeatureLayer>(null);

    const selectedEvent = useAppSelector(selectSelectedEventName);

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
                attributes: feature.attributes,
            });
        });
        console.log('graphics: ', graphics);

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
                        color: [191, 238, 254, 1],
                        width: 1,
                    },
                },
            },
            effect: 'drop-shadow(0px 0px 5px #000)',
        });

        groupLayer.add(layerRef.current, 0);
    };

    useEffect(() => {
        if (!mapView) return;

        updateLayer();
    }, [selectedEvent, mapView]);

    return null;
};
