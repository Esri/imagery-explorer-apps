import type Point from '@arcgis/core/geometry/Point';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getFormattedDisasterResponseScenes } from '@shared/services/disaster-response/getDisasterResponseScenes';
import { identify } from '@shared/services/helpers/identify';
import { getWorldImageryMetadata } from '@shared/services/world-imagery/getWorldImageryMetadata';

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

    const title = `World Imagery`;

    const content = `
    <div style="font-size: 0.8rem;">
        <span style='color: var(--custom-light-blue-50);'>${metadata.provider} imagery captured on <span style='color: var(--custom-light-blue);'>${metadata.formattedAcquisitionDate}</span></span>.<br/>
        <span style='color: var(--custom-light-blue-50);'>Pixels in the source image cover a ground distance of <span style='color: var(--custom-light-blue);'>${metadata.resolution} meters</span>.<br/>
        <span style='color: var(--custom-light-blue-50);'>Objects displayed in this image are within <span style='color: var(--custom-light-blue);'>${metadata.sampleAccuracy}</span> meters of true location.</span><br/><br/>
    </div>
    `;

    return {
        title,
        content,
    };
};
