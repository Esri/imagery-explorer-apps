/**
 * A raster function information for the image services, including the name, description, help, function type,
 * and a thumbnail of preconfigured raster function templates.
 */
export type RasterFunctionInfo = {
    /**
     * name of the raster function (e.g. `Agriculture with DRA`)
     */
    name: string;
    /**
     * description of raster function (e.g. `Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range adjustment applied on apparent reflectance...`)
     */
    description: string;
    functionType: number;
    /**
     * datauri of the thumbnail image
     */
    thumbnail?: string;
};

type RasterFunctionInfos = {
    rasterFunctionInfos: RasterFunctionInfo[];
};

/**
 * The rasterFunctionInfos resource returns raster function information for the image services,
 * including the name, description, help, function type, and a thumbnail of preconfigured raster function templates.
 *
 * @returns
 *
 * @example
 * usage
 * ```
 * fetchRasterFunctionInfos('https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer')
 * ```
 *
 * returns
 * ```
 * {"rasterFunctionInfos": [
 *   {
 *      name: "Agriculture with DRA",
 *      description: "Bands shortwave IR-1, near-IR, blue (6, 5, 2) with dynamic range...",
 *      functionType: 0,
 *      thumbnail: 'data:image/bmp;base64,Qk3uNwEAAAAA...'
 *   }
 *   //...
 * ]}
 *
 * ```
 *
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/raster-function-infos.htm
 */
export const fetchRasterFunctionInfos = async (
    imageryServiceURL: string
): Promise<RasterFunctionInfos> => {
    try {
        const res = await fetch(
            `${imageryServiceURL}/rasterFunctionInfos?f=json`
        );

        if (!res.ok) {
            throw new Error(
                'failed to fecth raster function info for landsat-2'
            );
        }

        const data = await res.json();

        if (data.error) {
            throw data.error;
        }

        return data as RasterFunctionInfos;
    } catch (err) {
        console.error(err);
    }
};
