import { FIELD_NAMES } from './config';
import { LANDSAT_LEVEL_2_SERVICE_URL } from '../../config';
import {
    IExtent,
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

    const queryResults: IQueryFeaturesResponse = data;

    const features = queryResults?.features || [];

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
