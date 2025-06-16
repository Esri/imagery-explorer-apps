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
import { ar } from 'date-fns/locale';

const RasterFunctionsByClassificationName: Record<
    NLCDLandCoverClassification,
    NLCD_LANDCOVER_RASTER_FUNCTIONS
> = {
    'Open Water': NLCD_LANDCOVER_RASTER_FUNCTIONS.OPEN_WATER,
    'Perennial Snow/Ice': NLCD_LANDCOVER_RASTER_FUNCTIONS.PERENNIAL_ICE_SNOW,
    'Developed Open Space':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED_OPEN_SPACE,
    'Developed Low Intensity':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED_LOW_INTENSITY,
    'Developed Medium Intensity':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED_MEDIUM_INTENSITY,
    'Developed High Intensity':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.DEVELOPED_HIGH_INTENSITY,
    'Barren Land': NLCD_LANDCOVER_RASTER_FUNCTIONS.BARREN_LAND,
    'Deciduous Forest': NLCD_LANDCOVER_RASTER_FUNCTIONS.DECIDUOUS_FOREST,
    'Evergreen Forest': NLCD_LANDCOVER_RASTER_FUNCTIONS.EVERGREEN_FOREST,
    'Mixed Forest': NLCD_LANDCOVER_RASTER_FUNCTIONS.MIXED_FOREST,
    // 'Dwarf Scrub': NLCD_LANDCOVER_RASTER_FUNCTIONS.SHRUB_SCRUB,
    'Shrub/Scrub': NLCD_LANDCOVER_RASTER_FUNCTIONS.SHRUB_SCRUB,
    'Grassland/Herbaceous':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.GRASSLAND_HERBACEOUS,
    // 'Sedge/Herbaceous': NLCD_LANDCOVER_RASTER_FUNCTIONS.GRASSLAND_HERBACEOUS,
    // Lichens: NLCD_LANDCOVER_RASTER_FUNCTIONS.GRASSLAND_HERBACEOUS,
    // Moss: NLCD_LANDCOVER_RASTER_FUNCTIONS.GRASSLAND_HERBACEOUS,
    'Pasture/Hay': NLCD_LANDCOVER_RASTER_FUNCTIONS.PASTURE_HAY,
    'Cultivated Crops': NLCD_LANDCOVER_RASTER_FUNCTIONS.CULTIVATED_CROPS,
    'Woody Wetlands': NLCD_LANDCOVER_RASTER_FUNCTIONS.WOODY_WETLANDS,
    'Emergent Herbaceous Wetlands':
        NLCD_LANDCOVER_RASTER_FUNCTIONS.EMERGENT_HERBACEOUS_WETLANDS,
};

const NLCDLandCoverClassificationShortNames: Record<
    NLCDLandCoverClassification,
    string
> = {
    'Open Water': 'Water',
    'Perennial Snow/Ice': 'Snow',
    'Developed Open Space': 'Dev Open',
    'Developed Low Intensity': 'Dev Low',
    'Developed Medium Intensity': 'Dev Med',
    'Developed High Intensity': 'Dev High',
    'Barren Land': 'Barren',
    'Deciduous Forest': 'Decid',
    'Evergreen Forest': 'Evergrn',
    'Mixed Forest': 'Mixed',
    // 'Dwarf Scrub': 'Dwarf',
    'Shrub/Scrub': 'Shrub',
    'Grassland/Herbaceous': 'Grass',
    // 'Sedge/Herbaceous': 'Sedge',
    // Lichens: 'Lichen',
    // Moss: 'Moss',
    'Pasture/Hay': 'Pasture',
    'Cultivated Crops': 'Crops',
    'Woody Wetlands': 'Wood Wet',
    'Emergent Herbaceous Wetlands': 'Herb Wet',
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

        const { Value, Description, Red, Green, Blue } = attributes;

        const ClassName = attributes.ClassName as NLCDLandCoverClassification;

        if (RasterFunctionsByClassificationName[ClassName] === undefined) {
            continue;
        }

        nlcdLandcoverClassificationDataMap.set(Value, {
            Value,
            Description,
            ClassName,
            Color: [Red, Green, Blue],
            shortName: getLandCoverClassificationShortName(ClassName),
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

    return (
        NLCDLandCoverClassificationShortNames[classification] || classification
    ); // For now, just return the classification name directly
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
