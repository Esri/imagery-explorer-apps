import { getPortalBaseUrl, getToken } from '@shared/utils/esri-oauth';

type UserLicenseData = {
    userLicenseTypeId: string;
    availableCredits: number;
};

export const getUserLicense = async (
    userId: string
): Promise<UserLicenseData> => {
    const portalBaseUrl = getPortalBaseUrl();

    const userProfileUrl = `${portalBaseUrl}/sharing/rest/community/users/${userId}`;

    const params = new URLSearchParams({
        f: 'json',
        returnUserLicensedItems: 'true',
        token: getToken(),
    });

    const userProfileRes = await fetch(
        userProfileUrl + '?' + params.toString()
    );

    const userProfileData = await userProfileRes.json();

    return {
        userLicenseTypeId: userProfileData?.userLicenseTypeId || null,
        availableCredits: userProfileData?.availableCredits || 0,
    };
};
