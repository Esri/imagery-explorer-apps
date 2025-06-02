import {
    LandcoverClassificationData,
    NLCDLandCoverClassification,
} from '@typing/landcover';
import {
    NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME,
    NLCD_LANDCOVER_IMAGE_SERVICE_URL,
    NLCD_LANDCOVER_RASTER_FUNCTIONS,
} from './config';
import { getRasterAttributeTable } from '../helpers/getRasterAttributeTable';

const RasterFunctionsByClassificationName: Record<
    NLCDLandCoverClassification,
    string
> = {
    'Developed High Intensity':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED_HIGH_DENSITY,
    'Mixed Forest': NLCD_LANDCOVER_RASTER_FUNCTIONS.MIXED_FOREST,
};

/**
 * Map stores pixel data from Raster attribute table using Value as the key
 */
export const nlcdLandcoverClassificationDataMap: Map<
    number,
    LandcoverClassificationData
> = new Map();

/**
 * Fetch Raster Attribute Table of NLCD Land Cover and save the pixel data in a Map
 *
 * https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer/rasterAttributeTable?renderingRule=%7B%22rasterFunction%22%3A%22Saturated%20Cartographic%20and%20Analytic%20Renderer%22%7D&f=json
 */
export const getNLCDLandCoverRasterAttributeTable = async (): Promise<void> => {
    const { features } = await getRasterAttributeTable(
        NLCD_LANDCOVER_IMAGE_SERVICE_URL,
        NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME
    );

    if (!features || !features.length) {
        throw new Error('failed to getRasterAttributeTable');
    }

    for (const feature of features) {
        const { attributes } = feature;

        const { Value, Description, ClassName, Red, Green, Blue } = attributes;

        nlcdLandcoverClassificationDataMap.set(Value, {
            Value,
            Description,
            ClassName: ClassName as NLCDLandCoverClassification,
            Color: [Red, Green, Blue],
            shortName: getLandCoverClassificationShortName(
                ClassName as NLCDLandCoverClassification
            ),
        });
    }
};

export const getNLCDLandCoverClassifications =
    (): LandcoverClassificationData[] => {
        return [...nlcdLandcoverClassificationDataMap.values()];
    };

export const getNLCDLandCoverClassificationByPixelValue = (
    pixelValue: number
): LandcoverClassificationData => {
    return nlcdLandcoverClassificationDataMap.get(pixelValue) || null;
};

export const getDistinctNLCDLandCoverClassificationPixelValues = () => {
    return [...nlcdLandcoverClassificationDataMap.keys()];
};

const getLandCoverClassificationShortName = (
    classification: NLCDLandCoverClassification
) => {
    // const translationKey = LandcoverClassificationShortNames[classification]; //|| classification;

    // return t(translationKey, {
    //     ns: APP_NAME,
    //     defaultValue:
    //         LandcoverClassificationShortNames[classification] || classification,
    // });

    return classification; // For now, just return the classification name directly
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
