import PortalUser from '@arcgis/core/portal/PortalUser';

/**
 * Check if the user has the privileges to publish content
 * @param user  The ArcGIS Online potal user object
 * @returns {boolean} indicating if the user can publish content
 */
export const canPublishContent = (user: PortalUser): boolean => {
    if (!user) {
        return false;
    }

    return user.role === 'org_admin' || user.role === 'org_publisher';
};

/**
 * Check if the user has the privileges to use raster analysis
 * @param user the ArcGIS Online potal user object
 * @returns {boolean} indicating if the user can use raster analysis
 */
export const canUseRasterAnalysis = (user: PortalUser): boolean => {
    if (!user || !user.privileges) {
        return false;
    }

    return user.privileges.includes('premium:publisher:rasteranalysis');
};
