import { Extent } from '@arcgis/core/geometry';
import { webMercatorToGeographic } from '@arcgis/core/geometry/support/webMercatorUtils';

export type ComputeHistogramsParams = {
    /**
     * URL of the Land Cover Image Service
     */
    serviceUrl: string;
    /**
     * Raster Function to be applied to the image service
     */
    rasterFunction: string;
    /**
     * Map Extent to be used as input geomerty
     */
    extent: Extent;
    /**
     * Map resolution
     */
    resolution: number;
    /**
     * the year that will be used to query land cover data
     */
    year: number;
};

type Histogram = {
    size: number;
    min: number;
    /**
     *
     */
    max: number;
    /**
     * counts of pxiels in each classification
     */
    counts: number[];
};

export type ComputeHistogramsResponse = {
    histograms: Histogram[];
};

/**
 * Computes histograms based on the provided params, the result of this operation contains histograms computed for the given extent.
 *
 * https://developers.arcgis.com/rest/services-reference/enterprise/compute-histograms.htm
 *
 */
export const computeHistograms = async ({
    serviceUrl,
    rasterFunction,
    extent,
    resolution,
    year,
}: ComputeHistogramsParams): Promise<ComputeHistogramsResponse> => {
    // convert the map extent to geographic unit to avoid
    // using the incorrect Web Mercator extent after moving map
    // across the international date line
    extent = webMercatorToGeographic(extent) as Extent;

    const params = new URLSearchParams({
        f: 'json',
        geometryType: 'esriGeometryEnvelope',
        geometry: JSON.stringify(extent),
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicAttribute',
            sortValue: null,
            where: `(Year = ${year})`,
        }),
        // renderingRule: JSON.stringify(DEFAULT_RENDERING_RULE),
        renderingRule: JSON.stringify({
            rasterFunction,
        }),
        pixelSize: JSON.stringify({
            x: resolution,
            y: resolution,
            spatialReference: { latestWkid: 3857, wkid: 102100 },
        }),
    });

    const requestURL = serviceUrl + `/computeHistograms?${params.toString()}`;

    try {
        const res = await fetch(requestURL);

        const data = (await res.json()) as ComputeHistogramsResponse;

        return data;
    } catch (err) {
        console.log(err);
        throw new Error(
            err instanceof Error ? err.message : 'Failed to compute histograms'
        );
    }
};
