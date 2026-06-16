import type Point from '@arcgis/core/geometry/Point';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getFormattedDisasterResponseScenes } from '@shared/services/disaster-response/getDisasterResponseScenes';
import { identify } from '@shared/services/helpers/identify';

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

    const title = `Disaster Imagery`;

    const content = `Acquisition Date: ${sceneData.formattedAcquisitionDate + ' ' + sceneData.formattedAcuisitionTime}`;

    return {
        title,
        content,
    };
};
