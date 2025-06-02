/**
 * Feature from Attribute Table
 */
type RasterAttributeTableFeature = {
    attributes: {
        OBJECTID: number;
        Blue: number;
        Green: number;
        Red: number;
        ClassName: string;
        // Count: number; // "Count" field is no longer included in the Raster Attribute table sicn September 2023.
        Description: string;
        Examples: string;
        PopupText: string;
        UlcPopupText: string;
        Value: number;
    };
};

type RasterAttributeTableResponse = {
    features: RasterAttributeTableFeature[];
};

/**
 * Fetches the raster attribute table from an ArcGIS ImageServer service.
 *
 * The raster attribute table provides a categorical mapping of pixel values (such as class, color, or value)
 * for a raster dataset. This function constructs the appropriate request URL using the provided service URL
 * and rendering rule, then retrieves and parses the attribute table as JSON.
 *
 * @param serviceUrl - The base URL of the ArcGIS ImageServer service.
 * @param renderingRule - The name of the raster function to use for rendering (e.g., "Cartographic Renderer - Legend and Attribute Table").
 * @returns A promise that resolves to the raster attribute table response, containing an array of features with their attributes.
 *
 * @see {@link https://developers.arcgis.com/rest/services-reference/enterprise/raster-attribute-table.htm}
 *
 * @example
 *
 * Get Attribute Table of Sentinel2_10m_LandCover
 * ```js
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Cartographic%20Renderer%20-%20Legend%20and%20Attribute%20Table%22%7D&f=json
 * ```
 *
 * Returns
 * ```js
 * {
 *   features: [
 *     ...
 *      {
 *           OBJECTID: 3,
 *           Value: 2,
 *           Count: 292251633,
 *           ClassName: "Trees",
 *           Red: 53,
 *           Green: 130,
 *           Blue: 33,
 *           UlcPopupText: "Trees",
 *           PopupText: "trees",
 *           Description: "Any significant clustering of tall (~15-m or higher) dense vegetation...",
 *           Examples: "Wooded vegetation,  clusters of dense tall vegetation within savannas..."
 *       }
 *   ]
 * }
 * ```
 *
 */
export const getRasterAttributeTable = async (
    serviceUrl: string,
    renderingRule: string
) => {
    const params = new URLSearchParams({
        renderingRule: JSON.stringify({
            rasterFunction: renderingRule,
        }),
        f: 'json',
    });

    const requestURL =
        serviceUrl + `/rasterAttributeTable?${params.toString()}`;

    const res = await fetch(requestURL);

    const data = (await res.json()) as RasterAttributeTableResponse;

    return data;
};
