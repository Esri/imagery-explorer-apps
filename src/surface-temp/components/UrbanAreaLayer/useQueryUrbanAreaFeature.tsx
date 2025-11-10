import Point from '@arcgis/core/geometry/Point';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectQueryLocation4UrbanHeatIslandTool } from '@shared/store/UrbanHeatIslandTool/selectors';
import React, { useEffect } from 'react';

import { UrbanAreaLayerFieldNames } from './config';
import { selectedUrbanAreaFeatureChanged } from '@shared/store/UrbanHeatIslandTool/reducer';

const OUT_FIELDS = [
    UrbanAreaLayerFieldNames.OBJECTID,
    UrbanAreaLayerFieldNames.URBAN_CENTER_ALL_NAMES,
    UrbanAreaLayerFieldNames.COUNTRY,
    UrbanAreaLayerFieldNames.URBAN_CENTER_NAME,
    UrbanAreaLayerFieldNames.URBAN_CENTER_ALL_NAMES,
    UrbanAreaLayerFieldNames.URBAN_CENTER_ID,
];

/**
 * This hook queries the urban area feature based on the query location from the store
 * @param featureLayer
 * @returns
 */
export const useQueryUrbanAreaFeature = (featureLayer: FeatureLayer): void => {
    const dispatch = useAppDispatch();

    const queryLocation = useAppSelector(
        selectQueryLocation4UrbanHeatIslandTool
    );

    const queryUrbanHeatIsalandFeature = async (
        layer: FeatureLayer,
        location: Point
    ) => {
        if (!layer || !location) {
            dispatch(selectedUrbanAreaFeatureChanged(null));
            return;
        }
        try {
            const query = layer.createQuery();
            query.geometry = new Point({
                longitude: location.longitude,
                latitude: location.latitude,
            });
            query.spatialRelationship = 'intersects';
            query.returnGeometry = false;
            query.outFields = OUT_FIELDS;
            const result = await layer.queryFeatures(query);
            // console.log('Urban Heat Island Feature Query Result:', result);

            const feature = result.features?.[0];

            if (feature) {
                const attributes = feature.attributes;
                const urbanAreaFeature = {
                    OBJECTID: attributes[UrbanAreaLayerFieldNames.OBJECTID],
                    URBAN_CENTER_ID:
                        attributes[UrbanAreaLayerFieldNames.URBAN_CENTER_ID],
                    NAME: attributes[
                        UrbanAreaLayerFieldNames.URBAN_CENTER_NAME
                    ],
                    ALL_NAMES:
                        attributes[
                            UrbanAreaLayerFieldNames.URBAN_CENTER_ALL_NAMES
                        ],
                    COUNTRY: attributes[UrbanAreaLayerFieldNames.COUNTRY],
                };

                dispatch(selectedUrbanAreaFeatureChanged(urbanAreaFeature));
            } else {
                dispatch(selectedUrbanAreaFeatureChanged(null));
            }
        } catch (error) {
            console.error('Error querying Urban Heat Island feature:', error);
            dispatch(selectedUrbanAreaFeatureChanged(null));
        }
    };

    useEffect(() => {
        queryUrbanHeatIsalandFeature(featureLayer, queryLocation);
    }, [queryLocation, featureLayer]);

    return null;
};
