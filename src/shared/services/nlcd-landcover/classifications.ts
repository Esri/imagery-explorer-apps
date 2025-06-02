import {
    LandcoverClassificationData,
    NLCDLandCoverClassification,
} from '@typing/landcover';
import {
    NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME,
    NLCD_LANDCOVER_RASTER_FUNCTIONS,
} from './config';

const RasterFunctionsByClassificationName: Record<
    NLCDLandCoverClassification,
    string
> = {
    Developed: NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED,
    Forest: NLCD_LANDCOVER_RASTER_FUNCTIONS.FOREST,
};

/**
 * https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Saturated%20Cartographic%20and%20Analytic%20Renderer%22%7D&f=json
 */
export const getNLCDLandCoverRasterAttributeTable = async (
    renderingRule: string
): Promise<any> => {
    // call helper function to get the raster attribute table
};

export const getNLCDLandCoverClassifications =
    (): LandcoverClassificationData[] => {
        return [
            {
                Value: 0,
                ClassName: 'Developed',
                Description:
                    'Developed Open Space, Developed Low Intensity, Developed Medium Intensity and Developed High Intensity classes only.',
                Color: [255, 0, 0],
                shortName: 'Developed',
            },
            {
                Value: 1,
                ClassName: 'Forest',
                Description:
                    'Only Deciduous Forest, Mixed Forest, and Evergreen Forest classes are displayed.',
                Color: [0, 255, 0],
                shortName: 'Forest',
            },
        ];
    };

/**
 * Retrieves the raster function associated with a given Sentinel-2 land cover classification name.
 *
 * @param name - The land cover classification name (optional).
 * @returns The raster function corresponding to the provided classification name,
 *          or the default 'Cartographic Renderer - Legend and Attribute Table' if not found.
 */
export const getRasterFunctionByNLCDLandCoverClassName = (
    name?: NLCDLandCoverClassification
) => {
    return (
        RasterFunctionsByClassificationName[name] ||
        NLCD_LANDCOVER_RASTER_FUNCTIONS.SATURATED_CARTOGRAPHIC
    );
};
