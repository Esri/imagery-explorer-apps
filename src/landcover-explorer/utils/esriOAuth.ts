import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Portal from '@arcgis/core/portal/Portal';
import Credential from '@arcgis/core/identity/Credential';
import PortalUser from '@arcgis/core/portal/PortalUser';

type Props = {
    appId: string;
    portalUrl?: string;
};

type OAuthResponse = {
    credential: Credential;
    portal: Portal;
};

// type IPlatformSelfResponse = {
//     expires_in: number;
//     token: string;
//     username: string;
// };

let oauthInfo: OAuthInfo;
let esriId: typeof IdentityManager;
/**
 * Instance of ArcGIS Online portal for signed-in user
 */
let userPortal: Portal;
let credential: Credential = null;

/**
 *
 * @param param0
 * @returns
 */
export const initEsriOAuth = async ({
    appId,
    portalUrl = 'https://www.arcgis.com',
}: Props): Promise<OAuthResponse> => {
    try {
        // const platformSelfResponse = await platformSelf(appId, portalUrl);

        oauthInfo = new OAuthInfo({
            appId,
            portalUrl,
            popup: false,
            preserveUrlHash: true,
        });

        esriId = IdentityManager;

        esriId.registerOAuthInfos([oauthInfo]);

        // if (platformSelfResponse) {
        //     const { expires_in, token, username } = platformSelfResponse;

        //     esriId.registerToken({
        //         expires: expires_in,
        //         token: token,
        //         server: portalUrl,
        //         userId: username,
        //         ssl: false,
        //     });
        // }

        credential = await esriId.checkSignInStatus(
            oauthInfo.portalUrl + '/sharing'
        );

        // init Portal instance
        userPortal = new Portal({ url: portalUrl });
        // Setting authMode to immediate signs the user in once loaded
        userPortal.authMode = 'immediate';

        // Once loaded, user is signed in
        await userPortal.load();
    } catch (err) {
        console.log('anomynous user');
    }

    return {
        credential,
        portal: userPortal,
    };
};

export const signIn = async (): Promise<void> => {
    const credential: Credential = await esriId.getCredential(
        oauthInfo.portalUrl + '/sharing'
    );
    console.log('signed in as', credential.userId);
};

export const signOut = async (): Promise<void> => {
    const { appId, portalUrl } = oauthInfo;
    const { token } = credential;

    try {
        // need to call oauth2/signout to clear the encrypted cookie and signs the user out of the ArcGIS platform
        // here to learn more: https://confluencewikidev.esri.com/display/AGO/oAuth+signout
        await fetch(portalUrl + '/sharing/rest/oauth2/signout', {
            method: 'post',
            body: new URLSearchParams({
                client_id: appId,
                token,
            }),
        });
    } catch (err) {
        console.error(err);
    }

    esriId.destroyCredentials();

    window.location.reload();
};

export const getPortalBaseUrl = () => {
    if (!userPortal) {
        return null;
    }

    const { urlKey, url, customBaseUrl } = userPortal;

    return urlKey ? `https://${urlKey}.${customBaseUrl}` : `${url}`;
};

/**
 * call this function to direct to the switch account page on ArcGIS Online
 */
export const switchAccount = () => {
    const portalBaseUrl = getPortalBaseUrl();
    const redirectUri = `${window.location.origin}${window.location.pathname}index.html`;
    const targetUrl = `${portalBaseUrl}/home/pages/Account/manage_accounts.html#redirect_uri=${redirectUri}&client_id=arcgisonline`;
    window.open(targetUrl, '_blank');
};

/**
 * Check and see if user is signed or not
 * @returns boolean return false if not signed in yet
 */
export const isAnonymouns = () => {
    return credential === null;
};

/**
 * Get the Token from the credential of signed in user
 * @returns
 */
export const getToken = () => {
    if (!credential) {
        return '';
    }

    return credential.token;
};

/**
 * Get Portal User instance for signed-in user
 * @returns IPortalUser
 */
export const getSignedInUser = () => {
    return userPortal?.user || null;
};

/**
 * get the id of "My Favorites" group of the signed in user
 */
export const getMyFavoritesGroupId = () => {
    if (!userPortal) {
        return '';
    }

    const user: PortalUser & {
        favGroupId?: string;
    } = userPortal.user;

    return user?.favGroupId;
};

/**
 * Get Portal Instance for signed in user
 * @returns
 */
export const getUserPortal = () => {
    return userPortal;
};

export const signInUsingDifferentAccount = () => {
    esriId.destroyCredentials();
    signIn();
};
