import { Point } from 'esri/geometry';
import { getLandsatScenes } from './getLandsatScenes';
import { LandsatScene } from '@typing/imagery-service';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import { QueryLocation } from '@shared/store/Analysis/reducer';

type SampleData = {
    locationId: number;
    rasterId: number;
    resolution: number;
    value: string;
};

type GetProfileDataOptions = {
    queryLocation: {
        longitude: number;
        latitude: number;
    };
    acquisitionMonth: number;
};

export const getProfileData = async ({
    queryLocation,
    acquisitionMonth,
}: GetProfileDataOptions) => {
    const { longitude, latitude } = queryLocation;

    try {
        const landsatScenes = await getLandsatScenes({
            mapPoint: [longitude, latitude],
            acquisitionMonth,
        });

        const landsatScenesToSample = getLandsatScenesToSample(landsatScenes);
        // console.log(landsatScenesToSample);

        const objectIds = landsatScenesToSample
            .map((d) => d.objectId)
            .slice(0, 5);

        const samplesData = await getSamples(queryLocation, objectIds);

        console.log(samplesData);
    } catch (err) {
        console.log(err);
    }
};

export const getSamples = async (
    queryLocation: QueryLocation,
    objectIds: number[]
): Promise<SampleData[]> => {
    const params = new URLSearchParams({
        f: 'json',
        geometry: JSON.stringify({
            x: queryLocation.longitude,
            y: queryLocation.latitude,
            spatialReference: {
                wkid: 4326,
            },
        }),
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

    const samples: SampleData[] = data?.samples || [];

    return samples;
};

/**
 * The input Landsat Scenes contain multiple Scenes that were acquired from the same month and year.
 * This helper function filters the input Landsat Scenes and only keep one Landsat Scene for each month,
 * the selected scenes for a specific month is the one that with least cloud coverage for that month
 *
 * @param scenes landsat scenes
 * @returns LandsatScene[]
 */
const getLandsatScenesToSample = (scenes: LandsatScene[]): LandsatScene[] => {
    const candidates: LandsatScene[] = [scenes[0]];

    for (let i = 1; i < scenes.length; i++) {
        const prevScene = candidates[candidates.length - 1];

        const currentScene = scenes[i];

        // add current scene to candidates if it was acquired from a different year or month
        if (
            prevScene?.acquisitionYear !== currentScene.acquisitionYear ||
            prevScene?.acquisitionMonth !== currentScene.acquisitionMonth
        ) {
            candidates.push(currentScene);
            continue;
        }

        // if two landsat scenes that were acquired within the same year and month
        // we should keep the one with smaller cloud coverage
        if (currentScene.cloudCover < prevScene.cloudCover) {
            candidates.pop();
            candidates.push(currentScene);
        }
    }

    return candidates;
};
