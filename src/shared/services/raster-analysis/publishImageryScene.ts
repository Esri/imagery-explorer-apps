import { getExtentByObjectId } from '../helpers/getExtentById';

type publishImagerySceneParams = {
    serviceUrl: string;
    objectId: number;
};

export const publishImageryScene = async ({
    serviceUrl,
    objectId,
}: publishImagerySceneParams) => {
    const extent = await getExtentByObjectId(serviceUrl, objectId);
};
