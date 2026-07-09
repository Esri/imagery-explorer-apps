import type Point from '@arcgis/core/geometry/Point';
import { APP_NAME } from '@shared/config';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getFormattedDisasterResponseScenes } from '@shared/services/disaster-response/getDisasterResponseScenes';
import { identify } from '@shared/services/helpers/identify';
import { getWorldImageryMetadata } from '@shared/services/world-imagery/getWorldImageryMetadata';
import { t } from 'i18next';

type GetPopupContent4SelectedSceneParams = {
    objectId: number;
    mapPoint: Point;
    resolution: number;
    abortController: AbortController;
};

type GetPopupContent4SelectedSceneReturnType = {
    title: string;
    content: string;
};

export const getDIExPopupContent4SelectedScene = async ({
    objectId,
    mapPoint,
    resolution,
    abortController,
}: GetPopupContent4SelectedSceneParams): Promise<GetPopupContent4SelectedSceneReturnType> => {
    if (!objectId || !mapPoint || !resolution || !abortController) {
        throw new Error(
            'Missing required parameters for getPopupContent4SelectedScene function'
        );
    }

    const res = await identify({
        serviceURL: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
        point: mapPoint,
        objectIds: [objectId],
        maxItemCount: 1,
        resolution: resolution,
        abortController,
    });

    // console.log(res)

    const features = res?.catalogItems?.features;

    if (!features.length) {
        throw new Error('cannot find sentinel-1 scene');
    }

    const sceneData = getFormattedDisasterResponseScenes(features)[0];

    if (!sceneData) {
        throw new Error('failed to get disaster response scene data');
    }

    const title = t('disaster_imagery', { ns: APP_NAME });

    const content = `
        <div style="font-size: 0.8rem; color: var(--custom-light-blue-50);">
            <span>${t('provider_popup_field', { provider: sceneData.provider, ns: APP_NAME })}</span><br />
            <span>${t('acquisition_date_popup_field', { date: sceneData.formattedAcquisitionDate + ' ' + sceneData.formattedAcuisitionTime, ns: APP_NAME })}</span><br />
        </div><br/>
    `;

    return {
        title,
        content,
    };
};

type GetPopupContent4WorldImageryParams = {
    mapPoint: Point;
    scale: number;
};

export const getPopupContentForWorldImagery = async ({
    mapPoint,
    scale,
}: GetPopupContent4WorldImageryParams): Promise<GetPopupContent4SelectedSceneReturnType> => {
    const metadata = await getWorldImageryMetadata({
        mapPoint,
        mapScale: scale,
        abortController: new AbortController(),
    });

    const title = t('world_imagery', { ns: APP_NAME });

    const content = `
    <div style="font-size: 0.8rem; color: var(--custom-light-blue-50);">
        <span>${t('provider_popup_field', { provider: metadata.provider, ns: APP_NAME })}</span><br />
        <span>${t('acquisition_date_popup_field', { date: metadata.formattedAcquisitionDate, ns: APP_NAME })}</span><br />
        <span>${t('resolution_popup_field', { resolution: metadata.resolution, ns: APP_NAME })}</span><br />
        <span>${t('accuracy_popup_field', { accuracy: metadata.accuracy, ns: APP_NAME })}</span><br />
    </div><br/>
    `;

    return {
        title,
        content,
    };
};
