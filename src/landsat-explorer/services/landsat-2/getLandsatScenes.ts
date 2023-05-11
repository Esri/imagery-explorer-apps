import { FIELD_NAMES } from './config';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { format } from 'date-fns';

type MapPoint = {
    spatialReference: {
        wkid: number;
    };
    x: number;
    y: number;
};

type GetLandsatScenesParams = {
    year: number;
    cloudCover: number;
    mapPoint: MapPoint;
    month?: number;
};

type LandsatScene = {
    /**
     * acquisitionDate as a string in ISO format (YYYY-MM-DD).
     */
    formattedAcquisitionDate: string;
    /**
     * acquisitionDate in unix timestamp
     */
    acquisitionDate: number;
    name: string;
    cloudCover: number;
    best: number;
};

const { ACQUISITION_DATE, CLOUD_COVER, CATEGORY, NAME, BEST } = FIELD_NAMES;

/**
 * Formats the features from Landsat-level-2 service and returns an array of LandsatScene objects.
 * @param features - An array of IFeature objects from Landsat-level-2 service.
 * @returns An array of LandsatScene objects containing the acquisition date, formatted acquisition date, name, cloud cover, and best attributes.
 */
const getFormattedLandsatScenes = (features: IFeature[]): LandsatScene[] => {
    return features.map((feature) => {
        const { attributes } = feature;

        const acquisitionDate = attributes[ACQUISITION_DATE];

        /**
         * formatted aquisition date should be like `2023-05-01`
         */
        const formattedAcquisitionDate = format(acquisitionDate, 'yyyy-MM-dd');

        return {
            acquisitionDate,
            formattedAcquisitionDate,
            name: attributes[NAME],
            cloudCover: attributes[CLOUD_COVER],
            best: attributes[BEST],
        } as LandsatScene;
    });
};

/**
 * Query the Landsat-level-2 service to find a list of scenes for available Landsat data that
 * intersect with the input map point and were acquired during the input year and month.
 *
 * @param {number} params.year - The year of the desired acquisition dates.
 * @param {number} [params.cloudCover=0.1] - The maximum cloud cover percentage of the desired Landsat data.
 * @param {Object} params.mapPoint - The point geometry to query.
 * @param {number} params.month - The month of the desired acquisition dates.
 *
 * @returns {Promise} A promise that resolves to an array of LandsatAcquisitionDate objects.
 *
 */
export const getLandsatScenes = async ({
    year,
    cloudCover = 0.1,
    mapPoint,
    month,
}: GetLandsatScenesParams): Promise<LandsatScene[]> => {
    const whereClauses = [
        `(${CATEGORY} = 1)`,
        `(${CLOUD_COVER} <= ${cloudCover})`,
    ];

    const params = new URLSearchParams({
        f: 'json',
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryEnvelope',
        inSR: '102100',
        outFields: [ACQUISITION_DATE, CLOUD_COVER, NAME, BEST].join(','),
        orderByFields: ACQUISITION_DATE,
        resultOffset: '0',
        returnGeometry: 'false',
        resultRecordCount: '1000',
        geometry: JSON.stringify(mapPoint),
        where: whereClauses.join(` AND `),
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/query?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error('failed to query Landsat-2 service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return getFormattedLandsatScenes(data?.features || []);
};
