import { IFeature } from '@esri/arcgis-rest-feature-service';
import {
    UrbanAreaLayerServiceURL,
    UrbanAreaLayerFieldNames,
} from '../../components/UrbanAreaLayer/config';
import { IExtent, IPolygon } from '@esri/arcgis-rest-request';

/**
 * Query the geometry of the urban area feature by object ID
 * @param OBJECTID - object ID of the urban area feature
 * @returns geometry of the urban area feature
 */
export const getUrbanAreaGeometry = async (
    OBJECTID: number
): Promise<IPolygon> => {
    const params = new URLSearchParams({
        objectIds: `${OBJECTID}`,
        outFields: UrbanAreaLayerFieldNames.OBJECTID,
        returnGeometry: 'true',
        f: 'json',
    });

    const response = await fetch(
        `${UrbanAreaLayerServiceURL}/query?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Error fetching urban area feature geometry: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(`Error from urban area service: ${data.error.message}`);
    }

    const feature: IFeature = data.features?.[0];

    if (!feature) {
        throw new Error('No feature found for the given urban center ID.');
    }

    return feature.geometry as IPolygon;
};

const mapOfUrbanAreaFeatureExtent: Map<number, IExtent> = new Map();

/**
 * Get
 * @param OBJECTID The object ID of the urban area feature
 * @returns
 */
export const getUrbanAreaFeatureExtent = async (
    OBJECTID: number
): Promise<IExtent> => {
    if (mapOfUrbanAreaFeatureExtent.has(OBJECTID)) {
        return mapOfUrbanAreaFeatureExtent.get(OBJECTID) as IExtent;
    }

    const params = new URLSearchParams({
        objectIds: `${OBJECTID}`,
        outFields: UrbanAreaLayerFieldNames.OBJECTID,
        returnExtentOnly: 'true',
        f: 'json',
    });

    const response = await fetch(
        `${UrbanAreaLayerServiceURL}/query?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Error fetching urban area feature extent: ${response.statusText}`
        );
    }
    const data = await response.json();

    if (data.error) {
        throw new Error(`Error from urban area service: ${data.error.message}`);
    }

    const extent: IExtent = data.extent;

    if (!extent) {
        throw new Error('No extent found for the given urban center ID.');
    }

    mapOfUrbanAreaFeatureExtent.set(OBJECTID, extent);

    return extent;
};
