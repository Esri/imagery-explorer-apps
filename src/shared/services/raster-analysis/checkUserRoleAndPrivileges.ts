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
 * The user must have the GIS Professional Advanced user type and more than 2 credits
 * @param user the ArcGIS Online potal user object
 * @returns {boolean} indicating if the user can use raster analysis
 */
export const hasRasterAnalysisPrivileges = (
    userLicenseTypeId: string
): boolean => {
    if (!userLicenseTypeId) {
        return false;
    }

    // Check if the user has the GIS Professional or above user type
    // @see https://developers.arcgis.com/rest/enterprise-administration/portal/create-user/
    const isProfessionalUser =
        userLicenseTypeId === 'GISProfessionalStdUT' ||
        userLicenseTypeId === 'GISProfessionalAdvUT';

    // Check if the user has the GIS Professional or above user type
    return isProfessionalUser;
};
