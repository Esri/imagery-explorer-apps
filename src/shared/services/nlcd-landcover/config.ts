import { TIER } from '@shared/config';

/**
 * The item ID of the NLCD Land Cover layer.
 * @see https://arcgis-content.maps.arcgis.com/home/item.html?id=3ccf118ed80748909eb85c6d262b426f
 */
export const NLCD_LANDCOVER_ITEM_ID = '3ccf118ed80748909eb85c6d262b426f';

const NLCD_LANDCOVER_IMAGE_SERVICE_URL_DEV =
    'https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer';

const NLCD_LANDCOVER_IMAGE_SERVICE_URL_PROD = '';

export const NLCD_LANDCOVER_IMAGE_SERVICE_URL =
    TIER === 'development'
        ? NLCD_LANDCOVER_IMAGE_SERVICE_URL_DEV
        : NLCD_LANDCOVER_IMAGE_SERVICE_URL_PROD;

export enum NLCD_LANDCOVER_RASTER_FUNCTIONS {
    'MIXED_FOREST' = 'Isolate Forested Areas for Visualization and Analysis',
    SATURATED_CARTOGRAPHIC = 'Saturated Cartographic Renderer for Visualization and Analysis',
    'OPEN_WATER' = 'Isolate Open Water Areas for Visualization and Analysis',
    'PERENNIAL_ICE_SNOW' = 'Isolate Perennial Ice and Snow Areas for Visualization and Analysis',
    'DEVELOPED_OPEN_SPACE' = 'Isolate Developed Open Space Areas for Visualization and Analysis',
    'DEVELOPED_LOW_INTENSITY' = 'Isolate Developed Low Intensity Areas for Visualization and Analysis',
    'DEVELOPED_MEDIUM_INTENSITY' = 'Isolate Developed Medium Intensity Areas for Visualization and Analysis',
    'DEVELOPED_HIGH_INTENSITY' = 'Isolate Developed High Intensity Areas for Visualization and Analysis',
    'BARREN_LAND' = 'Isolate Barren Land Areas for Visualization and Analysis',
    'DECIDUOUS_FOREST' = 'Isolate Deciduous Forest Areas for Visualization and Analysis',
    'EVERGREEN_FOREST' = 'Isolate Evergreen Forest Areas for Visualization and Analysis',
    'MIXED_FOREST_AREAS' = 'Isolate Mixed Forest Areas for Visualization and Analysis',
    'SHRUB_SCRUB' = 'Isolate Shrub or Scrub Areas for Visualization and Analysis',
    'GRASSLAND_HERBACEOUS' = 'Isolate Grassland or Herbaceous Areas for Visualization and Analysis',
    'PASTURE_HAY' = 'Isolate Pasture or Hay Areas for Visualization and Analysis',
    'CULTIVATED_CROPS' = 'Isolate Cultivated Crops Areas for Visualization and Analysis',
    'WOODY_WETLANDS' = 'Isolate Woody Wetlands Areas for Visualization and Analysis',
    'EMERGENT_HERBACEOUS_WETLANDS' = 'Isolate Emergent Herbaceous Wetlands Areas for Visualization and Analysis',
}

export const NLCD_LANDCOVER_IMAGE_SERVICE_DEFAULT_RASTER_FUNCTION_NAME =
    NLCD_LANDCOVER_RASTER_FUNCTIONS.SATURATED_CARTOGRAPHIC;

export const NLCD_LANDCOVER_START_TIME_FIELD = 'Year';
