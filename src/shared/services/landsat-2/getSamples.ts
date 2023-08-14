import { Point } from 'esri/geometry';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';

export type LandsatSampleData = {
    locationId: number;
    /**
     * object id of the landsat imagery scene
     */
    rasterId: number;
    resolution: number;
    /**
     * comma separated band values returned by the server
     */
    value: string;
    /**
     * array of band values
     */
    values: number[];
};

export const getSamples = async (
    queryLocation: Point,
    objectIds: number[]
): Promise<LandsatSampleData[]> => {
    // const { x, y, spatialReference } = queryLocation;

    const params = new URLSearchParams({
        f: 'json',
        geometry: JSON.stringify(queryLocation),
        geometryType: 'esriGeometryPoint',
        mosaicRule: JSON.stringify({
            mosaicMethod: 'esriMosaicLockRaster',
            ascending: true,
            mosaicOperation: 'MT_FIRST',
            lockRasterIds: objectIds,
            method: 'esriMosaicLockRaster',
            operation: 'MT_FIRST',
            multidimensionalDefinition: [],
        }),
        returnFirstValueOnly: 'false',
        returnGeometry: 'false',
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/getSamples?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error('failed to get samples');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    const samples: LandsatSampleData[] = data?.samples || [];

    samples.map((d) => {
        return {
            ...d,
            values: d.value.split(' ').map((d) => +d),
        };
    });

    return samples;
};
