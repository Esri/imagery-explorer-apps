import { SavePanel } from '@shared/components/SavePanel';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import React from 'react';
import {
    TAGS,
    DISASTER_SERVICE_DESCRIPTION,
    DISASTER_SERVICE_ACCESS_INFOMRATION,
    DISASTER_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE,
    DISASTER_SERVICE_LICENSE_INFO_WEB_MAP,
} from './config';
import { getToken } from '@shared/utils/esri-oauth';
import { useClippingGeometry } from '@shared/components/SavePanel/useClippingGeometry';
import { usePublishSceneRasterFunction } from '@shared/components/SavePanel/usePublishSceneRasterFunction';
import { useDownloadAndPublishOptions } from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import { useSceneIds } from '@shared/components/SavePanel/useSceneIds';
import { getDisasterResponseSceneByObjectId } from '@shared/services/disaster-response/getDisasterResponseScenes';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';

export const DisasterImageryExplorerSavePanel = () => {
    const token = getToken();

    const publishOptions = useDownloadAndPublishOptions();

    // DIEx does not support change detection, so remove that publish option
    const publishOptionsFiltered = publishOptions.filter((d) => {
        return (
            d.saveJobType !== PublishAndDownloadJobType.PublishChangeDetection
        );
    });

    const sceneIds = useSceneIds({
        getSceneByObjectId: getDisasterResponseSceneByObjectId,
    });

    const clippingGeometry = useClippingGeometry(
        DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        true // Set tokenIsNotRequired to true since the disaster response imagery service does not require token for accessing the feature layer to get the geometry for clipping
    );

    const publishSceneRasterFunction = usePublishSceneRasterFunction({
        originalServiceUrl: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        clippingGeometry,
        token,
    });

    return (
        <SavePanel
            originalServiceUrl={DISASTER_RESPONSE_IMAGERY_SERVICE_URL}
            sceneIds={sceneIds}
            publishOptions={publishOptionsFiltered}
            serviceName={'Disaster Imagery'}
            tags={TAGS}
            description={DISASTER_SERVICE_DESCRIPTION}
            accessInformation={DISASTER_SERVICE_ACCESS_INFOMRATION}
            licenseInfo={DISASTER_SERVICE_LICENSE_INFO_WEB_MAP}
            licenseInfoForHostedImageryService={
                DISASTER_SERVICE_LICENSE_INFO_HOSTED_IMAGERY_SERVICE
            }
            publishSceneRasterFunction={publishSceneRasterFunction}
        />
    );
};
