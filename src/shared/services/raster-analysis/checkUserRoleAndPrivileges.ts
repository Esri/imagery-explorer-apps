import PortalUser from '@arcgis/core/portal/PortalUser';
import { getPortalBaseUrl, getToken } from '@shared/utils/esri-oauth';
import { getUserLicense } from '../arcgis-online/getUserLicense';

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
export const hasRasterAnalysisPrivileges = async (
    user: PortalUser
): Promise<boolean> => {
    if (!user) {
        return false;
    }

    try {
        const { userLicenseTypeId, availableCredits } = await getUserLicense(
            user.username
        );

        // Check if the user has the GIS Professional Advanced user type and has more than 10 credits
        return (
            userLicenseTypeId === 'GISProfessionalAdvUT' &&
            availableCredits > 10
        );
    } catch (error) {
        console.error(
            'Error checking user privileges for raster analysis',
            error
        );
        return false;
    }
};
