import { TIER } from '@shared/config';

const NLCD_LANDCOVER_IMAGE_SERVICE_URL_DEV =
    'https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer';

const NLCD_LANDCOVER_IMAGE_SERVICE_URL_PROD = '';

export const NLCD_LANDCOVER_IMAGE_SERVICE_URL =
    TIER === 'development'
        ? NLCD_LANDCOVER_IMAGE_SERVICE_URL_DEV
        : NLCD_LANDCOVER_IMAGE_SERVICE_URL_PROD;
