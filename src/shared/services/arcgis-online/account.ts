import { getSignedInUser, isAnonymouns } from '@shared/utils/esri-oauth';

/**
 * ArcGIS Online account type
 */
type AccountType = 'public' | 'organizational' | null;

/**
 * Get the account type of signed-in user
 * @returns {AccountType} 'public' | 'organizational' | null
 *
 * @see https://community.esri.com/t5/arcgis-online-public-account-community/arcgis-online-public-accounts-getting-started/ba-p/1305110
 * @see https://doc.arcgis.com/en/arcgis-online/reference/faq.htm#anchor34
 */
export const getAccountType = (): AccountType => {
    if (isAnonymouns()) {
        return null;
    }

    const user = getSignedInUser();

    return user?.orgId ? 'organizational' : 'public';
};

/**
 * Check if the signed-in user has the privilege to create items in ArcGIS Online.
 * @returns {boolean} True if the user has the privilege to create items, false otherwise.
 */
/**
 * Check if user can create and publish content on ArcGIS Online
 * If the user is an admin or publisher, they can publish content
 * If the user has the createItem privilege, they can publish content
 * If the user is a public account (orgId is null), they can publish content
 *
 * @returns {boolean} indicating if the user can publish content
 *
 * @see https://community.esri.com/t5/arcgis-online-public-account-community/arcgis-online-public-accounts-getting-started/ba-p/1305110
 */
export const checkCanCreateItem = (): boolean => {
    if (isAnonymouns()) {
        return false;
    }

    const user = getSignedInUser();

    if (!user) {
        return false;
    }

    const { role, privileges, orgId } = user || {};

    // return user.role === 'org_admin' || user.role === 'org_publisher';

    const output =
        role === 'org_admin' ||
        role === 'org_publisher' ||
        (privileges && privileges.some((p) => p.endsWith('createItem'))) ||
        orgId === null ||
        orgId === undefined; // for public account, orgId is null

    return output;
};
