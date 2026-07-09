import type { IFeature } from '@esri/arcgis-rest-feature-service';
import { getFeatureByObjectId } from '../helpers/getFeatureById';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';

export const getObjectIdsOfIntersectingScenes = async (
    objectIdOfSceneToIntersectWith: number
): Promise<number[]> => {
    if (!objectIdOfSceneToIntersectWith) {
        return [];
    }

    const sceneToIntersectWith = await getFeatureByObjectId(
        DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        objectIdOfSceneToIntersectWith
    );

    if (
        !sceneToIntersectWith ||
        !sceneToIntersectWith.geometry ||
        !sceneToIntersectWith.attributes
    ) {
        return [];
    }

    const eventName =
        sceneToIntersectWith?.attributes?.[
            DisasterResponseImageryServiceField.EVENT
        ];

    const params = new URLSearchParams({
        f: 'json',
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPolygon',
        geometry: JSON.stringify(sceneToIntersectWith.geometry),
        outFields: DisasterResponseImageryServiceField.OBJECTID,
        where: `${DisasterResponseImageryServiceField.EVENT} = '${eventName}'`,
        returnGeometry: 'false',
    });

    const res = await fetch(
        `${DISASTER_RESPONSE_IMAGERY_SERVICE_URL}/query?${params.toString()}`
    );
    if (!res.ok) {
        throw new Error(
            `Failed to fetch intersecting scenes: ${res.status} ${res.statusText}`
        );
    }

    const data = await res.json();

    if (data?.error) {
        throw new Error(`Error from service: ${data.error.message}`);
    }

    if (!data?.features || !Array.isArray(data.features)) {
        throw new Error('Invalid response format: features array is missing');
    }

    const intersectingObjectIds: number[] = data.features.map(
        (feature: IFeature) =>
            feature.attributes[DisasterResponseImageryServiceField.OBJECTID]
    );

    return intersectingObjectIds;
};
