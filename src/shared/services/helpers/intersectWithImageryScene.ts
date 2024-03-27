import { Point } from '@arcgis/core/geometry';

export type IntersectWithImagerySceneParams = {
    serviceUrl: string;
    objectId: number;
    point: Point;

    abortController?: AbortController;
};

/**
 * Check if the input point intersects with a Imagery scene specified by the input object ID.
 * @param point Point geometry representing the location to check for intersection.
 * @param objectId Object ID of the imagery scene to check intersection with.
 * @returns {boolean} Returns true if the input point intersects with the specified Imagery scene, otherwise false.
 */
export const intersectWithImageryScene = async ({
    serviceUrl,
    objectId,
    point,
    abortController,
}: IntersectWithImagerySceneParams): Promise<boolean> => {
    const geometry = JSON.stringify({
        spatialReference: {
            wkid: 4326,
        },
        x: point.longitude,
        y: point.latitude,
    });

    const queryParams = new URLSearchParams({
        f: 'json',
        returnCountOnly: 'true',
        returnGeometry: 'false',
        objectIds: objectId.toString(),
        geometry,
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPoint',
    });

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`, {
        signal: abortController.signal,
    });

    if (!res.ok) {
        throw new Error('failed to query service' + serviceUrl);
    }

    const data = await res.json();

    return data?.count && data?.count > 0;
};
