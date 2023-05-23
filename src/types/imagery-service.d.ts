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
    /**
     * label of the raster function that will be displayed in UI
     */
    label?: string;
    /**
     * datauri of the thumbnail image
     */
    thumbnail?: string;
};
