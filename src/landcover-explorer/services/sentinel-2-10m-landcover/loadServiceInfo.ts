import { loadRasterAttributeTable } from './rasterAttributeTable';
import { loadTimeInfo } from './timeInfo';

/**
 * Load service information (Raster Attributes, Time Extent and etc) of Sentinel-2-10m-Landcover layer
 */
export const loadServiceInfo = async () => {
    await loadRasterAttributeTable();
    await loadTimeInfo();
};
