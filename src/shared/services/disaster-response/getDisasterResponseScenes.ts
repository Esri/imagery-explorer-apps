import { DisasterResponseScene } from '@typing/imagery-service';
import {
    DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
    DisasterResponseImageryServiceField,
} from './config';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';
import { getFeatureByObjectId } from '../helpers/getFeatureById';
import { get } from 'http';
import { getTimeStrInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

const disasterResponseSceneByObjectId = new Map<
    number,
    DisasterResponseScene
>();

export const getFormattedDisasterResponseScenes = (
    features: IFeature[]
): DisasterResponseScene[] => {
    if (!features || features.length === 0) {
        return [];
    }

    const scenes: DisasterResponseScene[] = [];

    for (const feature of features) {
        const { attributes } = feature;

        const eventTimestamp =
            +attributes[DisasterResponseImageryServiceField.DATETIME];

        const eventStartDate =
            +attributes[DisasterResponseImageryServiceField.EVENT_START_DATE];

        /**
         * formatted aquisition date should be like `2023-05-01`
         */
        const formattedAcquisitionDate = getFormatedDateString({
            date: +eventTimestamp,
        }); //format(acquisitionDate, 'yyyy-MM-dd');

        const [acquisitionYear, acquisitionMonth] = formattedAcquisitionDate
            .split('-')
            .map((d) => +d);

        const formattedAcuisitionTime = getTimeStrInUTCTimeZone(
            eventTimestamp,
            true
        );

        const validImageTypes = ['pre-event', 'post-event'];

        const imageType = validImageTypes.includes(
            attributes[DisasterResponseImageryServiceField.IMAGE_TYPE]
        )
            ? attributes[DisasterResponseImageryServiceField.IMAGE_TYPE]
            : 'unknown';

        // 24 hours in milliseconds
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const daysFromEventStart = Math.floor(
            (eventTimestamp - eventStartDate) / millisecondsPerDay
        );

        const scene: DisasterResponseScene = {
            objectId: attributes[DisasterResponseImageryServiceField.OBJECTID],
            provider: attributes[DisasterResponseImageryServiceField.PROVIDER],
            event: attributes[DisasterResponseImageryServiceField.EVENT],
            title: attributes[DisasterResponseImageryServiceField.TITLE],
            description:
                attributes[DisasterResponseImageryServiceField.DESCRIPTION] ||
                '',
            platform: attributes[DisasterResponseImageryServiceField.PLATFORM],
            imageType,
            eventStartDate:
                attributes[
                    DisasterResponseImageryServiceField.EVENT_START_DATE
                ],
            eventTimestamp:
                attributes[DisasterResponseImageryServiceField.DATETIME],
            cloudCover:
                attributes[DisasterResponseImageryServiceField.CLOUDS_PERCENT],
            name: attributes[DisasterResponseImageryServiceField.NAME],
            formattedAcquisitionDate,
            acquisitionDate: eventTimestamp,
            acquisitionYear,
            acquisitionMonth,
            formattedAcuisitionTime,
            daysFromEventStart,
        };

        scenes.push(scene);
    }

    return scenes;
};

export const getDisasterResponseScenes = async ({
    eventName,
    signal,
}: {
    eventName: string;
    signal?: AbortSignal;
}): Promise<DisasterResponseScene[]> => {
    if (!eventName) {
        return [];
    }

    const whereClauses = [
        `(${DisasterResponseImageryServiceField.CATEGORY} = 1)`,
    ];

    whereClauses.push(
        `${DisasterResponseImageryServiceField.EVENT} = '${eventName}'`
    );

    const params = new URLSearchParams({
        f: 'json',
        spatialRel: 'esriSpatialRelIntersects',
        // geometryType: 'esriGeometryEnvelope',
        geometryType: 'esriGeometryPoint',
        // inSR: '102100',
        outFields: [
            DisasterResponseImageryServiceField.OBJECTID,
            DisasterResponseImageryServiceField.PROVIDER,
            DisasterResponseImageryServiceField.EVENT,
            DisasterResponseImageryServiceField.TITLE,
            // DisasterResponseImageryServiceField.DESCRIPTION,
            DisasterResponseImageryServiceField.PLATFORM,
            DisasterResponseImageryServiceField.IMAGE_TYPE,
            DisasterResponseImageryServiceField.EVENT_START_DATE,
            DisasterResponseImageryServiceField.DATETIME,
            DisasterResponseImageryServiceField.CLOUDS_PERCENT,
            DisasterResponseImageryServiceField.NAME,
        ].join(','),
        orderByFields: DisasterResponseImageryServiceField.DATETIME,
        sortOrder: 'ASC',
        resultOffset: '0',
        returnGeometry: 'false',
        resultRecordCount: '1000',
        where: whereClauses.join(` AND `),
    });

    // console.log(
    //     'querying disaster response scenes with params: ',
    //     params.toString()
    // );

    const res = await fetch(
        `${DISASTER_RESPONSE_IMAGERY_SERVICE_URL}/query?${params.toString()}`,
        {
            signal,
        }
    );

    if (!res.ok) {
        throw new Error('failed to query disaster response scenes');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    const scens: DisasterResponseScene[] = getFormattedDisasterResponseScenes(
        data?.features || []
    );

    // save the landsat scenes to `landsatSceneByObjectId` map
    for (const scene of scens) {
        disasterResponseSceneByObjectId.set(scene.objectId, scene);
    }

    return scens;
};

/**
 * Query Disaster Response Scene by objectId.
 * @param objectId The unique identifier of the feature
 * @returns DisasterResponseScene or null if the feature with the given objectId does not exist
 */
export const getDisasterResponseSceneByObjectId = async (
    objectId: number
): Promise<DisasterResponseScene> => {
    // Check if the landsat scene already exists in the cache
    if (disasterResponseSceneByObjectId.has(objectId)) {
        return disasterResponseSceneByObjectId.get(objectId);
    }

    const feature = await getFeatureByObjectId(
        DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        objectId
    );

    if (!feature) {
        return null;
    }

    const scene = getFormattedDisasterResponseScenes([feature])[0];

    // save the scene to `disasterResponseSceneByObjectId` map for future query
    disasterResponseSceneByObjectId.set(objectId, scene);

    return scene;
};
