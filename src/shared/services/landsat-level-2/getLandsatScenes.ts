import { FIELD_NAMES } from './config';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import { IExtent, IFeature } from '@esri/arcgis-rest-feature-service';
import { parseLandsatInfo } from './helpers';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';
import { LandsatScene } from '@typing/imagery-service';
import { DateRange } from '@typing/shared';

type GetLandsatScenesParams = {
    /**
     * longitude and latitude (e.g. [-105, 40])
     */
    mapPoint: number[];
    // /**
    //  * acquisition year
    //  */
    // acquisitionYear?: number;
    /**
     * acquisition date range.
     *
     * @example
     * ```
     * {
     *   startDate: '2023-01-01',
     *   endDate: '2023-12-31'
     * }
     * ```
     */
    acquisitionDateRange?: DateRange;
    /**
     * acquisition month
     */
    acquisitionMonth?: number;
    /**
     * acquisition date in formate of `YYYY-MM-DD` (e.g. `2023-05-26`)
     */
    acquisitionDate?: string;
    /**
     * array of landsat missions to be excluded from the query
     */
    missionsToBeExcluded?: number[];
    /**
     * abortController that will be used to cancel the unfinished requests
     */
    abortController: AbortController;
};

// let controller:AbortController = null;

const {
    OBJECTID,
    ACQUISITION_DATE,
    CLOUD_COVER,
    CATEGORY,
    NAME,
    BEST,
    SENSORNAME,
    WRS_PATH,
    WRS_ROW,
    LANDSAT_PRODUCT_ID,
    MONTH,
    SUNAZIMUTH,
    SUNELEVATION,
    DATASET_ID,
} = FIELD_NAMES;

/**
 * A Map that will be used to retrieve Landsat Scene data using the object Id as key
 */
const landsatSceneByObjectId: Map<number, LandsatScene> = new Map();

/**
 * Formats the features from Landsat-level-2 service and returns an array of LandsatScene objects.
 * @param features - An array of IFeature objects from Landsat-level-2 service.
 * @returns An array of LandsatScene objects containing the acquisition date, formatted acquisition date, name, cloud cover, and best attributes.
 */
export const getFormattedLandsatScenes = (
    features: IFeature[]
): LandsatScene[] => {
    return features.map((feature) => {
        const { attributes } = feature;

        const acquisitionDate = attributes[ACQUISITION_DATE];

        // const productId = attributes[LANDSAT_PRODUCT_ID];

        const name = attributes[NAME];

        /**
         * formatted aquisition date should be like `2023-05-01`
         */
        const formattedAcquisitionDate = getFormatedDateString({
            date: +acquisitionDate,
        }); //format(acquisitionDate, 'yyyy-MM-dd');

        const [acquisitionYear, acquisitionMonth] = formattedAcquisitionDate
            .split('-')
            .map((d) => +d);

        const {
            // collectionCategory,
            // collectionNumber,
            correctionLevel,
            processingDate,
            sensor,
        } = parseLandsatInfo(name);

        const landsatScene: LandsatScene = {
            objectId: attributes[OBJECTID],
            // productId,
            acquisitionDate,
            formattedAcquisitionDate,
            name: attributes[NAME],
            cloudCover: attributes[CLOUD_COVER],
            formattedCloudCover: attributes[CLOUD_COVER]
                ? Math.ceil(attributes[CLOUD_COVER] * 100)
                : 0,
            // best: attributes[BEST],
            // isCloudy: attributes[CLOUD_COVER] > CLOUDY_THRESHOLD,
            satellite: `Landsat ${parseInt(name.slice(2, 4))}`,
            row: attributes[WRS_ROW],
            path: attributes[WRS_PATH],
            // category: attributes[CATEGORY],
            // collectionCategory,
            // collectionNumber,
            correctionLevel,
            processingDate,
            sensor,
            acquisitionYear,
            acquisitionMonth,
            sunAzimuth: attributes[SUNAZIMUTH],
            sunElevation: attributes[SUNELEVATION],
        };

        return landsatScene;
    });
};

/**
 * Query the Landsat-level-2 imagery service to find a list of scenes for available Landsat data that
 * intersect with the input map point or map extent and were acquired during the input year and month.
 *
 * @param {number} params.year - The year of the desired acquisition dates.
 * @param {Object} params.mapPoint - The point geometry to query.
 *
 * @returns {Promise} A promise that resolves to an array of LandsatScene objects.
 *
 */
export const getLandsatScenes = async ({
    mapPoint,
    // acquisitionYear,
    acquisitionDateRange,
    acquisitionMonth,
    acquisitionDate,
    missionsToBeExcluded,
    abortController,
}: GetLandsatScenesParams): Promise<LandsatScene[]> => {
    // if (!acquisitionYear && !formattedAcquisitionDate) {
    //     throw new Error(
    //         `acquisitionYear or acquisitionDate is required to query Landsat Scenes`
    //     );
    // }

    const whereClauses = [`(${CATEGORY} = 1)`];

    if (acquisitionDateRange) {
        whereClauses.push(
            `(${ACQUISITION_DATE} BETWEEN timestamp '${acquisitionDateRange.startDate} 00:00:00' AND timestamp '${acquisitionDateRange.endDate} 23:59:59')`
        );
    } else if (acquisitionDate) {
        // if acquisitionDate is provided, only query scenes that are acquired on this date,
        // otherwise, query scenes that were acquired within the acquisitionYear year
        whereClauses.push(
            `(${ACQUISITION_DATE} BETWEEN timestamp '${acquisitionDate} 00:00:00' AND timestamp '${acquisitionDate} 23:59:59')`
        );
    }

    if (acquisitionMonth) {
        whereClauses.push(`(${MONTH} = ${acquisitionMonth})`);
    }

    if (missionsToBeExcluded && missionsToBeExcluded.length) {
        const missionNames = missionsToBeExcluded.map(
            (mission) => `'Landsat${mission}'`
        );
        whereClauses.push(
            `(${DATASET_ID} NOT IN (${missionNames.join(', ')}))`
        );
    }

    const [longitude, latitude] = mapPoint;

    const geometry = JSON.stringify({
        spatialReference: {
            wkid: 4326,
        },
        x: longitude,
        y: latitude,
    });

    const params = new URLSearchParams({
        f: 'json',
        spatialRel: 'esriSpatialRelIntersects',
        // geometryType: 'esriGeometryEnvelope',
        geometryType: 'esriGeometryPoint',
        // inSR: '102100',
        outFields: [
            ACQUISITION_DATE,
            CLOUD_COVER,
            NAME,
            BEST,
            SENSORNAME,
            WRS_PATH,
            WRS_ROW,
            CATEGORY,
            LANDSAT_PRODUCT_ID,
            SUNAZIMUTH,
            SUNELEVATION,
        ].join(','),
        orderByFields: ACQUISITION_DATE,
        resultOffset: '0',
        returnGeometry: 'false',
        resultRecordCount: '1000',
        geometry,
        where: whereClauses.join(` AND `),
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/query?${params.toString()}`,
        {
            signal: abortController.signal,
        }
    );

    if (!res.ok) {
        throw new Error('failed to query Landsat-2 service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    const landsatScenes: LandsatScene[] = getFormattedLandsatScenes(
        data?.features || []
    );

    // save the landsat scenes to `landsatSceneByObjectId` map
    for (const landsatScene of landsatScenes) {
        landsatSceneByObjectId.set(landsatScene.objectId, landsatScene);
    }

    return landsatScenes;
};

/**
 * Query a feature from Landsat-Level-2 service using the input object Id,
 * and return the feature as formatted Landsat Scene.
 * @param objectId The unique identifier of the feature
 * @returns LandsatScene The formatted Landsat Scene corresponding to the objectId
 */
export const getLandsatSceneByObjectId = async (
    objectId: number
): Promise<LandsatScene> => {
    // Check if the landsat scene already exists in the cache
    if (landsatSceneByObjectId.has(objectId)) {
        return landsatSceneByObjectId.get(objectId);
    }

    const feature = await getLandsatFeatureByObjectId(objectId);

    return getFormattedLandsatScenes([feature])[0];
};

export const getLandsatFeatureByObjectId = async (
    objectId: number
): Promise<IFeature> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnGeometry: 'true',
        objectIds: objectId.toString(),
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/query?${queryParams.toString()}`
    );

    if (!res.ok) {
        throw new Error('failed to query Landsat-2 service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.features || !data.features.length) {
        return null;
    }

    return data?.features[0] as IFeature;
};

/**
 * Get the extent of a feature from Landsat-Level-2 service using the object Id as key.
 * @param objectId The unique identifier of the feature
 * @returns IExtent The extent of the feature from Landsat-Level-2 service
 */
export const getExtentOfLandsatSceneByObjectId = async (
    objectId: number
): Promise<IExtent> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnExtentOnly: 'true',
        objectIds: objectId.toString(),
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/query?${queryParams.toString()}`
    );

    if (!res.ok) {
        throw new Error('failed to query Landsat-2 service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.extent) {
        return null;
    }

    return data?.extent as IExtent;
};
