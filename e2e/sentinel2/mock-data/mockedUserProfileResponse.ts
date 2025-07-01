/**
 * Represents a mocked user profile response object for testing purposes.
 * Simulates the structure of a user profile response from the ArcGIS API,
 * including user details, privileges, licenses, and group memberships.
 *
 * @remarks
 * This mock data is useful for unit and integration tests that require
 * user profile information, including license entitlements and group access.
 *
 * @see {@link https://www.arcgis.com/sharing/rest/community/users/mokced_user?f=json&returnUserLicensedItems=true}
 *
 */
export const mockedUserProfileResponseWithLicenseInfo = {
    "username": "mokced_user",
    "udn": null,
    "id": "mockedUserId12345",
    "fullName": "mokced full name",
    "availableCredits": 1.4562242E7,
    "assignedCredits": -1.0,
    "categories": [
        "/Categories/West Coast"
    ],
    "emailStatus": "verified",
    "emailStatusDate": 1727913908000,
    "firstName": "mocked first name",
    "lastName": "mocked last name",
    "preferredView": null,
    "description": "mokked description",
    "email": "mockedUser@mocked.com",
    "userType": "arcgisonly",
    "idpUsername": null,
    "favGroupId": "mockedFavGroupId12345",
    "lastLogin": 1751400960000,
    "mfaEnabled": false,
    "mfaEnforcementExempt": false,
    "storageUsage": 12369055688599,
    "storageQuota": 2199023255552,
    "orgId": "mockedOrgId12345",
    "role": "org_publisher",
    "privileges": [
        "features:user:edit",
        "features:user:editIndoorsSpaces",
        "portal:publisher:bulkPublishFromDataStores",
        "portal:publisher:createDataPipelines",
        "portal:publisher:publishDynamicImagery",
        "portal:publisher:publishFeatures",
        "portal:publisher:publishKnowledgeGraph",
        "portal:publisher:publishLivestreamVideo",
        "portal:publisher:publishScenes",
        "portal:publisher:publishServerServices",
        "portal:publisher:publishTiledImagery",
        "portal:publisher:publishTiles",
        "portal:publisher:publishVideo",
        "portal:publisher:registerDataStores",
        "portal:user:addExternalMembersToGroup",
        "portal:user:categorizeItems",
        "portal:user:createGroup",
        "portal:user:createItem",
        "portal:user:joinGroup",
        "portal:user:joinNonOrgGroup",
        "portal:user:shareGroupToOrg",
        "portal:user:shareGroupToPublic",
        "portal:user:shareToGroup",
        "portal:user:shareToOrg",
        "portal:user:shareToPublic",
        "portal:user:viewHostedFeatureServices",
        "portal:user:viewHostedTileServices",
        "portal:user:viewOrgGroups",
        "portal:user:viewOrgItems",
        "portal:user:viewOrgUsers",
        "premium:publisher:rasteranalysis",
        "premium:user:basemaps",
        "premium:user:boundaries",
        "premium:user:demographics",
        "premium:user:elevation",
        "premium:user:featurereport",
        "premium:user:geocode",
        "premium:user:geocode:stored",
        "premium:user:geocode:temporary",
        "premium:user:geoenrichment",
        "premium:user:geometry",
        "premium:user:networkanalysis",
        "premium:user:networkanalysis:closestfacility",
        "premium:user:networkanalysis:lastmiledelivery",
        "premium:user:networkanalysis:locationallocation",
        "premium:user:networkanalysis:optimizedrouting",
        "premium:user:networkanalysis:origindestinationcostmatrix",
        "premium:user:networkanalysis:routing",
        "premium:user:networkanalysis:servicearea",
        "premium:user:networkanalysis:snaptoroads",
        "premium:user:networkanalysis:vehiclerouting",
        "premium:user:places",
        "premium:user:spatialanalysis",
        "premium:user:staticMaps",
        "premium:user:staticbasemaptiles"
    ],
    "level": "2",
    "userLicenseTypeId": "GISProfessionalAdvUT",
    "disabled": false,
    "userLicensedItems": [
        {
            "itemId": "567a3c4dfad0456ea44552b7f6c99a93",
            "entitlements": [
                "webappbuilder"
            ]
        },
        {
            "itemId": "75b4cbafc8f64114b45d280e0bf35bf5",
            "entitlements": [
                "rasteranalysis"
            ]
        },
    ],
    "tags": [],
    "culture": "en-US",
    "cultureFormat": "us",
    "region": "WO",
    "units": "english",
    "thumbnail": "blob.png",
    "access": "public",
    "created": 1727913753000,
    "modified": 1743100960000,
    "provider": "arcgis",
    "groups": [
        {
            "id": "12345",
            "title": "Analysis Team",
            "isInvitationOnly": false,
            "owner": "analysis_devtesting",
            "description": null,
            "snippet": "A group to manage analysis testing harness data",
            "tags": [
                "GeoAnalytics",
                "testing",
                "test data"
            ],
            "typeKeywords": [],
            "phone": null,
            "sortField": "avgRating",
            "sortOrder": "desc",
            "isViewOnly": false,
            "featuredItemsId": null,
            "thumbnail": null,
            "created": 1747329323000,
            "modified": 1747329324000,
            "access": "org",
            "capabilities": [],
            "isFav": false,
            "isReadOnly": false,
            "protected": false,
            "autoJoin": false,
            "notificationsEnabled": false,
            "provider": null,
            "providerGroupName": null,
            "leavingDisallowed": false,
            "hiddenMembers": false,
            "displaySettings": {
                "itemTypes": ""
            },
            "properties": null,
            "userMembership": {
                "username": "mocked_user",
                "memberType": "member"
            }
        }
    ]
}
