import type Point from '@arcgis/core/geometry/Point';

type WorldImageryMetadata = {
    provider: string;
    acquisitionDate: number;
    formattedAcquisitionDate: string;
    resolution: number;
    sampleAccuracy: number;
    [key: string]: any; // for any additional metadata properties that may be added in the future
};

type GetWorldImageryMetadataParams = {
    mapPoint: Point;
    mapScale: number;
    abortController: AbortController;
};

import {
    WORLD_IMAGERY_SERVICE_SUB_LAYERS,
    WORLD_IMAGERY_METADATA_FIELDS,
    WORLD_IMAGERY_SERVICE_URL,
} from './config';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';

export const getWorldImageryMetadata = async ({
    mapPoint,
    mapScale,
    abortController,
}: GetWorldImageryMetadataParams): Promise<WorldImageryMetadata> => {
    // find the appropriate sub-layer based on the map scale
    const subLayer =
        WORLD_IMAGERY_SERVICE_SUB_LAYERS.find(
            (layer) => mapScale >= layer.maxScale && mapScale <= layer.minScale
        ) ||
        WORLD_IMAGERY_SERVICE_SUB_LAYERS[
            WORLD_IMAGERY_SERVICE_SUB_LAYERS.length - 1
        ]; // fallback to the last sub-layer if no match is found

    const queryUrl = `${WORLD_IMAGERY_SERVICE_URL}/${subLayer.id}/query`;

    const queryParams = new URLSearchParams({
        where: '1=1',
        geometry: JSON.stringify({
            x: mapPoint.x,
            y: mapPoint.y,
        }),
        inSR: '102100', // Web Mercator spatial reference
        geometryType: 'esriGeometryPoint',
        spatialRel: 'esriSpatialRelIntersects',
        outFields: [
            WORLD_IMAGERY_METADATA_FIELDS.OBJECTID,
            WORLD_IMAGERY_METADATA_FIELDS.SRC_DATE2,
            WORLD_IMAGERY_METADATA_FIELDS.SRC_RES,
            WORLD_IMAGERY_METADATA_FIELDS.SRC_ACC,
            WORLD_IMAGERY_METADATA_FIELDS.NICE_DESC,
        ].join(','),
        returnGeometry: 'false',
        f: 'json',
    });

    const response = await fetch(`${queryUrl}?${queryParams.toString()}`, {
        signal: abortController.signal,
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch World Imagery metadata: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(
            `Error from World Imagery service: ${data.error.message}`
        );
    }

    if (!data.features || data.features.length === 0) {
        throw new Error(
            'No World Imagery metadata found for the given location and scale.'
        );
    }

    const feature = data.features[0];

    const acquisitionDate =
        feature.attributes[WORLD_IMAGERY_METADATA_FIELDS.SRC_DATE2];

    const metadata: WorldImageryMetadata = {
        provider:
            feature.attributes[WORLD_IMAGERY_METADATA_FIELDS.NICE_DESC] ||
            'Unknown',
        acquisitionDate: acquisitionDate || 'Unknown',
        formattedAcquisitionDate: getFormatedDateString({
            date: acquisitionDate,
        }),
        resolution:
            feature.attributes[WORLD_IMAGERY_METADATA_FIELDS.SRC_RES] ||
            'Unknown',
        sampleAccuracy:
            feature.attributes[WORLD_IMAGERY_METADATA_FIELDS.SRC_ACC] ||
            'Unknown',
    };

    return metadata;
};
