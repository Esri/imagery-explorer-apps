import { FIELD_NAMES } from './config';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';
import {
    IExtent,
    IFeature,
    IQueryFeaturesResponse,
} from '@esri/arcgis-rest-feature-service';
import { format } from 'date-fns';

type GetAcquisitionDatesParams = {
    year: number;
    cloudCover: number;
    mapExtent: IExtent;
    month?: number;
};

type LandsatAcquisitionDate = {
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
 * Formats the features from Landsat-level-2 service and returns an array of LandsatAcquisitionDate objects.
 * @param features - An array of IFeature objects from Landsat-level-2 service.
 * @returns An array of LandsatAcquisitionDate objects containing the acquisition date, formatted acquisition date, name, cloud cover, and best attributes.
 */
const getFormattedAcquisitionDates = (
    features: IFeature[]
): LandsatAcquisitionDate[] => {
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
        } as LandsatAcquisitionDate;
    });
};

/**
 * Queries the Landsat-level-2 service to find an array of acquisition dates for available Landsat data that
 * intersect with the input mapExtent and were acquired during the input year and month.
 *
 * @param {number} params.year - The year of the desired acquisition dates.
 * @param {number} [params.cloudCover=0.1] - The maximum cloud cover percentage of the desired Landsat data.
 * @param {Object} params.mapExtent - The extent of the map to query.
 * @param {number} params.month - The month of the desired acquisition dates.
 *
 * @returns {Promise} A promise that resolves to an array of LandsatAcquisitionDate objects.
 *
 */
export const getAcquisitionDates = async ({
    year,
    cloudCover = 0.1,
    mapExtent,
    month,
}: GetAcquisitionDatesParams): Promise<LandsatAcquisitionDate[]> => {
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
        geometry: JSON.stringify(mapExtent),
        where: whereClauses.join(` AND `),
    });

    const res = await fetch(
        `${LANDSAT_LEVEL_2_SERVICE_URL}/query?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error('failed to query AcquisitionDates');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return getFormattedAcquisitionDates(data?.features || []);
};
